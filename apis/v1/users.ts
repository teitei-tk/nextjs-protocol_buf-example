import useSWR from "swr";

import { protocolBuffersFetcher } from "apis/v1/fetcher";
import { User } from "gen/user_pb";
import { UsersReadResponse } from "gen/users_read_response_pb";
import { Error, ErrorResponse } from "gen/error_response_pb";

const getUsers = () => {
  const url = "/api/v1/users";
  const ret = useSWR<ArrayBuffer, ErrorResponse>(url, protocolBuffersFetcher);

  let users: User.AsObject[] = [];
  let error: Error.AsObject[] = [];
  if (ret.data) {
    const buf = new Uint8Array(ret.data ?? []);
    const resp = UsersReadResponse.deserializeBinary(buf).toObject();
    users = resp.usersList;
  } else {
    error = ret.error?.toObject().errorsList ?? [];
  }

  return {
    ...ret,
    data: users,
    error,
  };
};

export { getUsers };
