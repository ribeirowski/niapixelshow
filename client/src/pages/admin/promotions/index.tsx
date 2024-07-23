import React from "react";
import { ProductCarouselAdmin } from "@/components";
import { Button } from "@mui/material";
import { useRouter } from "next/router";

const Promotions = () => {
  const router = useRouter();

  const handleCreatePromotion = () => {
    router.push("/home/admin/promotions/create");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "2rem",
      }}
    >
      <h1>ADMIN</h1>
      
      <Button
        style={{
          backgroundColor: "#FFFFFF",
          color: "#121212",
          fontWeight: 800,
        }}
        variant="contained"
        onClick={handleCreatePromotion}
      >
        cadastrar nova promoção
      </Button>
    </div>
  );
};

export default Promotions;
