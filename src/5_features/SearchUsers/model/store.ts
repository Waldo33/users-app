import { combine, createStore } from "effector";
import { TSortOrder, TUsersSortFields, UsersStore } from "@entities/User";
import { SearchUsersEvents } from "./events";
import { sortUsersByNameOrId, sortUsersByZipcode } from "./lib";

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

const $sortedAndFilteredUsers = combine(
  UsersStore.$users,
  $query,
  $sort,
  $filters,
  (users, query, sort, filters) =>
    [...users]
      .sort((user1, user2) =>
        sort.field === "address.zipcode"
          ? sortUsersByZipcode(user1, user2, sort.order)
          : sortUsersByNameOrId(user1, user2, sort.order, sort.field),
      )
      .filter(
        (user) =>
          user.name.includes(query) &&
          user.email.includes(filters.email) &&
          user.phone.includes(filters.phone),
      ),
);

export const SearchUsersStore = {
  $query,
  $sort,
  $filters,
  $sortedAndFilteredUsers,
};
