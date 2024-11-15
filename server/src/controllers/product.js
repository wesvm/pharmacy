import prisma from "../lib/prisma.js";

class ProductController {
  async getAll(_req, res) {
    const query = await prisma.product.findMany({
      where: { isArchived: false },
      include: { category: true, supplier: true },
    });

    const products = query.map((product) => format(product));
    res.status(200).json({ products });
  }
  async getById(req, res, next) {
    const { id } = req.params;
    try {
      const product = await prisma.product.findUnique({
        where: { id: parseInt(id) },
        include: { category: true, supplier: true },
      });

      if (!product) {
        return res.status(404).json({ error: "Producto no encontrado." });
      }

      const formated = format(product);
      res.status(200).json({ product: formated });
    } catch (error) {
      next(error);
    }
  }
  async create(req, res, next) {
    const {
      name,
      description,
      salePrice,
      purchasePrice,
      stockQuantity,
      categoryId,
      supplierId,
    } = req.body;

    try {
      const category = await prisma.category.findUnique({
        where: { id: parseInt(categoryId) },
      });

      if (!category) {
        return res.status(404).json({
          error: "La categoria seleccionada no existe.",
        });
      }

      const supplier = await prisma.supplier.findUnique({
        where: { id: parseInt(supplierId) },
      });

      if (!supplier) {
        return res.status(404).json({
          error: "El proveedor seleccionado no existe.",
        });
      }

      const product = await prisma.product.create({
        data: {
          name,
          description,
          salePrice,
          purchasePrice,
          stockQuantity,
          category: { connect: { id: category.id } },
          supplier: { connect: { id: supplier.id } },
        },
        include: { category: true, supplier: true },
      });

      const formated = format(product);
      res
        .status(201)
        .json({ message: "Producto creado correctamente.", product: formated });
    } catch (error) {
      next(error);
    }
  }
  async update(req, res, next) {
    const { id } = req.params;
    const {
      name,
      description,
      salePrice,
      purchasePrice,
      stockQuantity,
      categoryId,
      supplierId,
    } = req.body;

    try {
      const category = await prisma.category.findUniqueOrThrow({
        where: { id: parseInt(categoryId) },
      });

      const supplier = await prisma.supplier.findUniqueOrThrow({
        where: { id: parseInt(supplierId) },
      });

      const product = await prisma.product.update({
        where: { id: parseInt(id) },
        data: {
          name,
          description,
          salePrice,
          purchasePrice,
          stockQuantity,
          category: { connect: { id: category.id } },
          supplier: { connect: { id: supplier.id } },
        },
      });

      const formated = format(product);
      res.status(200).json({
        message: "Producto actualizado correctamente.",
        product: formated,
      });
    } catch (error) {
      next(error);
    }
  }
  async delete(req, res, next) {
    const { id } = req.params;
    try {
      await prisma.product.update({
        where: { id: parseInt(id) },
        data: {
          isArchived: true,
          stockQuantity: 0,
        },
      });
      res.status(200).json({ message: "Producto archivado correctamente." });
    } catch (error) {
      next(error);
    }
  }
}

const format = (product) => {
  return {
    id: product.id,
    name: product.name,
    description: product.description,
    salePrice: product.salePrice,
    purchasePrice: product.purchasePrice,
    stockQuantity: product.stockQuantity,
    categoryId: product.categoryId,
    supplierId: product.supplierId,
    category: product.category?.name,
    supplier: product.supplier?.name,
  };
};

export default new ProductController();
