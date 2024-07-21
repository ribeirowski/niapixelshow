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
        <Typography 
          variant="h4" 
          gutterBottom 
          sx={{ 
            backgroundColor: 'white', 
            borderRadius: 2, // Adiciona curvas nas bordas
            padding: 2, // Adiciona espaçamento interno
            textAlign: 'center',// Centraliza o texto
            fontWeight: 'bold' 
          }}
        >
          Cadastrar Produto
        </Typography>
        <ProductForm onSubmit={handleSubmit} />
      </Box>
    </Container>
  );
};

export default CreateProductPage;
