import React, { useEffect } from "react";
import { Typography, Box, Container, Button } from "@mui/material";
import useOrder from "@/hooks/useOrder";
import { withProtectedRoute } from "@/components";
import { useRouter } from "next/router";

const OrderDetails: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const { orderData, getOrderById, loading, error } = useOrder();

  useEffect(() => {
    getOrderById(id as string);
  }, [id, getOrderById]);

  const handleBack = () => {
    router.back();
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <Container
      maxWidth="sm"
      sx={{
        backgroundColor: "background.paper",
        borderRadius: "1rem",
        p: 4,
        boxShadow: 3,
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        color="secondary"
        gutterBottom
        sx={{ fontWeight: "700", textAlign: "center", mb: 4, mt: 1 }}
      >
        Detalhamento de Pedido
      </Typography>
      {orderData && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            px: 4,
            mb: 1,
          }}
        >
          <Box sx={{ textAlign: "left" }}>
            <Typography
              variant="body1"
              color="secondary"
              sx={{ fontWeight: 600 }}
            >
              Id:
            </Typography>
            <Typography variant="body1" color="secondary">
              {orderData.id}
            </Typography>
          </Box>
          <Box sx={{ textAlign: "left" }}>
            <Typography
              variant="body1"
              color="secondary"
              sx={{ fontWeight: 600 }}
            >
              Email:
            </Typography>
            <Typography variant="body1" color="secondary">
              {orderData.email}
            </Typography>
          </Box>
          <Box sx={{ textAlign: "left" }}>
            <Typography
              variant="body1"
              color="secondary"
              sx={{ fontWeight: 600 }}
            >
              Produto:
            </Typography>
            <Typography variant="body1" color="secondary">
              {orderData.item}
            </Typography>
          </Box>
          <Box sx={{ textAlign: "left" }}>
            <Typography
              variant="body1"
              color="secondary"
              sx={{ fontWeight: 600 }}
            >
              Descrição:
            </Typography>
            <Typography variant="body1" color="secondary">
              {orderData.description}
            </Typography>
          </Box>
          <Box sx={{ textAlign: "left" }}>
            <Typography
              variant="body1"
              color="secondary"
              sx={{ fontWeight: 600 }}
            >
              Quantidade:
            </Typography>
            <Typography variant="body1" color="secondary">
              {orderData.qtd}
            </Typography>
          </Box>
          <Box sx={{ textAlign: "left" }}>
            <Typography
              variant="body1"
              color="secondary"
              sx={{ fontWeight: 600 }}
            >
              Valor:
            </Typography>
            <Typography variant="body1" color="secondary">
              {orderData.price}
            </Typography>
          </Box>
          <Box sx={{ textAlign: "left" }}>
            <Typography
              variant="body1"
              color="secondary"
              sx={{ fontWeight: 600 }}
            >
              Status:
            </Typography>
            <Typography variant="body1" color="secondary">
              {orderData.status}
            </Typography>
          </Box>
          <Box sx={{ textAlign: "left" }}>
            <Typography
              variant="body1"
              color="secondary"
              sx={{ fontWeight: 600 }}
            >
              Data:
            </Typography>
            <Typography variant="body1" color="secondary">
              {orderData.date}
            </Typography>
          </Box>
          <Box sx={{ textAlign: "left" }}>
            <Typography
              variant="body1"
              color="secondary"
              sx={{ fontWeight: 600 }}
            >
              Endereço:
            </Typography>
            <Typography variant="body1" color="secondary">
              {orderData.addr}
            </Typography>
          </Box>
        </Box>
      )}
      <Box textAlign="center">
        <Button
          variant="contained"
          color="primary"
          onClick={handleBack}
          sx={{ mt: 2 }}
        >
          Voltar
        </Button>
      </Box>
    </Container>
  );
};

export default withProtectedRoute(OrderDetails);
