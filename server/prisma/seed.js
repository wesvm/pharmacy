import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { roles } from "./seed/roles.js";
import { users } from "./seed/users.js";
import { suppliers } from "./seed/suppliers.js";
import { categories } from "./seed/categories.js";
import { products } from "./seed/products.js";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding started...");

  await prisma.user.deleteMany({});
  await prisma.role.deleteMany({});
  await prisma.saleItem.deleteMany({});
  await prisma.sale.deleteMany({});
  await prisma.purchaseItem.deleteMany({});
  await prisma.purchase.deleteMany({});
  await prisma.product.deleteMany({});
  await prisma.delivery.deleteMany({});
  await prisma.category.deleteMany({});
  await prisma.supplier.deleteMany({});

  await prisma.$executeRaw`ALTER SEQUENCE "Role_id_seq" RESTART WITH 1;`;
  await prisma.$executeRaw`ALTER SEQUENCE "User_id_seq" RESTART WITH 1;`;
  await prisma.$executeRaw`ALTER SEQUENCE "Product_id_seq" RESTART WITH 1;`;
  await prisma.$executeRaw`ALTER SEQUENCE "SaleItem_id_seq" RESTART WITH 1;`;
  await prisma.$executeRaw`ALTER SEQUENCE "Sale_id_seq" RESTART WITH 1;`;
  await prisma.$executeRaw`ALTER SEQUENCE "PurchaseItem_id_seq" RESTART WITH 1;`;
  await prisma.$executeRaw`ALTER SEQUENCE "Purchase_id_seq" RESTART WITH 1;`;
  await prisma.$executeRaw`ALTER SEQUENCE "Delivery_id_seq" RESTART WITH 1;`;
  await prisma.$executeRaw`ALTER SEQUENCE "Category_id_seq" RESTART WITH 1;`;
  await prisma.$executeRaw`ALTER SEQUENCE "Supplier_id_seq" RESTART WITH 1;`;

  for (const role of roles) {
    await prisma.role.create({
      data: role,
    });
  }

  for (const user of users) {
    await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: bcrypt.hashSync(user.password, 10),
        roleId: user.roleId,
      },
    });
  }

  for (const category of categories) {
    await prisma.category.create({
      data: category,
    });
  }

  for (const supplier of suppliers) {
    await prisma.supplier.create({
      data: supplier,
    });
  }

  for (const product of products) {
    await prisma.product.create({
      data: product,
    });
  }

  console.log("Seeding completed.");
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
