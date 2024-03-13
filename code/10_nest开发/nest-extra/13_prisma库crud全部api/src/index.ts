import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: [
    {
      emit: "stdout",
      level: "query",
    },
  ],
});

async function main() {
  const count = await prisma.aaa.findFirst({
    where: {
      email: {
        contains: "xx",
      },
    },
    orderBy: {
      name: "desc",
    },
  });
  console.log(count);
}

main();
