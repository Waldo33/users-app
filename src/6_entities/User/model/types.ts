export type TUser = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: TAddress;
  phone: string;
};

type TAddress = {
  street?: string;
  suite?: string;
  city?: string;
  zipcode?: string;
};

export type TUsersSortFields = "id" | "name" | "address.zipcode";
export type TSortOrder = "asc" | "desc";
