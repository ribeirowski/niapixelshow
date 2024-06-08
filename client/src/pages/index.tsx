import { Container, Typography } from '@mui/material';

export default function Home() {
  return (
    <>
      <Container maxWidth={false} style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'2rem' }}>
        <Typography style={{ fontSize:'2rem' }}>
          Este é o começo do nosso projeto de ESS, lesgoo!
        </Typography>
      </Container>
    </>
  );
}
