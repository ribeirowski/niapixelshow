import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import useOrder from "@/hooks/useOrder";
import { withProtectedRoute } from "@/components";
import { useRouter } from "next/router";
import OrderTable from "../../../components/OrderTable";

const OrderDetails: React.FC = () => {
  const router = useRouter();
  const { email } = router.query; // Obtém o email do pedido da URL
  const { orders, filterOrders, loading, error } = useOrder();

  // Adicionando estados para os filtros
  const [atribute, setAtribute] = useState<string>("email");
  const [func, setFunc] = useState<string>("Igual a");
  const [filter, setFilter] = useState<string>("");

  useEffect(() => {
    if (email && typeof email === "string") {
      filterOrders("email", "Igual a", email, email);
    }
  }, [email, filterOrders]);

  const handleFilter = () => {
    filterOrders(atribute, func, filter, email as string);
  };

  const resetFilters = () => {
    setAtribute("email");
    setFunc("Igual a");
    setFilter("");
    if (email && typeof email === "string") {
      filterOrders("email", "Igual a", email, email);
    } else {
      filterOrders("email", "Igual a", "", "");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const funcSelection = () => {
    if (atribute === "status" || atribute === "item") {
      return (
        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <InputLabel>Função</InputLabel>
            <Select
              value={func}
              onChange={(e) => setFunc(e.target.value)}
              label="Função"
            >
              <MenuItem value="Igual a">Igual a</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      );
    } else if (atribute === "date") {
      return (
        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <InputLabel>Função</InputLabel>
            <Select
              value={func}
              onChange={(e) => setFunc(e.target.value)}
              label="Função"
            >
              <MenuItem value="Igual a">Igual a</MenuItem>
              <MenuItem value="Acima de">Antes de</MenuItem>
              <MenuItem value="Abaixo de">Depois de</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      );
    } else if (atribute === "price") {
      return (
        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <InputLabel>Função</InputLabel>
            <Select
              value={func}
              onChange={(e) => setFunc(e.target.value)}
              label="Função"
            >
              <MenuItem value="Igual a">Igual a</MenuItem>
              <MenuItem value="Acima de">Maior que</MenuItem>
              <MenuItem value="Abaixo de">Menor que</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      );
    }
    return null;
  };

  const valueSelection = () => {
    if (atribute === "status") {
      return (
        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              label="Status"
            >
              <MenuItem value="Erro no Pagamento">Erro no Pagamento</MenuItem>
              <MenuItem value="Aguardando Pagamento">
                Aguardando Pagamento
              </MenuItem>
              <MenuItem value="Pago">Pago</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      );
    } else if (atribute === "date" || atribute === "price") {
      return (
        <Grid item xs={12} md={4}>
          <TextField
            label={atribute === "date" ? "YYYY-MM-DD" : "Preço"}
            variant="outlined"
            fullWidth
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </Grid>
      );
    } else if (atribute === "item") {
      return (
        <Grid item xs={12} md={4}>
          <TextField
            label="Nome do Produto"
            variant="outlined"
            fullWidth
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </Grid>
      );
    }
    return null;
  };

  return (
    <Container
      maxWidth="lg"
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
        gutterBottom
        sx={{
          fontWeight: "700",
          textAlign: "center",
          color: "text.primary",
          mb: 4,
          mt: 1,
        }}
      >
        Histórico de Pedidos
      </Typography>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <InputLabel>Atributo</InputLabel>
            <Select
              value={atribute}
              onChange={(e) => setAtribute(e.target.value)}
              label="Atributo"
            >
              <MenuItem value="status">Status</MenuItem>
              <MenuItem value="date">Data</MenuItem>
              <MenuItem value="item">Nome do Produto</MenuItem>
              <MenuItem value="price">Preço</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        {funcSelection()}
        {valueSelection()}
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} md={2}>
          <Button variant="contained" onClick={handleFilter} sx={{ mb: 2 }}>
            Filtrar
          </Button>
        </Grid>
        <Grid item xs={12} md={2}>
          <Button variant="outlined" onClick={resetFilters} sx={{ mb: 2 }}>
            Resetar Filtros
          </Button>
        </Grid>
      </Grid>
      {orders.length === 0 ? (
        <Typography variant="body1" sx={{ textAlign: "center" }}>
          Nenhum pedido encontrado.
        </Typography>
      ) : (
        OrderTable(orders)
      )}
    </Container>
  );
};

export default withProtectedRoute(OrderDetails);
