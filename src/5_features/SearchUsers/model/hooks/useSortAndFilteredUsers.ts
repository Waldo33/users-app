import { useUnit } from "effector-react";
import { useTranslation } from "react-i18next";
import { SearchUsersStore } from "../store";
import {
  TSortOrder,
  TUsersSortFields,
  UsersEffects,
  UsersStore,
} from "@entities/User";
import { useCallback, useEffect, useMemo } from "react";
import { SearchUsersEvents } from "../events";
import { TUser } from "@entities/User/model/types";

type SortOption = { value: TUsersSortFields; label: string };
type OrderOption = { value: TSortOrder; label: string };

export type TOptions = {
  sortOptions: SortOption[];
  orderOptions: OrderOption[];
};

type THandlers = {
  onChangeSortFieldHandler: (value: TUsersSortFields) => void;
  onChangeSortOrderHandler: (value: TSortOrder) => void;
  onChangePhoneFilterHandler: (value: string) => void;
  onChangeEmailFilterHandler: (value: string) => void;
};

export type TSortValues = {
  field: TUsersSortFields;
  order: TSortOrder;
};

export type TFiltersValues = {
  phone: string;
  email: string;
};

type TReturnValue = [
  TUser[],
  boolean,
  TOptions,
  THandlers,
  TSortValues,
  TFiltersValues,
];

export const useSortAndFilteredUsers = () => {
  const { t } = useTranslation("translation");
  const sortedAndFilteredUsers = useUnit(
    SearchUsersStore.$sortedAndFilteredUsers,
  );
  const isLoading = useUnit(UsersStore.$isLoading);

  const [sort, filters] = useUnit([
    SearchUsersStore.$sort,
    SearchUsersStore.$filters,
  ]);

  const sortOptions: SortOption[] = useMemo(
    () => [
      {
        value: "id",
        label: t("sortUsers.options.id"),
      },
      {
        value: "name",
        label: t("sortUsers.options.name"),
      },
      {
        value: "address.zipcode",
        label: t("sortUsers.options.zipcode"),
      },
    ],
    [t],
  );

  const orderOptions: OrderOption[] = useMemo(
    () => [
      {
        value: "asc",
        label: t("sortOrder.asc"),
      },
      {
        value: "desc",
        label: t("sortOrder.desc"),
      },
    ],
    [t],
  );

  const onChangeSortFieldHandler = useCallback(
    (value: TUsersSortFields) => {
      SearchUsersEvents.setSortField(value);
    },
    [SearchUsersEvents.setSortField],
  );

  const onChangeSortOrderHandler = useCallback(
    (value: TSortOrder) => {
      SearchUsersEvents.setSortOrder(value);
    },
    [SearchUsersEvents.setSortOrder],
  );

  const onChangePhoneFilterHandler = useCallback(
    (value: string) => {
      SearchUsersEvents.setPhoneFilter(value);
    },
    [SearchUsersEvents.setPhoneFilter],
  );

  const onChangeEmailFilterHandler = useCallback(
    (value: string) => {
      SearchUsersEvents.setEmailFilter(value);
    },
    [SearchUsersEvents.setEmailFilter],
  );

  useEffect(() => {
    UsersEffects.load();
  }, []);

  const options: TOptions = useMemo(
    () => ({
      sortOptions,
      orderOptions,
    }),
    [sortOptions, orderOptions],
  );
  const handlers: THandlers = useMemo(
    () => ({
      onChangeSortFieldHandler,
      onChangeSortOrderHandler,
      onChangePhoneFilterHandler,
      onChangeEmailFilterHandler,
    }),
    [
      onChangeSortFieldHandler,
      onChangeSortOrderHandler,
      onChangePhoneFilterHandler,
      onChangeEmailFilterHandler,
    ],
  );

  return [
    sortedAndFilteredUsers,
    isLoading,
    options,
    handlers,
    sort,
    filters,
  ] as TReturnValue;
};
