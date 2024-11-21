import prisma from "../lib/prisma.js";

class DeliveyController {
  async getAll(_req, res) {
    const deliveries = await prisma.delivery.findMany({
      include: { sale: true },
    });
    res.status(200).json({ deliveries });
  }
  async getById(req, res) {}
  async create(req, res, next) {}
  async update(req, res, next) {
    const { id } = req.params;
    const { address, deliveryDate, status } = req.body;

    try {
      const category = await prisma.delivery.update({
        where: { id: parseInt(id) },
        data: {
          address,
          deliveryDate,
          status,
        },
      });

      res.status(200).json({
        message: "Delivery actualizado correctamente.",
        category,
      });
    } catch (error) {
      next(error);
    }
  }
  async delete(req, res, next) {}
}

export default new DeliveyController();
