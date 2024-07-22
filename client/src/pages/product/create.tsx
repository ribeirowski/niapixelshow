import React from 'react';
import Link from 'next/link';
import { Box, Typography, Container, Button } from '@mui/material';
import ProductForm from '@/components/ProductForm';

const CreateProductPage: React.FC = () => {
  const handleSubmit = (data: any) => {
    console.log('Produto cadastrado:', data);
    // Adicione a lógica para salvar o produto
  };

  return (
    <Container maxWidth="md">
      <Box mt={4}>
        <ProductForm onSubmit={handleSubmit} />
      </Box>
    </Container>
  );
};

export default CreateProductPage;
