import React from "react";
import Slider from "react-slick";
import { Box } from "@mui/material";
import { StaticImageData } from "next/image";

interface PhotoCarouselProps {
  images: (string | StaticImageData)[];
}

const PhotoCarousel: React.FC<PhotoCarouselProps> = ({ images }) => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Box sx={{ width: "78rem", margin: "auto" }}>
      <Slider {...settings}>
        {images.map((image, index) => (
          <Box key={index} sx={{ padding: 2 }}>
            <img
              src={typeof image === "string" ? image : image.src}
              alt={`Slide ${index}`}
              style={{ width: "100%", height: "20rem", borderRadius: "0.5rem" }}
            />
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default PhotoCarousel;
