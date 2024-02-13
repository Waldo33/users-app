import { createStore } from "effector";
import { TSortOrder, TUsersSortFields } from "@entities/User";
import { SearchUsersEvents } from "./events";

const $query = createStore<string>("").on(
  SearchUsersEvents.setSearchQuery,
  (_, payload) => payload,
);

const $sort = createStore<{
  field: TUsersSortFields;
  order: TSortOrder;
}>({
  field: "id",
  order: "asc",
})
  .on(SearchUsersEvents.setSortField, (state, payload) => ({
    ...state,
    field: payload,
  }))
  .on(SearchUsersEvents.setSortOrder, (state, payload) => ({
    ...state,
    order: payload,
  }));

const $filters = createStore<{
  email: string;
  phone: string;
}>({
  email: "",
  phone: "",
})
  .on(SearchUsersEvents.setPhoneFilter, (state, payload) => ({
    ...state,
    phone: payload,
  }))
  .on(SearchUsersEvents.setEmailFilter, (state, payload) => ({
    ...state,
    email: payload,
  }));

export const SearchUsersStore = {
  $query,
  $sort,
  $filters,
};
