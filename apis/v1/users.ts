import useSWR from "swr";
import { protocolBuffersFetcher } from "./fetcher";
import { User } from "./../../gen/user_pb";
import { UsersReadResponse } from "./../../gen/users_read_response_pb";

const getUsers = () => {
  const url = "/api/v1/users";
  const ret = useSWR(url, protocolBuffersFetcher);
  const buf = new Uint8Array(ret.data ?? []);

  let users: User.AsObject[] = [];
  try {
    const resp = UsersReadResponse.deserializeBinary(buf).toObject();
    users = resp.usersList;
  } catch (e) {
    // TODO: deserialize error binary
  }

  return {
    ...ret,
    data: users,
  };
};

export { getUsers };
