import React from 'react';
import { useRouter } from 'next/router';
import { Box, Typography, Container, Button } from '@mui/material';

const UploadPhotoPage: React.FC = () => {
  const router = useRouter();
  const { origin } = router.query;

  const handleUpload = () => {
    console.log('Foto enviada!');
    // Adicione a lógica para enviar a foto
  };

  const handleSave = () => {
    console.log('Produto salvo!');
    // Adicione a lógica para salvar o produto
  };

  const handleDelete = () => {
    console.log('Produto excluído!');
    // Adicione a lógica para excluir o produto
  };

  return (
    <Container maxWidth="md" sx={{ backgroundColor: 'white', borderRadius: 2, p: 4, boxShadow: 3 }}>
      <Box mt={4}>
        <Typography variant="h4" 
          gutterBottom 
          sx={{ 
            padding: 2, // Adiciona espaçamento interno
            textAlign: 'center', // Centraliza o texto
            fontWeight: 'bold'
          }}>
          Upload da Foto do Produto
        </Typography>
        <Box mt={4} textAlign="center">
          <input type="file" accept="image/*"/>
          <Button variant="contained" color="primary" onClick={handleUpload} sx={{ mt: 2}}>
            Enviar Foto
          </Button>
          {origin === 'create' ? (
            <Box mt={2}>
            <Button variant="contained" color="success" onClick={handleSave} sx={{ mt: 2, mt:20}}>
              Cadastrar Produto
            </Button>
            </Box>
          ) : (
            <Box mt={2}>
              <Button variant="contained" color="success" onClick={handleSave} sx={{ mr: 2, mt:20 }}>
                Salvar Produto
              </Button>
              <Button variant="contained" color="error" onClick={handleDelete} sx={{ mt:20 }}>
                Excluir Produto
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default UploadPhotoPage;
