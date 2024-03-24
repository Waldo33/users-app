import { createStore } from "effector";
import { TCell } from "../ui/RouterConfigPage";
import { RouterConfigEvents } from "./events";

const MOCK_DATA = [...Array(35).keys()].map((value) => ({
  available: true,
  value,
}));

const $cells = createStore<TCell[]>(MOCK_DATA)
  .on(RouterConfigEvents.setCellDisabled, (state, payload) =>
    state.map((cell) => {
      if (payload === cell.value) {
        cell.available = false;
      }
      return cell;
    }),
  )
  .on(RouterConfigEvents.setActiveCell, (state, payload) =>
    state.map((cell) => {
      if (payload.value === cell.value) {
        cell.available = false;
      }
      return cell;
    }),
  )
  .on(RouterConfigEvents.reset, (state) =>
    state.map((cell) => {
      cell.available = true;
      return cell;
    }),
  );

const $cellsById = $cells.map((cells) =>
  cells.reduce(
    (acc, cell) => {
      acc[cell.value] = cell;
      return acc;
    },
    {} as Record<TCell["value"], TCell>,
  ),
);

const $activeCell = createStore<TCell["value"] | null>(null)
  .on(RouterConfigEvents.setActiveCell, (_, payload) => payload)
  .on(RouterConfigEvents.reset, () => null);

export const RouterConfigStore = {
  $cells,
  $cellsById,
  $activeCell,
};

$cells.watch((state) => console.debug(state));
