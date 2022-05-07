import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  [...Array(15)].forEach(async (item, index) => {
    const createdStream = await prisma.stream.create({
      data: {
        title: `[생] 당근마켓 방송${index}`,
        description: `당근마켓 방송${index}입니다.`,
        user: {
          connect: {
            id: 31,
          },
        },
      },
    });
  });
}

main()
  .catch((error) => {
    console.log(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
