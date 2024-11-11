import prisma from "../lib/prisma.js";

class ProductController {
  async getAll(_req, res) {
    const query = await prisma.product.findMany({
      include: { category: true, supplier: true },
    });

    const products = query.map((product) => ({
      ...product,
      category: product.category.name,
      supplier: product.supplier.name,
    }));

    res.status(200).json({ products });
  }
  async getById(req, res, next) {}
  async create(req, res, next) {}
  async update(req, res, next) {}
  async delete(req, res, next) {}
}

export default new ProductController();
