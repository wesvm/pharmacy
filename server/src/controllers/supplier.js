import prisma from "../lib/prisma.js";

class SupplierController {
  // Obtener todos los proveedores
  async getAll(_req, res, next) {
    try {
      const query = await prisma.supplier.findMany({
        include: {
          products: true,
        },
      });

      const suppliers = query.map((supplier) => ({
        id: supplier.id,
        name: supplier.name,
        contactInfo: supplier.contactInfo,
        products: supplier.products.map((product) => product.productId),
      }));

      res.status(200).json({ suppliers });
    } catch (error) {
      next(error);
    }
  }

  // Obtener un proveedor por ID
  async getById(req, res, next) {
    const { id } = req.params;
    try {
      const supplier = await prisma.supplier.findUnique({
        where: { id: BigInt(id) },
        include: { products: true },
      });

      if (!supplier) {
        return res.status(404).json({ error: "Proveedor no encontrado." });
      }

      res.status(200).json({
        supplier: {
          id: supplier.id,
          name: supplier.name,
          contactInfo: supplier.contactInfo,
          products: supplier.products.map((product) => product.productId),
        },
      });
    } catch (error) {
      next(error);
    }
  }

  // Crear un nuevo proveedor
  async create(req, res, next) {
    const { name, contactInfo, productIds } = req.body;

    // Validaciones
    if (!name || name.trim() === "") {
      return res.status(400).json({ error: "El nombre del proveedor es obligatorio." });
    }

    try {
      // Crear el proveedor
      const supplier = await prisma.supplier.create({
        data: {
          name,
          contactInfo,
        },
      });

      // Asociar productos si existen
      if (productIds && productIds.length > 0) {
        for (let productId of productIds) {
          await prisma.productSupplier.create({
            data: {
              productId: BigInt(productId),
              supplierId: supplier.id,
            },
          });
        }
      }

      res.status(201).json({ message: "Proveedor creado exitosamente.", supplier });
    } catch (error) {
      next(error);
    }
  }

  // Actualizar un proveedor
  async update(req, res, next) {
    const { id } = req.params;
    const { name, contactInfo, productIds } = req.body;

    try {
      const supplier = await prisma.supplier.update({
        where: { id: BigInt(id) },
        data: {
          name,
          contactInfo,
        },
      });

      // Actualizar la relación con productos
      if (productIds && productIds.length > 0) {
        // Eliminar relaciones anteriores
        await prisma.productSupplier.deleteMany({
          where: { supplierId: supplier.id },
        });

        // Crear nuevas relaciones
        for (let productId of productIds) {
          await prisma.productSupplier.create({
            data: {
              productId: BigInt(productId),
              supplierId: supplier.id,
            },
          });
        }
      }

      res.status(200).json({ message: "Proveedor actualizado correctamente.", supplier });
    } catch (error) {
      next(error);
    }
  }

  // Eliminar un proveedor
  async delete(req, res, next) {
    const { id } = req.params;

    try {
      const supplier = await prisma.supplier.findUnique({
        where: { id: BigInt(id) },
      });

      if (!supplier) {
        return res.status(404).json({ error: "Proveedor no encontrado." });
      }

      // Eliminar relaciones con productos
      await prisma.productSupplier.deleteMany({
        where: { supplierId: BigInt(id) },
      });

      // Eliminar proveedor
      await prisma.supplier.delete({
        where: { id: BigInt(id) },
      });

      res.status(200).json({ message: "Proveedor eliminado correctamente." });
    } catch (error) {
      next(error);
    }
  }
}

export default new SupplierController();
