import React from 'react';
import { Card, CardMedia, CardContent, Typography, Box, ButtonBase } from '@mui/material';

interface ProductCardProps {
  name: string;
  price: number;
  discount?: number;
  image?: string;
  onClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ name, price, discount, image, onClick }) => {
  const oldPrice = discount ? (price / (1 - (discount/100))).toFixed(2) : price.toFixed(2);
  return (
    <ButtonBase onClick={onClick} sx={{ display: 'block', textAlign: 'initial' }}>
      <Card sx={{ width: 200, borderRadius: 1.6, height: 280 }}>
        <CardMedia
          component="img"
          height="180"
          image={image}
          alt={name}
        />
        <CardContent style={{ height: "180"}}>
          <Typography gutterBottom variant="h5" component="div" fontSize={13} fontWeight={600} >
            {name}
          </Typography>
          {discount ? (
            <Box>
              <Typography variant="body2" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                {`R$ ${oldPrice}`}
              </Typography>
              <Typography color="green" fontWeight={600}>
                {`R$ ${price.toFixed(2)}`}
              </Typography>
            </Box>
          ) : (
            <Typography variant="body2" color="text.secondary">
              {`R$ ${price.toFixed(2)}`}
            </Typography>
          )}
        </CardContent>
      </Card>
    </ButtonBase>
  );
};

export default ProductCard;
