import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, Typography, Container } from '@mui/material';
import ProductForm from '@/components/ProductForm';
import { useProduct } from '@/hooks';

// Componente de página para editar um produto existente
const EditProductPage: React.FC = () => {
  const router = useRouter(); // Hook do Next.js para roteamento
  const { id } = router.query; // Obtém o ID do produto a partir da URL

  const { productData, getProductById, updateProduct } = useProduct(); // Hook personalizado para manipulação de produtos

  // useEffect para buscar os dados do produto quando o ID estiver disponível
  useEffect(() => {
    if (id && typeof id === "string") {
      getProductById(id); // Busca os dados do produto pelo ID
    }
  }, [id]);

  // Função de callback para lidar com o envio do formulário
  const handleSubmit = (data: any) => {
    if (id && typeof id === "string") {
      updateProduct(id, data).then(() => {
        router.push(`/product`); // Redireciona para a página de produtos após a atualização
      });
    }
  };

  return (
    <Container maxWidth="md"> {/* Define a largura máxima do container */}
      <Box mt={4}> {/* Define a margem superior */}
        {productData ? (
          // Renderiza o formulário de produto com os dados existentes
          <ProductForm onSubmit={handleSubmit} edit productData={productData} />
        ) : (
          // Exibe uma mensagem de carregamento enquanto os dados do produto estão sendo buscados
          <Typography>Carregando...</Typography>
        )}
      </Box>
    </Container>
  );
};

export default EditProductPage;
