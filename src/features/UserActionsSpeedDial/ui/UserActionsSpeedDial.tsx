import { TUser } from "@entities/User/model/types";
import { Add, Delete } from "@mui/icons-material";
import {
  Backdrop,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
} from "@mui/material";
import { TUseVisibilityFunctions } from "@shared/hooks";
import { FC } from "react";
import { useTranslation } from "react-i18next";

interface IUserActionsSpeedDialProps {
  open: boolean;
  selectedUserIds: TUser["id"][];
  speedDial: TUseVisibilityFunctions;
  deleteConfirmDialog: TUseVisibilityFunctions;
  onClickCreateHandler: () => void;
}

export const UserActionsSpeedDial: FC<IUserActionsSpeedDialProps> = ({
  open,
  speedDial,
  selectedUserIds,
  onClickCreateHandler,
  deleteConfirmDialog,
}) => {
  const { t } = useTranslation("translation", {
    keyPrefix: "speedDial",
  });

  return (
    <>
      <Backdrop open={open} />
      <SpeedDial
        open={open}
        ariaLabel="UserActionsSpeedDial"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
        onClose={speedDial.hide}
        onOpen={speedDial.show}
      >
        <SpeedDialAction
          key={"createUser"}
          icon={<Add />}
          tooltipTitle={t("createUser")}
          tooltipOpen
          onClick={onClickCreateHandler}
        />
        <SpeedDialAction
          sx={{
            opacity: !selectedUserIds.length ? 0.7 : 1,
            pointerEvents: !selectedUserIds.length ? "none" : "auto",
          }}
          key={"deleteUsers"}
          icon={<Delete />}
          tooltipTitle={t("deleteSelectedUsers")}
          tooltipOpen
          onClick={deleteConfirmDialog.show}
        />
      </SpeedDial>
    </>
  );
};
