import prisma from "../lib/prisma.js";

class SupplierController {
  async getAll(_req, res) {
    const suppliers = await prisma.supplier.findMany();
    res.status(200).json({ suppliers });
  }
  async getById(req, res, next) {}
  async create(req, res, next) {}
  async update(req, res, next) {}
  async delete(req, res, next) {}
}

export default new SupplierController();
