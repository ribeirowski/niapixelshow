import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import React, { use, useEffect, useState } from 'react';
import Slider from 'react-slick';
import { Box, Modal, Button, Snackbar, Alert } from '@mui/material';
import ProductCard from '../ProductCard';
import useProduct from '@/hooks/useProduct';
import ProductDetailCard from '../ProductPanel';
import { useAuth } from '@/hooks';
import useCart, { CartItem } from '@/hooks/useCart';
import { usePromotion } from '@/hooks';

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
  discount?: number; // Adicionado para incluir o desconto
}

const ProductCarousel: React.FC = () => {
  const { products, getAllProducts, loading, error } = useProduct();
  const { getPromotionById } = usePromotion();
  const [selectedProduct, setSelectedProduct] = useState<CartItem | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const { user } = useAuth();
  const { createCartItem } = useCart();
  const [userId, setUserId] = useState<string | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [promotions, setPromotions] = useState<{ [id: string]: number }>({});

  useEffect(() => {
    if (user && user.uid) {
      setUserId(user.uid);
    }
  }, [user]);

  useEffect(() => {
    getAllProducts();
  }, [getAllProducts]);

  // useEffect(() => {
  //   const fetchPromotions = async () => {
  //     if (products) {
  //       const map: { [id: string]: number } = {};
  //       for (const product of products) {
  //         if (product.promotionId) {
  //           const promotionData = await getPromotionById(product.promotionId);
  //           if (promotionData) {
  //             map[product.id as string] = promotionData.discount;
  //           }
  //         }
  //       }
  //       setPromotions(map);
  //     }
  //   };
  //   fetchPromotions();
  // }, [products, getPromotionById]);

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
      discount: promotions[id as string] || 0,
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
    if (selectedProduct) {
      selectedProduct.quantity = quantity;
      selectedProduct.size = size;
      if (userId) {
        createCartItem(userId, selectedProduct);
        setOpenSnackbar(true);
      }
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
        {products
          .filter((product) => product.promotionId && promotions[product.id as string] !== undefined)
          .map((product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              price={product.price}
              discount={promotions[product.id as string]}
              image={product.image}
              onClick={() => handleProductClick(product)}
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
                sx={{ position: 'absolute', top: 30, right: 30 }}
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
