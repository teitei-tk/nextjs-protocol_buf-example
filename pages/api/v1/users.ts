import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "libs/prisma";

import { Error, ErrorCode, ErrorResponse } from "gen/error_response_pb";
import { User } from "gen/user_pb";
import { UsersReadResponse } from "gen/users_read_response_pb";
import { UserCreateRequest } from "gen/user_create_request_pb";
import { UserCreateResponse } from "gen/user_create_response_pb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method?.toLowerCase()) {
      case "get":
        return await get(req, res);
      case "post":
        console.log("post");
        return await post(req, res);
      default:
        throw new Error();
    }
  } catch (e) {
    console.error(e);

    const err = new Error();
    err.setCode(ErrorCode.INTERNAL);
    err.setReason("example error");

    const resp = new ErrorResponse();
    resp.setErrorsList([err]);

    return res.status(500).send(Buffer.from(resp.serializeBinary()));
  } finally {
    await prisma.$disconnect();
  }
}

const get = async (_req: NextApiRequest, res: NextApiResponse) => {
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
};

const post = async (req: NextApiRequest, res: NextApiResponse) => {
  const payload = UserCreateRequest.deserializeBinary(
    Buffer.from(req.body)
  ).toObject();

  const [newUser] = await prisma.$transaction([
    prisma.user.create({
      data: payload,
    }),
  ]);

  const respUser = new User();
  respUser.setId(newUser.id);
  respUser.setName(newUser.name ?? "");
  respUser.setEmail(newUser.email);

  const resp = new UserCreateResponse();
  resp.setUser(respUser);

  const buffer = Buffer.from(resp.serializeBinary());
  return res.status(200).send(buffer);
};
