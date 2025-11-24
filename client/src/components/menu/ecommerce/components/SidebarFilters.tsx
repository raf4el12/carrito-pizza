import { Category } from '../../../../types/categories/categories.schema';
import {
    Box,
    Typography,
    List,
    ListItemButton,
    ListItemText,
    Divider,
    Button
} from '@mui/material';
import { FilterList, RestartAlt } from '@mui/icons-material';

interface SidebarFiltersProps {
    categories: Category[] | undefined;
    selectedCategory: number | 'all';
    onSelectCategory: (id: number | 'all') => void;
}

const SidebarFilters = ({ categories, selectedCategory, onSelectCategory }: SidebarFiltersProps) => {
    return (
        <Box className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-fit sticky top-24">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-gray-800">
                    <FilterList fontSize="small" />
                    <Typography variant="h6" fontWeight="bold">Filtros</Typography>
                </div>
                {selectedCategory !== 'all' && (
                    <Button
                        size="small"
                        startIcon={<RestartAlt />}
                        onClick={() => onSelectCategory('all')}
                        className="text-gray-500 hover:text-red-600 normal-case"
                    >
                        Limpiar
                    </Button>
                )}
            </div>

            <Divider className="mb-4" />

            <Typography variant="subtitle2" className="text-gray-500 uppercase tracking-wider mb-3 font-bold text-xs">
                Categorías
            </Typography>

            <List component="nav" className="p-0">
                <ListItemButton
                    selected={selectedCategory === 'all'}
                    onClick={() => onSelectCategory('all')}
                    className={`rounded-lg mb-1 transition-all duration-200 ${selectedCategory === 'all'
                            ? 'bg-red-50 text-red-700 border-l-4 border-red-600'
                            : 'hover:bg-gray-50 text-gray-600'
                        }`}
                >
                    <ListItemText primary={<span className="font-medium">Todas</span>} />
                </ListItemButton>

                {categories?.map((category) => (
                    <ListItemButton
                        key={category.id_categoria}
                        selected={selectedCategory === category.id_categoria}
                        onClick={() => onSelectCategory(category.id_categoria)}
                        className={`rounded-lg mb-1 transition-all duration-200 ${selectedCategory === category.id_categoria
                                ? 'bg-red-50 text-red-700 border-l-4 border-red-600'
                                : 'hover:bg-gray-50 text-gray-600'
                            }`}
                    >
                        <ListItemText primary={<span className="font-medium">{category.nombre_categoria}</span>} />
                    </ListItemButton>
                ))}
            </List>
        </Box>
    );
};

export default SidebarFilters;
