import { Container, Typography, Box } from '@mui/material';
import { useMenuLogic } from '../hooks/useMenuLogic';
import TopCategoryNav from '../components/TopCategoryNav';
import MenuHeader from '../components/MenuHeader';
import ProductGrid from '../components/ProductGrid';

const MenuLayout = () => {
    const {
        categories,
        products,
        loading,
        error,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        sortOption,
        setSortOption,
        totalProducts
    } = useMenuLogic();

    if (error) {
        return (
            <div className="text-center py-20">
                <Typography variant="h5" color="error">
                    Error al cargar el menú. Por favor, intenta de nuevo más tarde.
                </Typography>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen pb-20 font-sans">


            <TopCategoryNav
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
            />

            <Container maxWidth="xl">

                <Box className="mb-6">
                    <Typography variant="h4" component="h1" fontWeight="bold" className="text-gray-900 uppercase">
                        {selectedCategory === 'all' ? 'PROMOCIONES' : categories?.find(c => c.id_categoria === selectedCategory)?.nombre_categoria}
                    </Typography>
                </Box>


                <MenuHeader
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    sortOption={sortOption}
                    onSortChange={setSortOption}
                    totalProducts={totalProducts}
                />

                <ProductGrid products={products} loading={loading} />
            </Container>
        </div>
    );
};

export default MenuLayout;

