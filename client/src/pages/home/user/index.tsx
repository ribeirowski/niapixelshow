import React from "react";
import { PhotoCarousel, ProductCarousel } from "@/components";


const images = [
    'https://media.discordapp.net/attachments/1051146657850458193/1263966023028178984/image.png?ex=669c2797&is=669ad617&hm=8cffd01582434325897bcc2a1cead94871888ca65473abb5cb8103ce3e2b2e08&=&format=webp&quality=lossless&width=1025&height=263',
    'https://i.pinimg.com/736x/4c/73/77/4c7377d1fa604c7fe7998f9495444f74.jpg'
];

const UserHome = () => {

    return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem'}}>
        <PhotoCarousel images={images} />
        <h1>Produtos</h1>
        <ProductCarousel />
      </div>
    </div>
  );
};

export default UserHome;