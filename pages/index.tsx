import type { NextPage } from "next";
import { Stack, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

import { getUsers } from "../apis/v1/users";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Home: NextPage = () => {
  const { data: users, error } = getUsers();

  if (error) {
    console.error(error);
  }

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
