import React from 'react';
import { Container, Box, Typography } from '@mui/material';

const AboutUsPage: React.FC = () => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        mt: 4,
        mb: 4,
        bgcolor: '#fff',
        borderRadius: '8px', // Adiciona bordas arredondadas
        boxShadow: 3, // Adiciona uma sombra sutil para destacar o container
      }}
    >
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ color: '#C8102E' }}>
          Sobre Nós
        </Typography>
        <img
          src="https://via.placeholder.com/1200x400" // Substitua pelo URL da sua imagem
          alt="Sobre Nós"
          style={{
            borderRadius: '8px',
            width: '100%',
            height: 'auto',
            marginTop: '16px', // Espaçamento entre o título e a imagem
            marginBottom: '16px', // Espaçamento abaixo da imagem
          }}
        />
      </Box>
      <Box sx={{ mb: 4, px: 2 }}>
        <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#C8102E' }}>
          Nossa Missão
        </Typography>
        <Typography variant="body1" paragraph sx={{ color: '#000' }}>
          aloaloalo.
        </Typography>
      </Box>
      <Box sx={{ mb: 4, px: 2 }}>
        <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#C8102E' }}>
          Nossa História
        </Typography>
        <Typography variant="body1" paragraph sx={{ color: '#000' }}>
          nhenhe.
        </Typography>
      </Box>
      <Box sx={{ mb: 4, px: 2 }}>
        <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#C8102E' }}>
          Nossos Valores
        </Typography>
        <Typography variant="body1" paragraph sx={{ color: '#000' }}>
          <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
            <li style={{ marginBottom: '8px' }}>L</li>
            <li style={{ marginBottom: '8px' }}>i</li>
            <li style={{ marginBottom: '8px' }}>g</li>
            <li style={{ marginBottom: '8px' }}>i</li>
            <li>a</li>
          </ul>
        </Typography>
      </Box>
      <Box sx={{ mb: 4, px: 2 }}>
        <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#C8102E' }}>
          Nossa Equipe
        </Typography>
        <Typography variant="body1" paragraph sx={{ color: '#000' }}>
          hihi.
        </Typography>
      </Box>
    </Container>
  );
};

export default AboutUsPage;