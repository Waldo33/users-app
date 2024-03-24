import { createEvent } from "effector";
import { TCell } from "../ui/RouterConfigPage";

export const RouterConfigEvents = {
  setCellDisabled: createEvent<TCell["value"]>(),
  setActiveCell: createEvent<TCell["value"]>(),
  reset: createEvent(),
};
