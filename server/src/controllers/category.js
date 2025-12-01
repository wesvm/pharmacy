import prisma from "../lib/prisma.js";


class CategoryController {
  async getAll(_req, res) {
    try {
      const categories = await prisma.category.findMany({
        orderBy: { name: 'asc' }
      });

      return res.status(200).json({ categories });
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {

    try {
      const id = parseInt(req.params.id, 10);

      if (isNaN(id)) {
        return;
      }

      const category = await prisma.category.findUnique({
        where: { id }
      });

      if (!category) {
        return res.status(404).json({ error: "Categoria no encontrada." });
      }

      res.status(200).json({ category });
    } catch (error) {
      next(error);
    }
  }
  async create(req, res, next) {
    try {
      const { name, description } = req.body;
      const category = await prisma.category.create({
        data: {
          name: name,
          description: description
        },
      });

      res.status(201).json({
        message: "Categoria creado correctamente.",
        category
      });
    } catch (error) {
      next(error);
    }
  }
  async update(req, res, next) {
    const { id } = req.params;
    const { name, description } = req.body;

    try {
      const category = await prisma.category.update({
        where: { id: parseInt(id) },
        data: {
          name: name,
          description: description
        },
      });

      res.status(200).json({
        message: "Categoria actualizada correctamente.",
        category
      });
    } catch (error) {
      next(error);
    }
  }
  async delete(req, res, next) {
    const { id } = req.params;

    try {
      await prisma.category.delete({
        where: { id: parseInt(id) },
      });

      res.status(200).json({
        message: "Categoria eliminada correctamente."
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new CategoryController();
