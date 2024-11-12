import prisma from "../lib/prisma.js";


class CategoryController {
  async getAll(_req, res) {  
   const query = await prisma.category.findMany(  
  );

  const categories = query.map((category) => ({
    id: category.id,
    name: category.name,
    description: category.description,

  }));

  res.status(200).json({ categories });
   
  }
  async getById(req, res, next) {
    const { id } = req.params;
    try {
      const category = await prisma.category.findUnique({
        where: { id: parseInt(id) },
      });

      if (!category) {
        return res.status(404).json({ error: "Categoría no encontrada." });
      }

      res.status(200).json({
        category: {
          id: category.id,
          name: category.name,
          description: category.description,
        },
      });
    } catch (error) {
      next(error);
    }
    
  }
  async create(req, res, next) {
    const { name, description } = req.body;

    
    if (!name || name.trim() === "") {
      return res.status(400).json({ error: "El nombre es obligatorio." });
    }

    try {
      
      const categoryExist = await prisma.category.findUnique({
        where: { name: name },
      });

      if (categoryExist) {
        return res.status(400).json({
          error: "El nombre de la categoría ya está en uso.",
        });
      }

      const category = await prisma.category.create({
        data: {
          name,
          description,
        },
      });

      res.status(201).json({
        message: "Categoría creada correctamente.",
        category: {
          id: category.id,
          name: category.name,
          description: category.description,
        },
      });
    } catch (error) {
      next(error);
    }  
  }
  async update(req, res, next) {
    const { id } = req.params;
    const { name, description } = req.body;

    
    if (!name || name.trim() === "") {
      return res.status(400).json({ error: "El nombre es obligatorio." });
    }

    try {
      const category = await prisma.category.update({
        where: { id: parseInt(id) },
        data: {
          name,
          description,
        },
      });

      res.status(200).json({
        message: "Categoría actualizada correctamente.",
        category: {
          id: category.id,
          name: category.name,
          description: category.description,
        },
      });
    } catch (error) {
      
      if (error.code === "P2025") {
        return res.status(404).json({ error: "Categoría no encontrada." });
      }
      next(error);
    }
    

  }
  async delete(req, res, next) {
    const { id } = req.params;

    try {
      const category = await prisma.category.findUnique({
        where: { id: parseInt(id) },
      });

      if (!category) {
        return res.status(404).json({ error: "Categoría no encontrada." });
      }

      await prisma.category.delete({
        where: { id: parseInt(id) },
      });

      res.status(200).json({ message: "Categoría eliminada correctamente." });
    } catch (error) {
      next(error);
    }
  }
    

  
}

export default new CategoryController();
