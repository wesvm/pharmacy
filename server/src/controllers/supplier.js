import prisma from "../lib/prisma.js";

class SupplierController {
  async getAll(_req, res) {
    const suppliers = await prisma.supplier.findMany();
    res.status(200).json({ suppliers });
  }
  async getById(req, res, next) {
    const { id } = req.params;

    try {
      const supplier = await prisma.supplier.findUnique({
        where: { id: parseInt(id) }
      })

      if (!supplier) {
        return res.status(404).json({ error: "Proveedor no encontrado." });
      }

      res.status(200).json({ supplier });
    } catch (error) {
      next(error)
    }
  }
  async create(req, res, next) {
    const { name, contactInfo } = req.body

    try {
      const supplier = await prisma.supplier.create({
        data: { name, contactInfo },
      });
      res.status(201).json({ message: "Proveedor creado correctamente.", supplier });
    } catch (error) {
      next(error);
    }

  }
  async update(req, res, next) {
    const { id } = req.params;
    const { name, contactInfo } = req.body;

    try {
      const supplier = await prisma.supplier.update({
        where: { id: parseInt(id) },
        data: { name, contactInfo },
      });
      res.status(200).json({ message: "Proveedor actualizado correctamente.", supplier });
    } catch (error) {
      next(error);
    }
  }
  async delete(req, res, next) {
    const { id } = req.params;
    try {
      await prisma.supplier.delete({
        where: { id: parseInt(id) },
      });
      res.status(200).send({ message: "Proveedor eliminado correctamente." });
    } catch (error) {
      next(error);
    }
  }
}

export default new SupplierController();
