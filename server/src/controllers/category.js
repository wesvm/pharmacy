import prisma from "../lib/prisma.js";


class CategoryController {
  async getAll(_req, res) {  const query = await prisma.category.findMany(  
  );

  const categories = query.map((category) => ({
    id: category.id,
    name: category.name,
    description: category.description,

  }));

  res.status(200).json({ categories });
   
  }
  async getById(req, res, next) {
    
  }
  async create(req, res, next) {
    
  }
  async update(req, res, next) {
    
  }
  async delete(req, res, next) {
    
  }
}

export default new CategoryController();
