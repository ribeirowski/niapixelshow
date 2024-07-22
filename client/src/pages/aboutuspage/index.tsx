import React from 'react';
import { Container, Box, Typography } from '@mui/material';
import styles from './aboutuspage.module.css'; 

const AboutUsPage: React.FC = () => {
  return (
    <Container
      maxWidth="md"
      className={styles.container} // Adiciona a classe do CSS
    >
      <Box className={styles.header}>
        <Typography variant="h4" component="h1">Sobre Nós</Typography>
      </Box>

      <Box className={styles.content}>
        <img
          src="https://via.placeholder.com/1200x400" 
          alt="Sobre Nós"
          className={styles.image} // Classe para estilos da imagem
        />
      </Box>
      
      <Box className={styles.section}>
        <Typography variant="h5" component="h2">Nossa Missão</Typography>
        <Typography variant="body1" paragraph>
          aloaloalo.
        </Typography>
      </Box>

      <Box className={styles.section}>
        <Typography variant="h5" component="h2">Nossa História</Typography>
        <Typography variant="body1" paragraph>
        Fundada em 2022, a Niapixelshow nasceu no coração do Centro de Informática da Universidade Federal de Pernambuco. A ideia surgiu quando Nathália uma estudante, apaixonada  por tecnologia e inovação, percebeu uma lacuna de fardamento do Centro.
        </Typography>
      </Box>

      <Box className={styles.section}>
        <Typography variant="h5" component="h2">Nossos Valores</Typography>
        <Typography variant="body1" paragraph>
          <ul className={styles.list}>
            <li>Cultura</li>
            <li>Arte</li>
            <li>Inovação</li>
          </ul>
        </Typography>
      </Box>

      <Box className={styles.section}>
        <Typography variant="h5" component="h2">Nossa Equipe</Typography>
        <Typography variant="body1" paragraph>
          hihi.
        </Typography>
      </Box>
    </Container>
  );
};

export default AboutUsPage;
