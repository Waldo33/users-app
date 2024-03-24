import React, { ElementType, FC, useCallback } from "react";
import { TUser } from "../model/types";
import {
  Avatar,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { stringAvatar } from "../model/lib/stringAvatar";

interface IUserItemProps {
  user: TUser;
  isSelected?: boolean;
  onClick?: (userId: TUser["id"]) => void;
}

export const UserItem: FC<IUserItemProps> = ({ user, isSelected, onClick }) => {
  const { id, name, username, email, phone, address } = user;

  const onClickHandler = useCallback(
    (userId: TUser["id"]) => () => {
      onClick?.(userId);
    },
    [onClick]
  );

  return (
    <ListItem disablePadding>
      <ListItemButton selected={isSelected} onClick={onClickHandler(id)}>
        <ListItemIcon>
          <Avatar {...stringAvatar(name)} />
        </ListItemIcon>
        <ListItemText<ElementType>
          primary={
            <Typography>
              {name} (@{username})
            </Typography>
          }
          secondary={
            <React.Fragment>
              <Typography sx={{ display: "block" }} component={"span"}>
                {email}
              </Typography>
              <Typography sx={{ display: "block" }} component={"span"}>
                {phone}
              </Typography>
              <Typography sx={{ display: "block" }} component={"span"}>
                {address.zipcode}
              </Typography>
            </React.Fragment>
          }
        />
      </ListItemButton>
    </ListItem>
  );
};
