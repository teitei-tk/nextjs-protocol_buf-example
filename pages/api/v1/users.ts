import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "libs/prisma";
import { User } from "gen/user_pb";
import { UsersReadResponse } from "gen/users_read_response_pb";

import { Error, ErrorCode, ErrorResponse } from "gen/error_response_pb";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  try {
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

    const buffer = Buffer.from(resp.serializeBinary());
    res.status(200).send(buffer);
  } catch (e) {
    const err = new Error();
    err.setCode(ErrorCode.INTERNAL);
    err.setReason("example error");

    const resp = new ErrorResponse();
    resp.setErrorsList([err]);

    res.status(500).send(Buffer.from(resp.serializeBinary()));
  } finally {
    await prisma.$disconnect();
  }
}
