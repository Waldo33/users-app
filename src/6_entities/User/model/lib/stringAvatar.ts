import { stringToColor } from "@shared/lib";

export const stringAvatar = (name: string) => {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.at(0)}`,
  };
};
