import React from 'react';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button } from '@mui/material';
import { useRouter } from 'next/router';
import { Order } from '@/types';

const OrderTable: React.FC<Order[]> = (orders) => {
  const router = useRouter();

  const handleDetails = (id: string) => {
    router.push(`/orders/detailment/${id}`);
  };

  return (
    <TableContainer
      component={Paper}
      sx={{ boxShadow: "none", border: "none" }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ textAlign: "center" }}>Item</TableCell>
            <TableCell sx={{ textAlign: "center" }}>Descrição</TableCell>
            <TableCell sx={{ textAlign: "center" }}>Preço</TableCell>
            <TableCell sx={{ textAlign: "center" }}>Status</TableCell>
            <TableCell sx={{ textAlign: "center" }}>Data</TableCell>
            <TableCell sx={{ textAlign: "center" }}>
              Detalhamento do Pedido
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell sx={{ textAlign: "center" }}>{order.item}</TableCell>
              <TableCell sx={{ textAlign: "center" }}>
                {order.description}
              </TableCell>
              <TableCell sx={{ textAlign: "center" }}>{order.price}</TableCell>
              <TableCell sx={{ textAlign: "center" }}>{order.status}</TableCell>
              <TableCell sx={{ textAlign: "center" }}>{order.date}</TableCell>
              <TableCell sx={{ textAlign: "center" }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleDetails(order.id)}
                >
                  Detalhar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrderTable;
