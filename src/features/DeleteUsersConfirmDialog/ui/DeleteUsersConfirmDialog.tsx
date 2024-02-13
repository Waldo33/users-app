import { TUser } from "@entities/User/model/types";
import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
} from "@mui/material";
import { TUseVisibilityFunctions } from "@shared/hooks";
import { FC } from "react";
import { useTranslation } from "react-i18next";

interface IDeleteUsersConfirmDialogProps {
  selectedUsers: TUser[];
  open: boolean;
  deleteConfirmDialog: TUseVisibilityFunctions;
  onClickDeleteHandler: () => void;
  onDeleteChipHandler: (userId: TUser["id"]) => () => void;
}

export const DeleteUsersConfirmDialog: FC<IDeleteUsersConfirmDialogProps> = ({
  selectedUsers,
  open,
  deleteConfirmDialog,
  onClickDeleteHandler,
  onDeleteChipHandler,
}) => {
  const { t } = useTranslation("translation", {
    keyPrefix: "deleteUsersConfirmDialog",
  });

  return (
    <Dialog
      open={open}
      keepMounted
      onClose={deleteConfirmDialog.hide}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{t("title")}</DialogTitle>
      <DialogContent>
        <DialogContentText>{t("text")}</DialogContentText>
        <Stack direction="row" gap={1} sx={{ mt: 1 }}>
          {selectedUsers.map((user) => (
            <Chip
              key={user.id}
              color="primary"
              variant="outlined"
              label={user.name}
              onDelete={onDeleteChipHandler(user.id)}
            />
          ))}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClickDeleteHandler} color="error">
          {t("agree")}
        </Button>
        <Button onClick={deleteConfirmDialog.hide} variant="contained">
          {t("disagree")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
