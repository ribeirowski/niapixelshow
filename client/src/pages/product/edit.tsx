import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, Typography, Container } from '@mui/material';
import ProductForm from '@/components/ProductForm';

// Simulação de dados do produto para edição
const mockProductData = {
  id: '1',
  name: 'Produto Exemplo',
  description: 'Descrição do produto exemplo',
  price: '100.00',
  status: true,
  category: { name: 'Categoria Exemplo' },
};

const EditProductPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [productData, setProductData] = useState<any>(null);

  useEffect(() => {
    if (id) {
      // Aqui você pode buscar os dados do produto
      setProductData(mockProductData);
    }
  }, [id]);

  const handleSubmit = (data: any) => {
    console.log('Produto editado:', data);
    // Adicione a lógica para atualizar o produto
  };

  return (
    <Container maxWidth="md">
      <Box mt={4}>
        <Typography variant="h4" 
          gutterBottom 
          sx={{ 
            backgroundColor: 'white', 
            borderRadius: 2, // Adiciona curvas nas bordas
            padding: 2, // Adiciona espaçamento interno
            textAlign: 'center', // Centraliza o texto
            fontWeight: 'bold' 
          }}>
          Editar Produto
        </Typography>
        {productData ? (
          <ProductForm onSubmit={handleSubmit} edit />
        ) : (
          <p>Carregando...</p>
        )}
      </Box>
    </Container>
  );
};

export default EditProductPage;
