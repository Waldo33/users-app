import { combine, createStore } from "effector";
import { TUser } from "./types";
import { UsersEffects } from "./effects";
import { UsersEvents } from "./events";

const $users = createStore<TUser[]>([])
  .on(UsersEffects.load.doneData, (_, payload) => payload)
  .on(UsersEffects.addUser.doneData, (users, payload) => [payload, ...users])
  .on(UsersEffects.removeAnyUsers.doneData, (users, payload) =>
    users.filter((user) => !payload.includes(user.id)),
  );

const $usersById = $users.map((users) =>
  users.reduce(
    (acc, curr) => {
      acc[curr.id] = curr;
      return acc;
    },
    {} as Record<TUser["id"], TUser>,
  ),
);

const $selectedUserIds = createStore<Array<TUser["id"]>>([])
  .on(UsersEvents.updateSelectedIds, (state, payload) =>
    state.includes(payload)
      ? state.filter((id) => id !== payload)
      : [...state, payload],
  )
  .on(UsersEffects.removeAnyUsers.doneData, (state, payload) =>
    state.filter((id) => !payload.includes(id)),
  );

const $selectedUsers = combine(
  $selectedUserIds,
  $usersById,
  (selectedUserIds, usersById) => selectedUserIds.map((id) => usersById[id]),
);

const $isLoading = UsersEffects.load.pending;

export const UsersStore = {
  $users,
  $usersById,
  $selectedUserIds,
  $selectedUsers,
  $isLoading,
};
