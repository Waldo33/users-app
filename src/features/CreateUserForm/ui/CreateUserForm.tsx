import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  TUserValidationSchema,
  userValidationSchema,
} from "../model/userValidationSchema";
import { useForm } from "react-hook-form";
import { UsersEffects } from "@entities/User";
import { InputMask } from "@shared/ui";

interface ICreateUserFormProps {}

export const CreateUserForm: FC<ICreateUserFormProps> = () => {
  const { t } = useTranslation("translation", {
    keyPrefix: "createUserForm",
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(userValidationSchema),
  });

  const onCreate = (data: TUserValidationSchema) => {
    UsersEffects.addUser(data);
    reset();
  };

  return (
    <Box sx={{ py: 2, px: 2 }}>
      <Typography variant="h6" marginBottom={2}>
        {t("newUser")}
      </Typography>
      <form onSubmit={handleSubmit(onCreate)}>
        <Stack direction={"column"}>
          <TextField
            label={t("labels.name")}
            fullWidth
            error={!!errors.name}
            helperText={errors.name?.message || " "}
            {...register("name")}
          />
          <TextField
            label={t("labels.username")}
            fullWidth
            error={!!errors.username}
            helperText={errors.username?.message || " "}
            {...register("username")}
          />
          <TextField
            label={t("labels.email")}
            fullWidth
            error={!!errors.email}
            helperText={errors.email?.message || " "}
            {...register("email")}
          />
          <InputMask
            label={t("labels.phone")}
            mask={"+7 999 999 99-99"}
            error={!!errors.phone}
            helperText={errors.phone?.message || " "}
            inputProps={{
              ...register("phone"),
            }}
          />
          <TextField
            label={t("labels.zipcode")}
            fullWidth
            error={!!errors.address?.zipcode}
            helperText={errors.address?.zipcode?.message || " "}
            {...register("address.zipcode")}
          />
          <Button type="submit">{t("create")}</Button>
        </Stack>
      </form>
    </Box>
  );
};
