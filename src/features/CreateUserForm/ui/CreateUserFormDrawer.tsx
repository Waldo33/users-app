import { Drawer } from "@mui/material";
import { FC } from "react";
import { CreateUserForm } from "./CreateUserForm";
import { TUseVisibilityFunctions } from "@shared/hooks";

interface ICreateUserFormDrawerProps {
  open: boolean;
  createUserDialog: TUseVisibilityFunctions;
}

export const CreateUserFormDrawer: FC<ICreateUserFormDrawerProps> = ({
  open,
  createUserDialog,
}) => {
  return (
    <Drawer anchor="bottom" open={open} onClose={createUserDialog.hide}>
      <CreateUserForm />
    </Drawer>
  );
};
