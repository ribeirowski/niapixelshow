import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Modal } from '@mui/material';
import ProductCarousel from '@/components/ProductCarouselAdmin';


const ProductPage: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>Produtos</Typography>
      <ProductCarousel />
      <Button 
        variant="contained" 
        color="primary" 
        sx={{ display: 'block', margin: '50px auto' }} // Centering the button
      >
        Cadastrar Produto
      </Button>
    
    </Box>
  );
};


export default ProductPage;
