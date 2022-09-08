import React, { useState } from "react";
import type { NextPage } from "next";
import { Stack, Paper, Fab } from "@mui/material";
import { styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";

import { getUsers } from "apis/v1/users";

import UserRegisterDialog from "components/UserRegisterDialog";
import { User } from "gen/user_pb";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Home: NextPage = () => {
  const [open, setOpen] = useState(false);
  const { data: users, error, mutate } = getUsers();

  if (error && error.getErrorsList().length > 0) {
    console.error(error.getErrorsList());
  }

  const handleDialogOnClick = () => {
    setOpen(true);
  };

  const handleDialogOnClose = () => {
    setOpen(false);
  };

  const mutateUsers = (newUser: User.AsObject) => {
    if (!users) {
      return;
    }

    mutate([...users, newUser]);
  };

  return (
    <React.Fragment>
      <Stack spacing={2}>
        {users &&
          users.map((u, i) => {
            return (
              <Item key={i}>
                <p>ID: {u.id}</p>
                <p>Name: {u.name}</p>
                <p>Email: {u.email}</p>
              </Item>
            );
          })}
      </Stack>
      <Fab aria-label="Add" color="primary" onClick={handleDialogOnClick}>
        <AddIcon />
      </Fab>
      <UserRegisterDialog
        open={open}
        mutate={mutateUsers}
        onClose={handleDialogOnClose}
      />
    </React.Fragment>
  );
};

export default Home;
