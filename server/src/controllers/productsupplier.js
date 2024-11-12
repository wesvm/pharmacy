import prisma from "../lib/prisma.js";

class ProductSupplierController {
  // Obtener todas las relaciones de productos y proveedores
  async getAll(_req, res, next) {
    try {
      const query = await prisma.productSupplier.findMany({
        include: {
          product: true,
          supplier: true,
        },
      });

      const productSuppliers = query.map((ps) => ({
        id: ps.id,
        productId: ps.productId,
        productName: ps.product.name,
        supplierId: ps.supplierId,
        supplierName: ps.supplier.name,
        price: ps.price,
        createdAt: ps.createdAt,
        updatedAt: ps.updatedAt,
      }));

      res.status(200).json({ productSuppliers });
    } catch (error) {
      next(error);
    }
  }

  // Obtener una relación específica por ID
  async getById(req, res, next) {
    const { id } = req.params;
    try {
      const productSupplier = await prisma.productSupplier.findUnique({
        where: { id: BigInt(id) },
        include: {
          product: true,
          supplier: true,
        },
      });

      if (!productSupplier) {
        return res.status(404).json({ error: "Relación no encontrada." });
      }

      res.status(200).json({
        id: productSupplier.id,
        productId: productSupplier.productId,
        productName: productSupplier.product.name,
        supplierId: productSupplier.supplierId,
        supplierName: productSupplier.supplier.name,
        price: productSupplier.price,
        createdAt: productSupplier.createdAt,
        updatedAt: productSupplier.updatedAt,
      });
    } catch (error) {
      next(error);
    }
  }

  // Crear una nueva relación producto-proveedor
  async create(req, res, next) {
    const { productId, supplierId, price } = req.body;

    try {
      // Validar existencia de producto y proveedor
      const product = await prisma.product.findUnique({ where: { id: BigInt(productId) } });
      const supplier = await prisma.supplier.findUnique({ where: { id: BigInt(supplierId) } });

      if (!product || !supplier) {
        return res.status(404).json({ error: "Producto o proveedor no encontrados." });
      }

      // Verificar duplicados
      const existingRelation = await prisma.productSupplier.findUnique({
        where: {
          productId_supplierId: { productId: BigInt(productId), supplierId: BigInt(supplierId) },
        },
      });

      if (existingRelation) {
        return res.status(400).json({ error: "Esta relación ya existe." });
      }

      // Crear relación
      const newRelation = await prisma.productSupplier.create({
        data: {
          productId: BigInt(productId),
          supplierId: BigInt(supplierId),
          price: parseFloat(price),
        },
      });

      res.status(201).json({ message: "Relación creada exitosamente.", productSupplier: newRelation });
    } catch (error) {
      next(error);
    }
  }

  // Actualizar relación producto-proveedor
  async update(req, res, next) {
    const { id } = req.params;
    const { price } = req.body;

    try {
      const updatedRelation = await prisma.productSupplier.update({
        where: { id: BigInt(id) },
        data: { price: parseFloat(price) },
      });

      res.status(200).json({ message: "Relación actualizada correctamente.", productSupplier: updatedRelation });
    } catch (error) {
      next(error);
    }
  }

  // Eliminar una relación producto-proveedor
  async delete(req, res, next) {
    const { id } = req.params;

    try {
      await prisma.productSupplier.delete({ where: { id: BigInt(id) } });
      res.status(200).json({ message: "Relación eliminada correctamente." });
    } catch (error) {
      next(error);
    }
  }
}

export default new ProductSupplierController();
