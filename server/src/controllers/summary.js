import prisma from "../lib/prisma.js";

class SummaryController {
  async get(req, res, next) {
    const from = req.query.from || undefined;
    const to = req.query.to || undefined;

    BigInt.prototype.toJSON = function () {
      const int = Number.parseInt(this.toString());
      return int ?? this.toString();
    };

    try {
      const sales = await prisma.sale.aggregate({
        _sum: { total: true },
        _count: { id: true },
        where: {
          saleDate: { gte: from, lte: to }
        }
      })
      const purchases = await prisma.purchase.aggregate({
        _sum: { total: true },
        _count: { id: true },
        where: {
          purchaseDate: { gte: from, lte: to }
        }
      })

      const salesDays = await prisma.$queryRaw`
        SELECT 
          DATE("saleDate") AS day, 
          SUM("total") AS "totalRevenue"
        FROM "Sale"
        WHERE "saleDate" BETWEEN ${from}::timestamp AND ${to}::timestamp
        GROUP BY DATE("saleDate")
        ORDER BY DATE("saleDate") ASC;
      `;

      const purchasesDays = await prisma.$queryRaw`
        SELECT 
          DATE("purchaseDate") AS day, 
          SUM("total") AS "totalExpenses"
        FROM "Purchase"
        WHERE "purchaseDate" BETWEEN ${from}::timestamp AND ${to}::timestamp
        GROUP BY DATE("purchaseDate")
        ORDER BY DATE("purchaseDate") ASC;
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

      const combined = salesDays.concat(purchasesDays).map((item) => ({
        ...item,
        day: item.day.toISOString().split('T')[0]
      }));

      const daily = combined.reduce((acc, current) => {
        const existing = acc.find((item) =>
          item.day === current.day
        );
        if (existing) {
          Object.assign(existing, current);
        } else {
          acc.push(current);
        }
        return acc;
      }, []);

      daily.sort((a, b) => a.day - b.day);

      res.status(200).json({
        sales: {
          totalRevenue: sales._sum.total,
          total: sales._count.id
        },
        purchases: {
          totalExpenses: purchases._sum.total,
          total: purchases._count.id
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
