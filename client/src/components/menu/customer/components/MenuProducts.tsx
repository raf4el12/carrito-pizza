import { useState, useEffect } from 'react';
import { useCategories } from '../../../../hook/categories/useCategories';
import { useProducts } from '../../../../hook/products/useProducts';
import { CircularProgress, Container, Grid, Typography, Card, CardMedia, CardContent, Button, IconButton } from '@mui/material';
import { AddShoppingCart, FavoriteBorder } from '@mui/icons-material';

const MenuProducts = () => {
    const { data: categories, isLoading: loadingCategories, error: errorCategories } = useCategories();
    const { data: products, isLoading: loadingProducts, error: errorProducts } = useProducts();
    const [activeCategory, setActiveCategory] = useState<number | 'all'>('all');


    useEffect(() => {
        if (activeCategory !== 'all') {
            const element = document.getElementById(`category-${activeCategory}`);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    }, [activeCategory]);

    if (loadingCategories || loadingProducts) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <CircularProgress color="error" />
            </div>
        );
    }

    if (errorCategories || errorProducts) {
        return (
            <div className="text-center py-20">
                <Typography variant="h5" color="error">
                    Error al cargar el menú. Por favor, intenta de nuevo más tarde.
                </Typography>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen pb-20 font-sans">

            <div className="sticky top-16 z-20 bg-white shadow-sm py-6 mb-8">
                <Container maxWidth="xl">
                    <div className="flex justify-center items-center gap-4 overflow-x-auto pb-2 scrollbar-hide">
                        <button
                            onClick={() => setActiveCategory('all')}
                            className={`flex flex-col items-center min-w-[100px] group transition-all duration-300 ${activeCategory === 'all' ? 'scale-110' : 'hover:scale-105'
                                }`}
                        >
                            <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-2 border-2 shadow-md transition-colors ${activeCategory === 'all' ? 'border-green-600 bg-green-50' : 'border-gray-200 bg-white group-hover:border-green-400'
                                }`}>
                                <span className={`text-2xl font-bold ${activeCategory === 'all' ? 'text-green-700' : 'text-gray-400'}`}>ALL</span>
                            </div>
                            <span className={`text-sm font-bold uppercase tracking-wide ${activeCategory === 'all' ? 'text-green-700' : 'text-gray-500'
                                }`}>
                                Todos
                            </span>
                        </button>

                        {categories?.map((category) => (
                            <button
                                key={category.id_categoria}
                                onClick={() => setActiveCategory(category.id_categoria)}
                                className={`flex flex-col items-center min-w-[100px] group transition-all duration-300 ${activeCategory === category.id_categoria ? 'scale-110' : 'hover:scale-105'
                                    }`}
                            >
                                <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-2 border-2 shadow-md transition-colors ${activeCategory === category.id_categoria ? 'border-green-600 bg-green-50' : 'border-gray-200 bg-white group-hover:border-green-400'
                                    }`}>
                                    <span className={`text-2xl font-bold ${activeCategory === category.id_categoria ? 'text-green-700' : 'text-gray-400'}`}>
                                        {category.nombre_categoria.charAt(0)}
                                    </span>
                                </div>
                                <span className={`text-sm font-bold uppercase tracking-wide ${activeCategory === category.id_categoria ? 'text-green-700' : 'text-gray-500'
                                    }`}>
                                    {category.nombre_categoria}
                                </span>
                            </button>
                        ))}
                    </div>
                </Container>
            </div>

            <Container maxWidth="xl">
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        {categories?.map((category) => {
                            const categoryProducts = products?.filter(p => p.id_categoria === category.id_categoria);

                            if (!categoryProducts?.length) return null;
                            if (activeCategory !== 'all' && activeCategory !== category.id_categoria) return null;

                            return (
                                <div key={category.id_categoria} id={`category-${category.id_categoria}`} className="mb-16 scroll-mt-40">
                                    <div className="text-center mb-10">
                                        <Typography variant="h4" component="h2" className="font-extrabold uppercase tracking-tighter text-gray-900">
                                            {category.nombre_categoria}
                                        </Typography>
                                        <div className="w-24 h-1 bg-green-600 mx-auto mt-2"></div>
                                    </div>

                                    <Grid container spacing={4}>
                                        {categoryProducts.map((product) => (
                                            <Grid item key={product.id_producto} xs={12} sm={6} lg={4} xl={3}>
                                                <Card className="h-full flex flex-col shadow-lg hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden border border-gray-100 group">
                                                    <div className="relative pt-[65%] overflow-hidden bg-gray-50">
                                                        <CardMedia
                                                            component="img"
                                                            image={product.imagen_url || 'https://placehold.co/600x400?text=Pizza'}
                                                            alt={product.nombre}
                                                            className="absolute top-0 left-0 w-full h-full object-contain p-4 transform group-hover:scale-110 transition-transform duration-500"
                                                        />
                                                        <div className="absolute top-3 right-3">
                                                            <IconButton className="bg-white/80 hover:bg-white shadow-sm">
                                                                <FavoriteBorder className="text-gray-400 hover:text-red-500" />
                                                            </IconButton>
                                                        </div>
                                                        <div className="absolute bottom-3 left-3 bg-green-600 text-white px-3 py-1 rounded-full font-bold shadow-md">
                                                            S/ {product.precio || '0.00'}
                                                        </div>
                                                    </div>

                                                    <CardContent className="flex-grow flex flex-col p-6">
                                                        <Typography variant="h6" component="h3" className="font-bold text-gray-900 mb-2 leading-tight">
                                                            {product.nombre}
                                                        </Typography>
                                                        <Typography variant="body2" className="text-gray-500 mb-4 line-clamp-2 flex-grow">
                                                            {product.descripcion}
                                                        </Typography>

                                                        <Button
                                                            variant="contained"
                                                            fullWidth
                                                            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-full shadow-md transform active:scale-95 transition-all"
                                                            startIcon={<AddShoppingCart />}
                                                        >
                                                            AGREGAR
                                                        </Button>
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </div>
                            );
                        })}
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default MenuProducts;
