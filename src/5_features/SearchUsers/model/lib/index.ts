import { TSortOrder, TUser } from "@entities/User";

export const sortUsersByZipcode = (
  user1: TUser,
  user2: TUser,
  order: TSortOrder,
) => {
  const zipcode1 = user1.address.zipcode || 0;
  const zipcode2 = user2.address.zipcode || 0;
  if (zipcode1 < zipcode2) {
    return order === "asc" ? -1 : 1;
  }
  if (zipcode1 > zipcode2) {
    return order === "asc" ? 1 : -1;
  }
  return 0;
};

export const sortUsersByNameOrId = (
  user1: TUser,
  user2: TUser,
  order: TSortOrder,
  key: keyof Pick<TUser, "id" | "name">,
) => {
  if (user1[key] < user2[key]) {
    return order === "asc" ? -1 : 1;
  }
  if (user1[key] > user2[key]) {
    return order === "asc" ? 1 : -1;
  }
  return 0;
};
