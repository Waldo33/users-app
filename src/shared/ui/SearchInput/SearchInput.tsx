import { TextField, debounce } from "@mui/material";
import { ChangeEvent, FC, useCallback, useMemo } from "react";

interface ISearchInputProps {
  onSearch: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
  icon?: React.ReactNode;
}

export const SearchInput: FC<ISearchInputProps> = ({
  onSearch,
  disabled,
  placeholder,
  icon,
}) => {
  const onSearchHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onSearch(event.target.value);
    },
    [onSearch],
  );

  const searchDelayed = useMemo(
    () => debounce(onSearchHandler, 400),
    [onSearchHandler],
  );

  return (
    <TextField
      disabled={disabled}
      placeholder={placeholder}
      onChange={searchDelayed}
      fullWidth
      InputProps={{
        endAdornment: icon,
      }}
      type="search"
    />
  );
};
