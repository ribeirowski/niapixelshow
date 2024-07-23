import React from "react";
import { PhotoCarousel, ProductCarousel } from "@/components";

const images = [
  "https://i.imgur.com/qfyYvE6.png",
];

const UserHome = () => {
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <PhotoCarousel images={images} />
        <h1 style={{ fontSize: '2rem', color: 'white' }}>Produtos</h1>
        <ProductCarousel />
      </div>
    </div>
  
  );
};

export default UserHome;
