import { Grid, Typography, Box } from '@mui/material';
import { SentimentDissatisfied } from '@mui/icons-material';
import ProductCard from './ProductCard';
import { Product } from '../../../../types/pruducts/products.schema';

interface ProductGridProps {
    products: Product[];
    loading: boolean;
}

const ProductGrid = ({ products, loading }: ProductGridProps) => {
    if (loading) {
        return (
            <Grid container spacing={3}>
                {[1, 2, 3, 4, 5, 6].map((item) => (
                    <Grid item key={item} xs={12} sm={6} lg={4} xl={3}>
                        <div className="bg-gray-100 rounded-xl h-[350px] animate-pulse"></div>
                    </Grid>
                ))}
            </Grid>
        );
    }

    if (products.length === 0) {
        return (
            <Box className="flex flex-col items-center justify-center py-20 text-gray-400">
                <SentimentDissatisfied sx={{ fontSize: 60, mb: 2 }} />
                <Typography variant="h6">No se encontraron productos</Typography>
                <Typography variant="body2">Intenta ajustar tus filtros o búsqueda.</Typography>
            </Box>
        );
    }

    return (
        <Grid container spacing={3}>
            {products.map((product) => (
                <Grid item key={product.id_producto} xs={12} sm={6} lg={4} xl={3}>
                    <ProductCard product={product} />
                </Grid>
            ))}
        </Grid>
    );
};

export default ProductGrid;
