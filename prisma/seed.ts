import { PrismaClient, Prisma } from "prisma/prisma-client";

const initialUserProps: Prisma.UserCreateInput[] = [
  {
    email: "hoge@example.com",
    name: "john doe",
  },
  {
    email: "foo@example.com",
    name: "taro sato",
  },
];

const main = async () => {
  const client = new PrismaClient();

  console.log("start seed injection");

  try {
    await client.user.deleteMany({ where: {} });

    const users = initialUserProps.map((r) => {
      return client.user.create({
        data: r,
      });
    });

    await client.$transaction(users);
  } catch (e) {
    console.error("inject error");
    console.error(e);
    process.exit(1);
  } finally {
    await client.$disconnect();
  }

  console.log("finish");
};

main();
