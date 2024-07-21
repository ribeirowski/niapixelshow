import React, { useState } from 'react';
import { TextField, Button, Box, Typography, MenuItem, Select, InputLabel, FormControl, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/router';

interface Category {
  name: string;
  description?: string;
}

interface FormData {
  image?: string;
  id?: string;
  name: string;
  description: string;
  price: number;
  status: boolean;
  category: Category;
}

const ProductForm: React.FC<{ onSubmit: (data: FormData) => void, edit?: boolean }> = ({ onSubmit, edit = false }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    price: 0,
    status: false,
    category: {
      name: '',
      description: ''
    }
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;

    if (name?.startsWith('category.')) {
      const categoryField = name.split('.')[1];
      setFormData(prevState => ({
        ...prevState,
        category: {
          ...prevState.category,
          [categoryField]: value
        }
      }));
    } else {
      setFormData({ ...formData, [name as string]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      price: parseFloat(formData.price.toString()),  // Ensure price is a number
    });
    router.push(`/product/uploadPhoto?origin=${edit ? 'edit' : 'create'}`);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ backgroundColor: 'white', mt: 4, p: 4, borderRadius: 1, boxShadow: 3, mx: 'auto' }}>
      <Box display="flex" alignItems="center" mb={2}>
        <IconButton 
          onClick={() => router.back()} 
          sx={{ 
            mr: 2, 
            color: 'black', 
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.1)', 
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
          name="category.name"
          label="Categoria"
          value={formData.category.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
      </Box>
      <TextField
        name="category.description"
        label="Descrição da Categoria"
        value={formData.category.description}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
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
