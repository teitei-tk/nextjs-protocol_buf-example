import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { Stack, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

import { User } from "./../gen/user_pb";
import { UsersReadResponse } from "./../gen/users_read_response_pb";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Home: NextPage = () => {
  const [users, setUsers] = useState<User.AsObject[]>([]);

  useEffect(() => {
    const main = async () => {
      const res = await fetch("/api/v1/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/protobuf",
        },
      });

      const buf = new Uint8Array(await res.arrayBuffer());
      const resp = UsersReadResponse.deserializeBinary(buf).toObject();
      setUsers(resp.usersList);
    };

    main();
  }, [setUsers]);

  return (
    <Stack spacing={2}>
      {users.map((u, i) => {
        return (
          <Item key={i}>
            <p>ID: {u.id}</p>
            <p>Name: {u.name}</p>
            <p>Email: {u.email}</p>
          </Item>
        );
      })}
    </Stack>
  );
};

export default Home;
