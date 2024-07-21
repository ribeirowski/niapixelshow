import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import React, { useEffect } from 'react';
import Slider from 'react-slick';
import { Box } from '@mui/material';
import ProductCard from '../ProductCardAdmin';
import useProduct from '@/hooks/useProduct';

const ProductCarousel: React.FC = () => {
  const { products, getAllProducts, loading, error } = useProduct();

  useEffect(() => {
    getAllProducts();
    console.log(products);
  }, [getAllProducts]);

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
    <Box sx={{ maxWidth: '100%' }}>
      <Slider {...settings}>
        {products.map((product) => (
          <ProductCard
            key={product.id} // Adicione a propriedade key aqui
            name={product.name}
            price={product.price}
            //discount={product.discount}
            image={product.image}
            onClick={() => console.log(`Produto ${product.name} clicado!`)}
          />
        ))}
      </Slider>
    </Box>
  );
};

export default ProductCarousel;
