import React from 'react';
import {ProductCard} from '@/components';
import { Button } from '@mui/material';
import Link from 'next/link';
import { useProduct } from '@/hooks'; 
import { useRouter } from 'next/router';

interface Props{
    name: string;
    price: number;
    discount?: number;
    image?: string;
    id?:string;
    onClick: () => void;
}

const ProductCardAdmin: React.FC<Props> = ({ name, price, discount, image, id, onClick }) => {

    const router = useRouter();

    const {deleteProduct } = useProduct();
    const handleDelete = () => {
        if (id && typeof id === "string") {
          deleteProduct(id).then(()=>{
            router.reload();
          })
        }
      };

    return(
        <div style={{display:'flex', flexDirection:'column', gap:'1rem', alignItems:'center'}}>
            <ProductCard
            name={name}
            price={price}
            discount={discount}
            image={image}
            onClick={onClick}
            />
            <Link href={"/product/edit?id="+id} passHref>
            <Button variant="contained" 
        
        sx={{ backgroundColor:"black", display: 'block', margin: '10px auto'}} // Centering the button
      >
                EDITAR PRODUTO
            </Button>
            </Link>
            <Button variant="contained" 
        color="primary" onClick={handleDelete}
        sx={{ display: 'block'}}>
                EXCLUIR PRODUTO
            </Button>

            
        </div>

    );
};

export default ProductCardAdmin;
