import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Snackbar,
  Alert,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { userSchema, UserSchema } from "../../types/UserTypes";
import useUser from "@/hooks/useUser";
import { useRouter } from "next/router";

const SignUp: React.FC = () => {
  const router = useRouter();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );
  const [showPassword, setShowPassword] = useState(false);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    clearErrors,
  } = useForm<UserSchema>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      password: "",
    },
  });

  const { createUser, loading, error, resetError } = useUser();

  useEffect(() => {
    if (error) {
      setSnackbarMessage(error);
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  }, [error]);

  const onSubmit: SubmitHandler<UserSchema> = async (data) => {
    try {
      await createUser(data);
      setSnackbarMessage("Usuário criado com sucesso!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);

      reset();
      router.push("/verify-email");
    } catch (err) {
      console.error("Error creating user:", err);
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        backgroundColor: "background.paper",
        borderRadius: "1rem",
        py: 4,
        boxShadow: 3,
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{
          fontWeight: "700",
          textAlign: "center",
          color: "text.primary",
          mb: 4,
          mt: 1,
        }}
      >
        Cadastro de Usuário
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: "flex", flexDirection: "column", gap: 3, mx: 6 }}
      >
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Nome"
              placeholder="Digite seu nome"
              variant="outlined"
              fullWidth
              required
              error={!!errors.name}
              helperText={errors.name?.message}
              onChange={(e) => {
                field.onChange(e);
                if (e.target.value === "") {
                  clearErrors("name");
                }
              }}
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Email"
              placeholder="Digite seu email"
              variant="outlined"
              fullWidth
              required
              error={!!errors.email}
              helperText={errors.email?.message}
              onChange={(e) => {
                field.onChange(e);
                if (e.target.value === "") {
                  clearErrors("email");
                }
              }}
            />
          )}
        />
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Telefone"
              placeholder="Digite seu telefone"
              variant="outlined"
              fullWidth
              error={!!errors.phone}
              helperText={errors.phone?.message}
              onChange={(e) => {
                field.onChange(e);
                if (e.target.value === "") {
                  clearErrors("phone");
                }
              }}
            />
          )}
        />
        <Controller
          name="address"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Endereço"
              placeholder="Digite seu endereço"
              variant="outlined"
              fullWidth
              error={!!errors.address}
              helperText={errors.address?.message}
              onChange={(e) => {
                field.onChange(e);
                if (e.target.value === "") {
                  clearErrors("address");
                }
              }}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <Box
              sx={{
                position: "relative",
                display: "flex",
                alignItems: "center",
              }}
            >
              <TextField
                {...field}
                label="Senha"
                placeholder="Digite sua senha"
                variant="outlined"
                fullWidth
                required
                type={showPassword ? "text" : "password"}
                error={!!errors.password}
                helperText={errors.password?.message}
                onChange={(e) => {
                  field.onChange(e);
                  if (e.target.value === "") {
                    clearErrors("password");
                  }
                }}
              />
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                sx={{
                  color: "#444444",
                  position: "absolute",
                  right: 12,
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </Box>
          )}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 1, mb: 1, alignSelf: "center", px: 4, py: 1 }}
          disabled={isSubmitting || loading}
        >
          {isSubmitting || loading ? "Cadastrando..." : "Cadastrar"}
        </Button>
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default SignUp;
