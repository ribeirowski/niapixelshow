import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { Box, Modal, Button, Typography, Snackbar, Alert } from '@mui/material';
import ProductCard from '../ProductCard';
import useProduct from '@/hooks/useProduct';
import ProductDetailCard from '../ProductPanel';
import { useAuth } from '@/hooks';
import { useRouter } from 'next/router';
import useCart, { CartItem } from '@/hooks/useCart';

interface ProductItem {
  image?: string;
  id?: string;
  name: string;
  description: string;
  price: number;
  status: boolean;
  category: {
    name: string;
    description?: string;
  };
  promotionId?: string;
}

const ProductCarousel: React.FC = () => {
  const { products, getAllProducts, loading, error } = useProduct();
  const [selectedProduct, setSelectedProduct] = useState<CartItem | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const { user } = useAuth();
  const { createCartItem } = useCart();
  const [userId, setUserId] = useState<string | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const router = useRouter();


  useEffect(() => {
    if (user && user.uid) {
        setUserId(user.uid);
    }
  }, [user]);

  useEffect(() => {
    getAllProducts();
  }, [getAllProducts]);

  const handleProductClick = (product: ProductItem) => {
    const { id, name, description, price, category, promotionId, status, image } = product;

    const productData = {
      item_id: id,
      image: image,
      name: name,
      description: description,
      price: price,
      status: status,
      category: {
        name: category.name,
        description: category.description,
      },
      promotionId: promotionId,
      quantity: 1,
      size: 'M',
    };
    setSelectedProduct(productData as CartItem);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedProduct(null);
  };

  const handleAddToCart = (quantity: number, size: string) => {
    selectedProduct!.quantity = quantity;
    selectedProduct!.size = size;
    if (userId && selectedProduct) {
      createCartItem(userId, selectedProduct);
      setOpenSnackbar(true);
    }
    else {
      router.push('/sign-in'); // Redireciona para a página de login se o userId não estiver disponível
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>Ocorreu um erro: {error}</p>;
  }

  const settings = {
    infinite: products.length > 1,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: products.length > 1 ? 2 : products.length,
          slidesToScroll: 1,
          infinite: products.length > 1,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Box sx={{ maxWidth: "100%" }}>
      <Slider {...settings}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            name={product.name}
            price={product.price}
            image={product.image}
            onClick={() => handleProductClick(product)}
            dataCy={`product-card-${product.name}`}
          />
        ))}
      </Slider>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="product-detail-modal"
        aria-describedby="product-detail-description"
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          {selectedProduct && (
            <Box sx={{ position: 'relative', backgroundColor: 'white', p: 3, borderRadius: 1.6 }}>
              <ProductDetailCard
                ProductInfo={selectedProduct}
                onAddToCart={handleAddToCart}
              />
              <Button
                onClick={handleCloseModal}
                sx={{ 
                  position: 'absolute', 
                  top: 30, 
                  right: 30, 
                  backgroundColor: 'red', 
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'darkred',
                  },
                }}
                data-cy="close-modal"
              >
                Fechar
              </Button>
            </Box>
          )}
        </Box>
      </Modal>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        data-cy = "snackbar"
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Produto adicionado ao carrinho!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ProductCarousel;
