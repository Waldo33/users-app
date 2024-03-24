// eslint-disable-next-line import/named
import { InputBaseComponentProps, TextField } from "@mui/material";
import { ChangeEvent, FC } from "react";
import ReactInputMask from "react-input-mask";

/**
 * Пропсы компонента {@link InputMask}
 * @see InputMask
 */
interface MaskInputProps {
  /**
   * Строка на которой основывается маска
   * @example "+7 999 999 99-99"
   */
  mask: string;
  /**
   * Значение поля
   */
  value?: string;
  /**
   * Функция-обработчик при вводе значений
   * @function onChange
   * @param {string} value
   * @returns {void}
   */
  onChange?: (value: string) => void;
  /**
   * Поле, которое подсвечивает ошибочное состояние компонента
   */
  error?: boolean;
  /**
   * Текст ошибки
   */
  helperText?: string;
  disabled?: boolean;
  label?: string;
  inputProps?: InputBaseComponentProps;
}

/**
 * Компонент текстового поля с возможностью добавления маски ввода.
 *
 * @component
 * @example
 * return (
 *   <InputMask
 *    label={t("labels.phone")}
 *    mask={"+7 999 999 99-99"}
 *    error={!!errors.phone}
 *    helperText={errors.phone?.message || " "}
 *    inputProps={{
 *      ...register("phone"),
 *    }}
 *  />
 * )
 */
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
