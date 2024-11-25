import prisma from "../lib/prisma.js";
import { Prisma } from "@prisma/client";

class SummaryController {
  async get(req, res, next) {
    const from = req.query.from || undefined;
    const to = req.query.to || undefined;

    try {
      const dailyData = await prisma.$queryRaw`
        SELECT 
          COALESCE(s.day, p.day) AS day,
          COALESCE(SUM(s.total), 0::money) AS "totalRevenue",
          COALESCE(SUM(p.total), 0::money) AS "totalExpenses",
          COALESCE(s.totalSales::int, 0) AS "totalSales",
          COALESCE(p.totalPurchases::int, 0) AS "totalPurchases"
        FROM (
          SELECT 
            DATE("saleDate") AS day, 
            SUM("total") AS total,
            COUNT(id) AS totalSales
          FROM "Sale"
          WHERE "saleDate" BETWEEN ${from}::timestamp AND ${to}::timestamp
          GROUP BY DATE("saleDate")
        ) s
        FULL OUTER JOIN (
          SELECT 
            DATE("purchaseDate") AS day, 
            SUM("total") AS total,
            COUNT(id) AS totalPurchases
          FROM "Purchase"
          WHERE "purchaseDate" BETWEEN ${from}::timestamp AND ${to}::timestamp
          GROUP BY DATE("purchaseDate")
        ) p
        ON s.day = p.day
        GROUP BY COALESCE(s.day, p.day), s.totalSales, p.totalPurchases
        ORDER BY day;
      `;

      const salesByUser = await prisma.$queryRaw`
        SELECT 
          u.id,
          u.name,
          u.email,
          COUNT(s.id) AS "totalSales",
          SUM(s.total) AS "totalRevenue"
        FROM "Sale" s
        JOIN "User" u ON s."userId" = u."id"
        WHERE s."saleDate" BETWEEN ${from}::timestamp AND ${to}::timestamp
        GROUP BY u."id", u."name", u."email"
      `;

      let totalRevenue = Prisma.Decimal(0);
      let totalExpenses = Prisma.Decimal(0);
      let totalSales = 0;
      let totalPurchases = 0;

      const daily = dailyData.map((item) => {
        totalRevenue = totalRevenue.add(item.totalRevenue);
        totalExpenses = totalExpenses.add(item.totalExpenses);
        totalSales += item.totalSales;
        totalPurchases += item.totalPurchases;

        return {
          day: item.day.toISOString().split('T')[0],
          totalRevenue: item.totalRevenue,
          totalExpenses: item.totalExpenses
        };
      });

      res.status(200).json({
        sales: {
          totalRevenue,
          total: totalSales
        },
        purchases: {
          totalExpenses,
          total: totalPurchases
        },
        daily,
        salesByUser
      });
    } catch (error) {
      next(error)
    }
  }
}

export default new SummaryController();
