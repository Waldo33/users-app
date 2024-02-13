import type { TSortOrder, TUsersSortFields } from "@entities/User";
import type {
  TFiltersValues,
  TOptions,
  TSortValues,
} from "@features/SearchUsers";
import { Box, Drawer, Stack, TextField, Typography } from "@mui/material";
import type { TUseVisibilityFunctions } from "@shared/hooks";
import { SelectInput } from "@shared/ui";
import { ChangeEvent, FC, useCallback } from "react";
import { useTranslation } from "react-i18next";

interface IUsersFilterDrawerProps {
  open: boolean;
  filterDrawer: TUseVisibilityFunctions;
  sortOptions: TOptions["sortOptions"];
  orderOptions: TOptions["orderOptions"];
  onChangeSortField: (value: TUsersSortFields) => void;
  onChangeSortOrder: (value: TSortOrder) => void;
  onChangePhoneFilter: (value: string) => void;
  onChangeEmailFilter: (value: string) => void;
  values: [TSortValues, TFiltersValues];
}

export const UsersFilterDrawer: FC<IUsersFilterDrawerProps> = ({
  sortOptions,
  orderOptions,
  open,
  filterDrawer,
  onChangeSortField,
  onChangeSortOrder,
  onChangePhoneFilter,
  onChangeEmailFilter,
  values,
}) => {
  const { t } = useTranslation("translation", { keyPrefix: "sortUsers" });
  const [sort, filters] = values;

  const onChangePhoneFilterHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      onChangePhoneFilter(event.target.value);
    },
    [onChangePhoneFilter],
  );

  const onChangeEmailFilterHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      onChangeEmailFilter(event.target.value);
    },
    [onChangeEmailFilter],
  );

  return (
    <Drawer anchor="bottom" open={open} onClose={filterDrawer.hide}>
      <Box sx={{ p: 2 }}>
        <Box>
          <Typography variant="h6" sx={{ mb: 2 }}>
            {t("sortAndFilters")}
          </Typography>
          <Stack direction={"row"} gap={1}>
            <SelectInput
              value={sort.field}
              options={sortOptions}
              label={t("sortField")}
              onChange={onChangeSortField}
            />
            <SelectInput
              value={sort.order}
              options={orderOptions}
              label={t("sortOrder")}
              onChange={onChangeSortOrder}
            />
          </Stack>
          <Stack direction={"column"} gap={2} sx={{ my: 2 }}>
            <TextField
              value={filters.phone}
              label={t("filterByPhone")}
              fullWidth
              onChange={onChangePhoneFilterHandler}
            />
            <TextField
              value={filters.email}
              label={t("filterByEmail")}
              fullWidth
              onChange={onChangeEmailFilterHandler}
            />
          </Stack>
        </Box>
      </Box>
    </Drawer>
  );
};
