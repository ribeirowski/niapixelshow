import React from 'react';
import Link from 'next/link';
import { Box, Typography, Container, Button } from '@mui/material';
import ProductForm from '@/components/ProductForm';
import {useProduct} from '@/hooks'
import { useRouter } from 'next/router';

const CreateProductPage: React.FC = () => {
  const router = useRouter()
  const {createProduct} = useProduct();

  const handleSubmit = (data: any) => {
    createProduct(data).then(()=>{router.push(`/product`);})
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
