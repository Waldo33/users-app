import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
import { useCallback } from "react";
import { v4 as uuidv4 } from "uuid";

type SelectOption<T extends string> = {
  value: T;
  label: string;
};

interface ISelectInputProps<T extends string> {
  options: SelectOption<T>[];
  value?: T;
  defaultValue?: T;
  onChange?: (value: T) => void;
  label?: string;
}

export const SelectInput = <T extends string>({
  options,
  defaultValue,
  value,
  onChange,
  label,
}: ISelectInputProps<T>) => {
  const uniqueId = uuidv4();

  const onChangeHandler = useCallback(
    (event: SelectChangeEvent) => {
      onChange?.(event.target.value as T);
    },
    [onChange],
  );

  return (
    <FormControl fullWidth>
      <InputLabel id={uniqueId}>{label}</InputLabel>
      <Select
        labelId={uniqueId}
        label={label}
        onChange={onChangeHandler}
        defaultValue={defaultValue}
        value={value}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
