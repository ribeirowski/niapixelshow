import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Modal } from '@mui/material';
import ProductCarousel from '@/components/ProductCarouselAdmin';
import Link from 'next/link'; 


const ProductPage: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>Produtos</Typography>
      <ProductCarousel />
      <Link href="/product/create" passHref>
      <Button 
        variant="contained" 
        color="primary" 
        sx={{ display: 'block', margin: '50px auto' }} // Centering the button
      >
        Cadastrar Produto
      </Button>
      </Link>
    
    </Box>
  );
};


export default ProductPage;
