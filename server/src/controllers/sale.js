import prisma from "../lib/prisma.js";

class SaleController {
  async getAll(_req, res) {
    const sales = await prisma.sale.findMany({
      include: {
        user: {
          select: { id: true, name: true }
        }
      }
    });
    res.status(200).json({ sales });
  }
  async getById(req, res, next) {
    const { id } = req.params;
    try {
      const sale = await prisma.sale.findUnique({
        where: { id: parseInt(id) },
        include: {
          saleItems: { include: { product: true } },
          delivery: true,
          user: { select: { id: true, name: true } }
        }
      });

      if (!sale) {
        return res.status(404).json({ error: "Venta no encontrado." });
      }

      res.status(200).json({ sale });
    } catch (error) {
      next(error);
    }
  }
  async create(req, res, next) {
    const {
      customerName,
      customerDNI,
      address,
      delivery,
      saleItems,
      userId
    } = req.body;

    try {
      const createdSale = await prisma.$transaction(async (prisma) => {
        let deliveryId = null;
        let calculatedTotal = 0;

        const user = await prisma.user.findUniqueOrThrow({
          where: { id: userId },
          select: { id: true }
        })

        if (delivery && address) {
          const delivery = await prisma.delivery.create({
            data: {
              status: "Pendiente",
              address,
            },
          });
          deliveryId = delivery.id;
          calculatedTotal += 5;
        }

        const sale = await prisma.sale.create({
          data: {
            total: 0,
            status: "Pendiente",
            customerName,
            customerDNI,
            userId: user.id,
            deliveryId,
          },
        })

        const saleItemsData = await Promise.all(
          saleItems.map(async (item) => {
            const product = await prisma.product.findUnique({
              where: { id: item.productId, isArchived: false },
              select: { salePrice: true, stockQuantity: true },
            });

            if (!product) {
              throw new Error(`Producto con ID ${item.productId} no existe.`);
            }

            if (product.stockQuantity < item.quantity) {
              throw new Error(`Producto con ID ${item.productId} no tiene suficiente stock.`);
            }

            const subtotal = product.salePrice * item.quantity;
            calculatedTotal += subtotal;

            return {
              saleId: sale.id,
              productId: item.productId,
              quantity: item.quantity,
              price: subtotal,
            }
          })
        )

        await prisma.saleItem.createMany({
          data: saleItemsData,
        });

        await Promise.all(
          saleItems.map((item) =>
            prisma.product.update({
              where: { id: item.productId },
              data: {
                stockQuantity: { decrement: item.quantity },
              },
            })
          )
        );

        await prisma.sale.update({
          where: { id: sale.id },
          data: {
            status: "Completado",
            total: calculatedTotal
          },
        });

        return sale;
      })

      res.status(201).json({ message: "Venta realizada correctamente.", sale: createdSale });
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
