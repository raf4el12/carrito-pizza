import {
    Box,
    TextField,
    InputAdornment,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Typography
} from '@mui/material';
import { Search } from '@mui/icons-material';
import { SortOption } from '../hooks/useMenuLogic';

interface MenuHeaderProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
    sortOption: SortOption;
    onSortChange: (option: SortOption) => void;
    totalProducts: number;
}

const MenuHeader = ({
    searchQuery,
    onSearchChange,
    sortOption,
    onSortChange,
    totalProducts
}: MenuHeaderProps) => {
    return (
        <Box className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <Typography variant="h6" className="text-gray-700 font-medium">
                Mostrando <span className="font-bold text-gray-900">{totalProducts}</span> resultados
            </Typography>

            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                <TextField
                    placeholder="Buscar pizza..."
                    variant="outlined"
                    size="small"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="bg-white"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search className="text-gray-400" />
                            </InputAdornment>
                        ),
                    }}
                    sx={{ minWidth: 250 }}
                />

                <FormControl size="small" sx={{ minWidth: 180 }} className="bg-white">
                    <InputLabel>Ordenar por</InputLabel>
                    <Select
                        value={sortOption}
                        label="Ordenar por"
                        onChange={(e) => onSortChange(e.target.value as SortOption)}
                    >
                        <MenuItem value="default">Relevancia</MenuItem>
                        <MenuItem value="price-asc">Precio: Menor a Mayor</MenuItem>
                        <MenuItem value="price-desc">Precio: Mayor a Menor</MenuItem>
                        <MenuItem value="name-asc">Nombre: A-Z</MenuItem>
                    </Select>
                </FormControl>
            </div>
        </Box>
    );
};

export default MenuHeader;
