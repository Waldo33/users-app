import { TSortOrder, TUsersSortFields } from "@entities/User";
import { createEvent } from "effector";

export const SearchUsersEvents = {
  setSearchQuery: createEvent<string>(),
  setSortField: createEvent<TUsersSortFields>(),
  setSortOrder: createEvent<TSortOrder>(),
  setPhoneFilter: createEvent<string>(),
  setEmailFilter: createEvent<string>(),
};
