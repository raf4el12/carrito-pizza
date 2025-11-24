import { Card, CardMedia, CardContent, Typography, Button, IconButton } from '@mui/material';
import { Add, FavoriteBorder, Favorite } from '@mui/icons-material';
import { Product } from '../../../../types/pruducts/products.schema';
import { useState } from 'react';

interface ProductCardProps {
    product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
    const [isFavorite, setIsFavorite] = useState(false);

    // Calculate a fake discount for demo purposes (or use real data if available)
    const hasDiscount = Math.random() > 0.7;
    const discountPercent = 30;
    const originalPrice = product.precio ? Number(product.precio) * 1.4 : 0;

    return (
        <Card className="h-full flex flex-col shadow-sm hover:shadow-xl transition-all duration-300 rounded-xl overflow-hidden border border-gray-100 group bg-white relative">
            <div className="relative pt-[70%] overflow-hidden bg-gray-50">
                <CardMedia
                    component="img"
                    image={product.imagen_url || 'https://placehold.co/600x400?text=Pizza'}
                    alt={product.nombre}
                    className="absolute top-0 left-0 w-full h-full object-contain p-4 transform group-hover:scale-105 transition-transform duration-500"
                />

                <div className="absolute top-3 right-3 z-10">
                    <IconButton
                        onClick={() => setIsFavorite(!isFavorite)}
                        className="bg-transparent hover:bg-gray-100 p-1"
                    >
                        {isFavorite ? <Favorite className="text-red-500" /> : <FavoriteBorder className="text-gray-400" />}
                    </IconButton>
                </div>
            </div>

            <CardContent className="flex-grow flex flex-col px-5 pb-5 pt-2">
                <Typography variant="h6" component="h3" className="font-bold text-gray-900 mb-1 leading-tight line-clamp-2 min-h-[3rem]" title={product.nombre}>
                    {product.nombre}
                </Typography>

                <Typography variant="body2" className="text-gray-500 mb-4 line-clamp-2 text-sm flex-grow">
                    {product.descripcion}
                </Typography>

                <div className="flex items-center justify-between mt-auto">
                    <div className="flex flex-col">
                        <span className="text-xl font-extrabold text-gray-900">S/ {product.precio || '0.00'}</span>
                        {hasDiscount && (
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-400 line-through">S/ {originalPrice.toFixed(2)}</span>
                                <span className="text-xs font-bold text-white bg-red-500 px-1 rounded">-{discountPercent}%</span>
                            </div>
                        )}
                    </div>

                    <Button
                        variant="contained"
                        className="bg-[#95c11f] hover:bg-[#84ac1b] text-gray-900 font-bold px-4 py-2 rounded-full shadow-none hover:shadow-md transition-all min-w-[110px]"
                        endIcon={<Add />}
                    >
                        AGREGAR
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default ProductCard;
