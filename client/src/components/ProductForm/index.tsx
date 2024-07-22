import React, { useState } from 'react';
import { TextField, Button, Box, Typography, MenuItem, Select, InputLabel, FormControl, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/router';
import { Product } from '@/hooks';

const ProductForm: React.FC<{ onSubmit: (data: Product) => void, edit?: boolean, productData?: Product }> = ({ onSubmit, edit = false, productData }) => {
  const [formData, setFormData] = useState<Product>( productData? productData: {
    name: '',
    description: '',
    price: 0,
    status: false,
    category: {
      name: '',
      description: ''
    }
  });
  const [page, setPage] = useState(0);

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
  };

  const handleUpload = () => {
    console.log('Foto enviada!');
    // Adicione a lógica para enviar a foto
  };

  const handleDelete = () => {
    console.log('Produto excluído!');
    // Adicione a lógica para excluir o produto
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ backgroundColor: 'white', mt: 4, p: 4, borderRadius: 1, boxShadow: 3, mx: 'auto' }}>
      { page == 0? <>
      <Typography variant="h4" 
        gutterBottom 
        sx={{ 
          padding: 2, // Adiciona espaçamento interno
          textAlign: 'center', // Centraliza o texto
          fontWeight: 'bold'
        }}>
        {edit? "Editar Produto": "Cadastrar Produto"}
      </Typography>
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
        <Button type="button" variant="contained" sx={{ backgroundColor: "black", color: "white" }} onClick={()=>{setPage(1)}}>
          PRÓXIMO
        </Button>
      </Box></>
      : 
      <>
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
          {!edit ? (
            <Box mt={2}>
            <Button type="submit" variant="contained" color="success" sx={{ mr: 2, mt:20}}>
              Cadastrar Produto
            </Button>
            </Box>
          ) : (
            <Box mt={2}>
              <Button type="submit" variant="contained" color="success" sx={{ mr: 2, mt:20 }}>
                Salvar Produto
              </Button>
              <Button variant="contained" color="error" onClick={handleDelete} sx={{ mt:20 }}>
                Excluir Produto
              </Button>
            </Box>
          )}
        </Box>
      </>}
    </Box>
  );
};

export default ProductForm;
