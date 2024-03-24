import {
  AppBar,
  Box,
  Button,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import s from "./RouterConfigPage.module.scss";
import { useUnit } from "effector-react";
import { RouterConfigStore } from "../model/store";
import { RouterConfigEvents } from "../model/events";
import { Settings } from "@mui/icons-material";

export type TCell = {
  available: boolean;
  value: number;
};

export const RouterConfigPage = () => {
  const [activeCellValue, cells, cellsByValue] = useUnit([
    RouterConfigStore.$activeCell,
    RouterConfigStore.$cells,
    RouterConfigStore.$cellsById,
  ]);

  const copyToClipboard = (value: number) => {
    return () => {
      const cell = cellsByValue[value];

      if (cell.value === activeCellValue) {
        window.navigator.clipboard.writeText(String(value));
      }

      if (!cell.available) {
        return;
      }
      //   window.alert("Password has been copied!");
      window.navigator.clipboard.writeText(String(value));
      RouterConfigEvents.setActiveCell(value);
      RouterConfigEvents.setCellDisabled(value);
    };
  };

  const onReset = () => RouterConfigEvents.reset();

  return (
    <Box sx={{ p: 2, pt: 10 }}>
      <AppBar>
        <Toolbar sx={{ p: 2 }}>
          <Settings sx={{ mr: 2 }} />
          <Typography variant="h5">RouterConfig</Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ mb: 2 }}>
        <TextField label={"AA:BB:CC:DD:EE:FF"} fullWidth />
      </Box>
      <Box>
        <div className={s.grid}>
          {cells &&
            cells.map(({ value, available }) => (
              <div
                key={value}
                onClick={copyToClipboard(value)}
                className={[
                  s.cell,
                  activeCellValue === value && s.active,
                  !available && activeCellValue !== value && s.disabled,
                ].join(" ")}
              ></div>
            ))}
        </div>
      </Box>
      <Button sx={{ mt: 2 }} variant="contained" onClick={onReset}>
        Reset
      </Button>
    </Box>
  );
};
