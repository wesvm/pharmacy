import prisma from "../lib/prisma.js";

class ProductController {
  // Obtener todos los productos
  async getAll(_req, res, next) {
    try {
      const query = await prisma.product.findMany({
        include: {
          category: true,
          suppliers: true,
        },
      });

      const products = query.map((product) => ({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        quantity: product.quantity,
        category: product.category.name,
        suppliers: product.suppliers.map((supplier) => supplier.supplierId),
      }));

      res.status(200).json({ products });
    } catch (error) {
      next(error);
    }
  }

  // Obtener un producto por ID
  async getById(req, res, next) {
    const { id } = req.params;
    try {
      const product = await prisma.product.findUnique({
        where: { id: BigInt(id) },
        include: { category: true, suppliers: true },
      });

      if (!product) {
        return res.status(404).json({ error: "Producto no encontrado." });
      }

      res.status(200).json({
        product: {
          id: product.id,
          name: product.name,
          description: product.description,
          price: product.price,
          quantity: product.quantity,
          category: product.category.name,
          suppliers: product.suppliers.map((supplier) => supplier.supplierId),
        },
      });
    } catch (error) {
      next(error);
    }
  }

  // Crear un nuevo producto
  async create(req, res, next) {
    const { name, description, price, quantity, categoryId, supplierIds } = req.body;

    // Validaciones
    if (!name || name.trim() === "") {
      return res.status(400).json({ error: "El nombre del producto es obligatorio." });
    }
    if (!categoryId) {
      return res.status(400).json({ error: "La categoría es obligatoria." });
    }
    if (quantity < 0) {
      return res.status(400).json({ error: "La cantidad no puede ser negativa." });
    }
    if (price <= 0) {
      return res.status(400).json({ error: "El precio debe ser mayor a 0." });
    }

    try {
      // Verificar si la categoría existe
      const categoryExist = await prisma.category.findUnique({
        where: { id: BigInt(categoryId) },
      });

      if (!categoryExist) {
        return res.status(404).json({ error: "La categoría no existe." });
      }

      // Crear el producto
      const product = await prisma.product.create({
        data: {
          name,
          description,
          price: parseFloat(price),
          quantity: parseInt(quantity),
          category: { connect: { id: BigInt(categoryId) } },
        },
      });

      // Asociar proveedores si existen
      if (supplierIds && supplierIds.length > 0) {
        for (let supplierId of supplierIds) {
          await prisma.productSupplier.create({
            data: {
              productId: product.id,
              supplierId: BigInt(supplierId),
            },
          });
        }
      }

      res.status(201).json({ message: "Producto creado exitosamente.", product });
    } catch (error) {
      next(error);
    }
  }

  // Actualizar un producto
  async update(req, res, next) {
    const { id } = req.params;
    const { name, description, price, quantity, categoryId } = req.body;

    try {
      const product = await prisma.product.update({
        where: { id: BigInt(id) },
        data: {
          name,
          description,
          price: parseFloat(price),
          quantity: parseInt(quantity),
          categoryId: BigInt(categoryId),
        },
        include: { category: true },
      });

      res.status(200).json({ message: "Producto actualizado correctamente.", product });
    } catch (error) {
      next(error);
    }
  }

  // Eliminar un producto
  async delete(req, res, next) {
    const { id } = req.params;

    try {
      const product = await prisma.product.findUnique({
        where: { id: BigInt(id) },
      });

      if (!product) {
        return res.status(404).json({ error: "Producto no encontrado." });
      }

      await prisma.product.delete({
        where: { id: BigInt(id) },
      });

      res.status(200).json({ message: "Producto eliminado correctamente." });
    } catch (error) {
      next(error);
    }
  }
}

export default new ProductController();
