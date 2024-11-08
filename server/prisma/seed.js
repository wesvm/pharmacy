import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

async function main() {
  const adminRole = await prisma.role.upsert({
    where: { name: "Admin" },
    update: {},
    create: { name: "Admin" },
  });

  const elon = await prisma.user.upsert({
    where: { email: "elon@mail.com" },
    update: {},
    create: {
      name: "Elon Musk",
      email: "elon@mail.com",
      password: bcrypt.hashSync("admin", 10),
      roleId: adminRole.id,
    },
  });
  console.log({ adminRole, elon });
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
