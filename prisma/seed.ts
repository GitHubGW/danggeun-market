import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  [...Array(10)].forEach(async (item, index) => {
    const result = await prisma?.product.create({
      data: {
        name: `${index}번 상품`,
        price: +index,
        cloudflareImageId: "",
        description: `${index}번 상품입니다.`,
        user: { connect: { id: 5 } },
      },
    });

    console.log("result", result);
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
