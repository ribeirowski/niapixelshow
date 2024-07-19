import React from 'react';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

interface Order {
    id: string;
    email: string;
    item: string;
    description: string;
    qtd: number;
    price: number;
    status: string;
    date: string;
    addr: string;
}

const OrderTable: React.FC<Order[]> = (orders) => {
  return (
    <TableContainer component={Paper} sx={{ boxShadow: 'none', border: 'none' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Item</TableCell>
            <TableCell>Descrição</TableCell>
            <TableCell>Preço</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Data</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.item}</TableCell>
              <TableCell>{order.description}</TableCell>
              <TableCell>{order.price}</TableCell>
              <TableCell>{order.status}</TableCell>
              <TableCell>{order.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrderTable;