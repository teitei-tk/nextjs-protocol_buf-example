import type { NextPage } from "next";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

import { postUser } from "apis/v1/users";
import { User } from "gen/user_pb";

type Props = {
  open: boolean;
  mutate: (newUser: User.AsObject) => void;
  onClose: () => void;
};

type UserCreateRequestForm = {
  name: string;
  email: string;
};

const UserRegisterDialog: NextPage<Props> = ({ open, onClose, mutate }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserCreateRequestForm>();

  const userRegisterSubmit: SubmitHandler<UserCreateRequestForm> = async (
    input
  ) => {
    const { data } = await postUser(input);
    if (data) {
      mutate(data);
    }
    reset();
    onClose();
    return;
  };

  return (
    <div>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>User Register</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="name"
            type="text"
            fullWidth
            variant="standard"
            {...register("name", {
              minLength: 2,
              required: true,
            })}
          />
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            {...register("email", {
              required: true,
              pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            })}
          />
        </DialogContent>
        {errors.email && <p>email field is required</p>}
        {errors.email?.type === "pattern" && <p>invalid email address</p>}
        {errors.name && <p>name field is required</p>}
        {errors.name?.type === "minLength" && (
          <p>Please enter at least 2 characters for the name.</p>
        )}
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit(userRegisterSubmit)}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserRegisterDialog;
