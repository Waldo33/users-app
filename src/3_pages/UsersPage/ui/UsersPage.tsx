import { AppBar, Box, Toolbar } from "@mui/material";
import { useCallback } from "react";
import { useVisibility } from "@shared/hooks";
import { CreateUserFormDrawer } from "@features/CreateUserForm";
import { SearchUsers, useSortAndFilteredUsers } from "@features/SearchUsers";
import {
  UsersEffects,
  UsersEvents,
  UsersStore,
  UserList,
} from "@entities/User";
import { useUnit } from "effector-react";
import { DeleteUsersConfirmDialog } from "@features/DeleteUsersConfirmDialog";
import type { TUser } from "@entities/User";
import { UserActionsSpeedDial } from "@features/UserActionsSpeedDial";
import { UsersFilterDrawer } from "@features/UsersFilterDrawer";

export const UsersPage = () => {
  const [
    users,
    isLoading,
    { sortOptions, orderOptions },
    {
      onChangeSortFieldHandler,
      onChangeSortOrderHandler,
      onChangePhoneFilterHandler,
      onChangeEmailFilterHandler,
    },
    currentSort,
    currentFilters,
  ] = useSortAndFilteredUsers();

  const [selectedUserIds, selectedUsers] = useUnit([
    UsersStore.$selectedUserIds,
    UsersStore.$selectedUsers,
  ]);

  const [isShowFilterDrawer, filterDrawer] = useVisibility(false);
  const [isShowSpeedDial, speedDial] = useVisibility(false);
  const [isShowCreateUserDialog, createUserDialog] = useVisibility(false);
  const [isShowDeleteConfirmDialog, deleteConfirmDialog] = useVisibility(false);

  const onClickSearchHandler = useCallback(() => {
    filterDrawer.show();
  }, [filterDrawer.show]);

  const onClickCreateHandler = useCallback(() => {
    createUserDialog.show();
    speedDial.hide();
  }, [speedDial.hide, createUserDialog.show]);

  const onClickDeleteHandler = useCallback(() => {
    if (!selectedUserIds.length) {
      return;
    }

    UsersEffects.removeAnyUsers(selectedUserIds);

    deleteConfirmDialog.hide();
  }, [deleteConfirmDialog.hide, UsersEffects.removeAnyUsers, selectedUserIds]);

  const onDeleteChipHandler = useCallback(
    (userId: TUser["id"]) => () => {
      UsersEvents.updateSelectedIds(userId);

      if (selectedUserIds.length === 1) {
        deleteConfirmDialog.hide();
      }
    },
    [deleteConfirmDialog, selectedUserIds, UsersEvents.updateSelectedIds],
  );

  return (
    <Box sx={{ p: 2, pt: 12 }}>
      <AppBar>
        <Toolbar sx={{ p: 2, bgcolor: "white" }}>
          <SearchUsers onClickSettings={onClickSearchHandler} />
        </Toolbar>
      </AppBar>
      <UserList
        users={users}
        isLoading={isLoading}
        selectedIds={selectedUserIds}
        onSelectItem={UsersEvents.updateSelectedIds}
      />
      <CreateUserFormDrawer
        open={isShowCreateUserDialog}
        createUserDialog={createUserDialog}
      />
      <UsersFilterDrawer
        open={isShowFilterDrawer}
        filterDrawer={filterDrawer}
        sortOptions={sortOptions}
        orderOptions={orderOptions}
        values={[currentSort, currentFilters]}
        onChangeSortField={onChangeSortFieldHandler}
        onChangeSortOrder={onChangeSortOrderHandler}
        onChangePhoneFilter={onChangePhoneFilterHandler}
        onChangeEmailFilter={onChangeEmailFilterHandler}
      />
      <DeleteUsersConfirmDialog
        open={isShowDeleteConfirmDialog}
        selectedUsers={selectedUsers}
        deleteConfirmDialog={deleteConfirmDialog}
        onClickDeleteHandler={onClickDeleteHandler}
        onDeleteChipHandler={onDeleteChipHandler}
      />
      <UserActionsSpeedDial
        open={isShowSpeedDial}
        selectedUserIds={selectedUserIds}
        speedDial={speedDial}
        deleteConfirmDialog={deleteConfirmDialog}
        onClickCreateHandler={onClickCreateHandler}
      />
    </Box>
  );
};
