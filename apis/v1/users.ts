import useSWR from "swr";

import { User } from "gen/user_pb";
import { UsersReadResponse } from "gen/users_read_response_pb";
import { UserCreateRequest } from "gen/user_create_request_pb";
import { UserCreateResponse } from "gen/user_create_response_pb";
import { Error, ErrorResponse } from "gen/error_response_pb";

type PostUser = Omit<User.AsObject, "id">;

const getUsers = () => {
  const fetcher = (url: string, init?: RequestInit) => {
    return new Promise<User.AsObject[]>(async (resolve, reject) => {
      const result = await fetch(url, {
        headers: {
          "Content-Type": "application/protobuf",
        },
        ...(init ?? {}),
      });

      const data = await result.arrayBuffer();
      const buf = new Uint8Array(data ?? []);
      if (result.status === 200 || result.status === 304) {
        const resp = UsersReadResponse.deserializeBinary(buf);
        resolve(resp.toObject().usersList);
      } else {
        const resp = ErrorResponse.deserializeBinary(buf);
        reject(resp);
      }
    });
  };

  const url = "/api/v1/users";
  return useSWR<User.AsObject[], ErrorResponse>(url, fetcher);
};

const postUser = async (input: PostUser) => {
  const req = new UserCreateRequest();
  req.setName(input.name);
  req.setEmail(input.email);

  const url = "/api/v1/users";
  const result = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/protocol",
    },
    body: Buffer.from(req.serializeBinary()),
  });

  const buf = new Uint8Array((await result.arrayBuffer()) ?? []);

  let user: User.AsObject | undefined = undefined;
  let error: Error.AsObject[] = [];
  try {
    const ret = UserCreateResponse.deserializeBinary(
      new Uint8Array(buf)
    ).toObject();
    user = ret.user;
  } catch (e) {
    const resp = ErrorResponse.deserializeBinary(buf).toObject();
    error = resp.errorsList;
  }

  return {
    data: user,
    error,
  };
};

export { getUsers, postUser };
