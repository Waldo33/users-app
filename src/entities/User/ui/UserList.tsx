import React, { FC, useCallback } from "react";
import { TUser } from "../model/types";
import { UserItem } from "./UserItem";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Skeleton,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";

interface IUserListProps {
  users?: TUser[] | null;
  isLoading?: boolean;
  selectedIds?: number[];
  onSelectItem?: (userId: TUser["id"]) => void;
}

export const UserList: FC<IUserListProps> = ({
  users,
  isLoading,
  selectedIds = [],
  onSelectItem,
}) => {
  const { t } = useTranslation("translation");

  const onClickItemHandler = useCallback(
    (userId: TUser["id"]) => {
      onSelectItem?.(userId);
    },
    [onSelectItem],
  );

  return (
    <Box sx={{ overflowY: "auto" }}>
      {!isLoading && users?.length === 0 && (
        <Typography align="center" variant="h6">
          {t("searchUsers.notFound")}
        </Typography>
      )}
      {!isLoading && users && (
        <List>
          {users.map((user) => (
            <UserItem
              key={user.id}
              user={user}
              isSelected={selectedIds.includes(user.id)}
              onClick={onClickItemHandler}
            />
          ))}
        </List>
      )}
      {isLoading && (
        <List>
          {Array(10)
            .fill(0)
            .map((_, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <Skeleton variant="rounded" width={40} height={40} />
                  </ListItemIcon>
                  <ListItemText
                    primary={<Skeleton variant="text"></Skeleton>}
                    secondary={
                      <React.Fragment>
                        <Skeleton variant="text"></Skeleton>
                        <Skeleton variant="text"></Skeleton>
                        <Skeleton variant="text"></Skeleton>
                        <Skeleton variant="text"></Skeleton>
                      </React.Fragment>
                    }
                  />
                </ListItemButton>
              </ListItem>
            ))}
        </List>
      )}
    </Box>
  );
};
