import { Category } from '../../../../types/categories/categories.schema';
import { Box, Typography, Container } from '@mui/material';
import { LocalPizza, Fastfood, LocalDrink, Restaurant, LocalOffer } from '@mui/icons-material';

interface TopCategoryNavProps {
    categories: Category[] | undefined;
    selectedCategory: number | 'all';
    onSelectCategory: (id: number | 'all') => void;
}

const TopCategoryNav = ({ categories, selectedCategory, onSelectCategory }: TopCategoryNavProps) => {

    // Helper to get icon based on category name (simple heuristic)
    const getCategoryIcon = (name: string) => {
        const lowerName = name.toLowerCase();
        if (lowerName.includes('pizza')) return <LocalPizza sx={{ fontSize: 40 }} />;
        if (lowerName.includes('bebida') || lowerName.includes('drink')) return <LocalDrink sx={{ fontSize: 40 }} />;
        if (lowerName.includes('combo')) return <Fastfood sx={{ fontSize: 40 }} />;
        if (lowerName.includes('promo')) return <LocalOffer sx={{ fontSize: 40 }} />;
        return <Restaurant sx={{ fontSize: 40 }} />;
    };

    return (
        <Box className="bg-white py-4 mb-8 border-b border-gray-100 sticky top-16 z-10">
            <Container maxWidth="xl">
                <div className="flex gap-8 overflow-x-auto pb-2 scrollbar-hide justify-start md:justify-center items-end">
                    {/* 'All' / Promociones Option */}
                    <button
                        onClick={() => onSelectCategory('all')}
                        className="flex flex-col items-center justify-end group min-w-[100px] relative pb-3"
                    >
                        <div className={`mb-3 transition-transform duration-300 ${selectedCategory === 'all' ? 'scale-110 text-gray-900' : 'text-gray-400 group-hover:text-gray-600'}`}>
                            <LocalOffer sx={{ fontSize: 40 }} />
                        </div>
                        <Typography
                            variant="subtitle2"
                            className={`font-extrabold uppercase tracking-wider text-sm ${selectedCategory === 'all' ? 'text-[#006a31]' : 'text-black'
                                }`}
                        >
                            PROMOCIONES
                        </Typography>

                        {/* Active Indicator (Red Line) */}
                        {selectedCategory === 'all' && (
                            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-[#ce1126] rounded-t-full"></div>
                        )}
                    </button>

                    {categories?.map((category) => (
                        <button
                            key={category.id_categoria}
                            onClick={() => onSelectCategory(category.id_categoria)}
                            className="flex flex-col items-center justify-end group min-w-[100px] relative pb-3"
                        >
                            <div className={`mb-3 transition-transform duration-300 ${selectedCategory === category.id_categoria ? 'scale-110 text-gray-900' : 'text-gray-400 group-hover:text-gray-600'}`}>
                                {getCategoryIcon(category.nombre_categoria)}
                            </div>
                            <Typography
                                variant="subtitle2"
                                className={`font-extrabold uppercase tracking-wider text-sm ${selectedCategory === category.id_categoria ? 'text-black' : 'text-black'
                                    }`}
                            >
                                {category.nombre_categoria}
                            </Typography>

                            {/* Active Indicator (Red Line) */}
                            {selectedCategory === category.id_categoria && (
                                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-[#ce1126] rounded-t-full"></div>
                            )}
                        </button>
                    ))}
                </div>
            </Container>
        </Box>
    );
};

export default TopCategoryNav;
