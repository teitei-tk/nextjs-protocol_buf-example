import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "prisma/prisma-client";

import { User } from "gen/user_pb";
import { UsersReadResponse } from "gen/users_read_response_pb";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient();
  const users = await prisma.user.findMany({
    take: 10,
  });

  const resp = new UsersReadResponse();
  resp.setUsersList(
    users.map((r) => {
      const u = new User();
      u.setId(r.id);
      u.setName(r.name ?? "");
      u.setEmail(r.email);

      return u;
    })
  );

  await prisma.$disconnect();

  const buffer = Buffer.from(resp.serializeBinary());
  res.status(200).send(buffer);
}
