import React from "react";
import { useRouter } from "next/router";
import { Button, MenuItem, TextField, ThemeProvider } from "@mui/material";
import { theme } from "./theme";

const CreatePromotion: React.FC = () => {
  const promotionIds = [
    {
      value: "id1",
      label: "id1",
    },
    {
      value: "id2",
      label: "id2",
    },
    {
      value: "id3",
      label: "id3",
    },
    {
      value: "id4",
      label: "id4",
    },
  ];

  const router = useRouter();
  const [name, setName] = React.useState<string | null>(null);
  const handleName = () => {
    setName(name);
  };

  const [discount, setDiscount] = React.useState<number | null>(null);
  const handleDiscount = () => {
    setDiscount(discount);
  };

  const [productId, setProductId] = React.useState<string | null>(null);
  const handleProductId = () => {
    setProductId(productId);
  };

  const handleNext = () => {
    router.push("/home/admin/promotions/create-2");
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "2rem",
        }}
      >
        <h1>ADMIN</h1>
        <div
          style={{
            backgroundColor: "#ffffff",
            height: "70vh",
            width: "100%",
            borderRadius: "1rem",
            gap: "1rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <ThemeProvider theme={theme}>
            <h2 style={{ color: "#121212", margin: "1.5rem" }}>
              CRIAR PROMOÇÃO
            </h2>
            <TextField
              required
              id="name"
              label="Nome"
              variant="outlined"
              value={name}
              onChange={handleName}
              sx={{ width: "20rem" }}
            />
            <TextField
              required
              id="discount"
              label="Porcentagem"
              variant="outlined"
              value={discount}
              onChange={handleDiscount}
              sx={{ width: "20rem" }}
            />
            <TextField
              id="active"
              label="Ativa"
              variant="outlined"
              sx={{ width: "20rem" }}
              value={true}
              disabled
            />
            <TextField
              required
              id="productId"
              label="ID do produto"
              variant="outlined"
              select
              value={productId}
              onChange={handleProductId}
              sx={{ width: "20rem" }}
            >
              {promotionIds.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </ThemeProvider>
          <Button
            style={{
              backgroundColor: "#121212",
              color: "#FFFFFF",
              fontWeight: 800,
              marginTop: "2rem",
            }}
            variant="contained"
            onClick={handleNext}
          >
            Próximo
          </Button>
        </div>
      </div>
    </>
  );
};

export default CreatePromotion;
