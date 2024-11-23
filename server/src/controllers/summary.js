import prisma from "../lib/prisma.js";

class SummaryController {
  async get(req, res, next) {
    const from = req.query.from || undefined;
    const to = req.query.to || undefined;

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

      res.status(200).json({
        sales: {
          totalRevenue: sales._sum.total,
          total: sales._count.id
        },
        purchases: {
          totalExpenses: purchases._sum.total,
          total: purchases._count.id
        },
      });
    } catch (error) {
      next(error)
    }
  }
}

export default new SummaryController();
