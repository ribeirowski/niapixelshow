import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, Typography, Container } from '@mui/material';
import ProductForm from '@/components/ProductForm';
import { useProduct } from '@/hooks';

const EditProductPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const { productData, getProductById } = useProduct();

  useEffect(() => {
    if (id && typeof id === "string") {
      // Aqui você pode buscar os dados do produto
      getProductById(id);
      console.log(productData)
    }
  }, [id]);

  const handleSubmit = (data: any) => {
    console.log('Produto editado:', data);
    // Adicione a lógica para atualizar o produto
  };

  return (
    <Container maxWidth="md">
      <Box mt={4}>
        {productData ? (
          <ProductForm onSubmit={handleSubmit} edit productData={productData}/>
        ) : (
          <p>Carregando...</p>
        )}
      </Box>
    </Container>
  );
};

export default EditProductPage;
