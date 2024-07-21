import React, { useState } from 'react';
import { TextField, Button, Box, Typography, MenuItem, Select, InputLabel, FormControl, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/router';

const ProductForm: React.FC<{ onSubmit: (data: any) => void, edit?: boolean }> = ({ onSubmit, edit = false }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    status: false,
    category: '',
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name as string]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      price: parseFloat(formData.price),
    });
    // Navegar para a página de upload da foto com o parâmetro de origem
    router.push(`/product/uploadPhoto?origin=${edit ? 'edit' : 'create'}`);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ backgroundColor: 'white', mt: 4, p: 4, borderRadius: 1, boxShadow: 3, maxWidth: 600, mx: 'auto' }}>
      <Box display="flex" alignItems="center" mb={2}>
        <IconButton 
          onClick={() => router.back()} 
          sx={{ 
            mr: 2, 
            color: 'black', 
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.1)', // Cor de fundo ao passar o mouse
            }
          }}
        >
          <ArrowBackIcon />
        </IconButton>
      </Box>
      <Box display="flex" justifyContent="space-between" gap={2}>
        <TextField
          name="name"
          label="Nome"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="description"
          label="Descrição"
          value={formData.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
      </Box>
      <Box display="flex" justifyContent="space-between" gap={2}>
        <TextField
          name="price"
          label="Valor"
          value={formData.price}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="category"
          label="Categoria"
          value={formData.category}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
      </Box>
      <FormControl fullWidth margin="normal">
        <InputLabel>Disponível</InputLabel>
        <Select
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <MenuItem value={true}>Sim</MenuItem>
          <MenuItem value={false}>Não</MenuItem>
        </Select>
      </FormControl>
      <Box textAlign="center" mt={4}>
        <Button type="submit" variant="contained" sx={{ backgroundColor: "black", color: "white" }}>
          PRÓXIMO
        </Button>
      </Box>
    </Box>
  );
};

export default ProductForm;
