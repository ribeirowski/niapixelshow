import React from "react";
import { ProductCard } from "@/components";
import { Button } from "@mui/material";

interface Props {
  name: string;
  price: number;
  discount?: number;
  image?: string;
  onClick: () => void;
}

const ProductCardAdmin: React.FC<Props> = ({
  name,
  price,
  discount,
  image,
  onClick,
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        alignItems: "center",
      }}
    >
      <ProductCard
        name={name}
        price={price}
        discount={discount}
        image={image}
        onClick={onClick}
      />

      <Button
        variant="contained"
        sx={{ backgroundColor: "black", display: "block", margin: "10px auto" }} // Centering the button
      >
        EDITAR PRODUTO
      </Button>
      <Button variant="contained" color="primary" sx={{ display: "block" }}>
        EXCLUIR PRODUTO
      </Button>
    </div>
  );
};

export default ProductCardAdmin;
