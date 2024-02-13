import { SearchInput } from "@shared/ui";
import { useTranslation } from "react-i18next";
import { SearchUsersEvents } from "../model/events";
import { Tune } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { FC } from "react";

interface ISearchUsersProps {
  onClickSettings: () => void;
}

export const SearchUsers: FC<ISearchUsersProps> = ({ onClickSettings }) => {
  const { t } = useTranslation("translation", {
    keyPrefix: "searchUsers",
  });

  const onSearchHandler = (value: string) => {
    SearchUsersEvents.setSearchQuery(value);
  };

  return (
    <SearchInput
      placeholder={t("placeholder")}
      onSearch={onSearchHandler}
      icon={
        <IconButton onClick={onClickSettings}>
          <Tune />
        </IconButton>
      }
    />
  );
};
