import prisma from "../lib/prisma.js";

class SaleController {
  async getAll(_req, res) {
    const purchases = await prisma.purchase.findMany({
      include: {
        user: {
          select: { id: true, name: true }
        }
      }
    });
    res.status(200).json({ purchases });
  }
  async getById(req, res, next) {
    const { id } = req.params;
    try {
      const purchase = await prisma.purchase.findUnique({
        where: { id: parseInt(id) },
        include: {
          purchaseItems: { include: { product: true } },
          user: { select: { id: true, name: true } }
        }
      });

      if (!purchase) {
        return res.status(404).json({ error: "Compra no encontrado." });
      }

      res.status(200).json({ purchase });
    } catch (error) {
      next(error);
    }
  }
  async create(req, res, next) {
    const { purchaseItems, userId } = req.body;

    try {
      const createdPurchase = await prisma.$transaction(async (tx) => {
        let calculatedTotal = 0;

        const user = await tx.user.findUniqueOrThrow({
          where: { id: userId },
          select: { id: true }
        })

        const purchase = await tx.purchase.create({
          data: {
            purchaseDate: new Date(),
            total: 0,
            status: "Pendiente",
            userId: user.id,
            supplierId: 1,
          },
        })

        const purchaseItemsData = await Promise.all(
          purchaseItems.map(async (item) => {
            const product = await tx.product.findUnique({
              where: { id: item.productId, isArchived: false },
              select: { purchasePrice: true, stockQuantity: true },
            });

            if (!product) {
              throw new Error(`Producto con ID ${item.productId} no existe o está archivado.`);
            }

            const subtotal = product.purchasePrice * item.quantity;
            calculatedTotal += subtotal;

            return {
              purchaseId: purchase.id,
              productId: item.productId,
              quantity: item.quantity,
              price: subtotal,
            }
          })
        )

        await tx.purchaseItem.createMany({
          data: purchaseItemsData,
        });

        await Promise.all(
          purchaseItems.map((item) =>
            tx.product.update({
              where: { id: item.productId },
              data: {
                stockQuantity: { increment: item.quantity },
              },
            })
          )
        );

        await tx.purchase.update({
          where: { id: purchase.id },
          data: {
            status: "Completado",
            total: calculatedTotal
          },
        });

        return purchase;
      });

      res.status(201).json({
        message: "Compra realizada correctamente.",
        purchase: createdPurchase
      });
    } catch (error) {
      next(error);
    }
  }
  async update(req, res, next) {

  }
  async delete(req, res, next) {

  }
}

export default new SaleController();
