import React from 'react';
import { Box, Container } from '@mui/material';
import ProductForm from '@/components/ProductForm';
import { useProduct } from '@/hooks';
import { useRouter } from 'next/router';

// Componente de página para criar um novo produto
const CreateProductPage: React.FC = () => {
  const router = useRouter(); // Hook do Next.js para roteamento
  const { createProduct } = useProduct(); // Hook personalizado para criar um produto

  // Função de callback para lidar com o envio do formulário
  const handleSubmit = (data: any) => {
    // Chama a função createProduct e, em seguida, redireciona para a página de produtos
    createProduct(data).then(() => {
      router.push(`/product`);
    });
  };

  return (
    <Container maxWidth="md"> {/* Define a largura máxima do container */}
      <Box mt={4}> {/* Define a margem superior */}
        {/* Componente ProductForm que renderiza o formulário para criar um produto */}
        <ProductForm onSubmit={handleSubmit} />
      </Box>
    </Container>
  );
};

export default CreateProductPage;
