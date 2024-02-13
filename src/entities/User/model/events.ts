import { createEvent } from "effector";
import { TUser } from "./types";

export const UsersEvents = {
  updateSelectedIds: createEvent<TUser["id"]>(),
};
