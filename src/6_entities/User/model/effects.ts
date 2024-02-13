import { $api } from "@shared/api";
import { createEffect } from "effector";
import { TUser } from "./types";
import { TUserValidationSchema } from "@features/CreateUserForm";

export const UsersEffects = {
  load: createEffect(async () => {
    // Если бы кол-во пользователей не ограничивалось 10,
    // можно было бы добавить бесконечную подгрузку на основе Intersection Observer API

    const { data } = await $api.get<TUser[]>("/users");

    return data;
  }),
  addUser: createEffect<TUserValidationSchema, TUser>(async (payload) => {
    // Не хватает обработки ошибок при создании, т.к. не успел сделать
    // Как пример, можно было бы создать общую очередь с ошибками в сторе,
    // и засовывать ошибки туда при UsersEffects.addUser.fail,
    // на основе которых будут вызываться всплывающие окна

    const { data } = await $api.post<TUser>("/users", payload);

    return data;
  }),
  removeAnyUsers: createEffect<TUser["id"][], TUser["id"][]>(
    async (userIds) => {
      const responses = await Promise.all(
        userIds.map((id) => $api.delete<TUser>(`/users/${id}`)),
      );

      const responseIds = responses.map(
        (response) => +response.request.responseURL.split("/").at(-1),
      );

      return responseIds;
    },
  ),
};
