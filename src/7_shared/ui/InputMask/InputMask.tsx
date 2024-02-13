// eslint-disable-next-line import/named
import { InputBaseComponentProps, TextField } from "@mui/material";
import { ChangeEvent, FC } from "react";
import ReactInputMask from "react-input-mask";

interface MaskInputProps {
  mask: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
  label?: string;
  inputProps?: InputBaseComponentProps;
}

export const InputMask: FC<MaskInputProps> = (props) => {
  const {
    mask,
    value,
    onChange,
    disabled,
    label,
    inputProps,
    error,
    helperText,
  } = props;

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    onChange?.(event.target.value);
  };

  return (
    <ReactInputMask
      data-testid="mask"
      mask={mask}
      value={value}
      onChange={onChangeHandler}
      disabled={disabled}
    >
      <TextField
        label={label}
        error={error}
        helperText={helperText}
        inputProps={inputProps}
      />
    </ReactInputMask>
  );
};
