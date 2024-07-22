import React, { useState } from 'react';
import { Card, CardMedia, CardContent, Typography, Box, Button, TextField, MenuItem, Select, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';
import { CartItem as CartItemSchema } from '../../types/CartTypes';
import { z } from 'zod';

export type Product = z.infer<typeof CartItemSchema>;

interface ProductDetailCardProps {
  ProductInfo: Product;
  onAddToCart: (quantity: number, size: string) => void; // Função para adicionar ao carrinho
}

const ProductDetailCard: React.FC<ProductDetailCardProps> = ({ ProductInfo, onAddToCart }) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedSize, setSelectedSize] = useState<string>('M');

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = Math.max(1, parseInt(event.target.value, 10));
    setQuantity(newQuantity);
  };

  const handleSizeChange = (event: SelectChangeEvent<string>) => {
    setSelectedSize(event.target.value as string);
  };

  const handleAddToCart = () => {
    onAddToCart(quantity, selectedSize);
  };

  return (
    <Card sx={{ width: 400, borderRadius: 1.6, p: 2 }}>
      <CardMedia
        component="img"
        height="200"
        image={ProductInfo.image}
        alt={ProductInfo.name}
        sx={{ borderRadius: 1.6 }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" fontSize={18} fontWeight={600}>
          {ProductInfo.name}
        </Typography>
        <Typography variant="body1" component="p" color="text.secondary" paragraph>
          {ProductInfo.description}
        </Typography>
        <Typography variant="h6" component="p" color="text.primary" fontWeight={600}>
          R$ {ProductInfo.price.toFixed(2)}
        </Typography>
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel id="size-select-label">Tamanho</InputLabel>
          <Select
            labelId="size-select-label"
            value={selectedSize}
            onChange={handleSizeChange}
            label="Tamanho"
          >
            {['PP', 'P', 'M', 'G', 'GG'].map((size) => (
              <MenuItem key={size} value={size}>
                {size}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
          <TextField
            type="number"
            variant="outlined"
            size="small"
            value={quantity}
            onChange={handleQuantityChange}
            sx={{ width: 80, mr: 2 }}
            InputProps={{ inputProps: { min: 1 } }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddToCart}
            sx={{ width: '100%', py: 1, textAlign: 'center' }} // Aumenta o botão e centraliza o texto
          >
            Adicionar ao Carrinho
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductDetailCard;
