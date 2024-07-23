import React from "react";
import { Button } from "@mui/material";
import Link from "next/link";
import { usePromotion } from "@/hooks";
import { useRouter } from "next/router";

interface Props {
  name: string;
  price: number;
  discount?: number;
  image?: string;
  id?: string;
  onClick: () => void;
}

const PromotionCard: React.FC<Props> = ({
  name,
  price,
  discount,
  image,
  id,
  onClick,
}) => {
  const router = useRouter();

  const { deletePromotion } = usePromotion();
  const handleDelete = () => {
    if (id && typeof id === "string") {
      deletePromotion(id).then(() => {
        router.reload();
      });
    }
  };

  return (
    <div
      id="promotion-card"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        alignItems: "center",
      }}
    >
      <div
        style={{
          border: "1px solid #ccc",
          padding: "1rem",
          borderRadius: "8px",
          width: "100%",
          textAlign: "center",
        }}
      >
        <h3>{name}</h3>
        <p>Preço: {price}</p>
        {discount && <p>Desconto: {discount}%</p>}
        {image && <img src={image} alt={name} style={{ width: "100%" }} />}
        <Button onClick={onClick}>Ver detalhes</Button>
      </div>
      <Link href={"/promotion/edit?id=" + id} passHref>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "black",
            display: "block",
            margin: "10px auto",
          }} // Centering the button
        >
          EDITAR PROMOÇÃO
        </Button>
      </Link>
      <Button
        variant="contained"
        color="primary"
        onClick={handleDelete}
        sx={{ display: "block" }}
      >
        EXCLUIR PROMOÇÃO
      </Button>
    </div>
  );
};

export default PromotionCard;
