import { useState, useMemo } from 'react';
import { useCategories } from '../../../../hook/categories/useCategories';
import { useProducts } from '../../../../hook/products/useProducts';

export type SortOption = 'default' | 'price-asc' | 'price-desc' | 'name-asc';

export const useMenuLogic = () => {
    const { data: categories, isLoading: loadingCategories, error: errorCategories } = useCategories();
    const { data: products, isLoading: loadingProducts, error: errorProducts } = useProducts();

    const [selectedCategory, setSelectedCategory] = useState<number | 'all'>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOption, setSortOption] = useState<SortOption>('default');

    const filteredProducts = useMemo(() => {
        if (!products) return [];

        let result = [...products];

        // Filter by Category
        if (selectedCategory !== 'all') {
            result = result.filter(p => p.id_categoria === selectedCategory);
        }

        // Filter by Search Query
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(p =>
                p.nombre.toLowerCase().includes(query) ||
                p.descripcion.toLowerCase().includes(query)
            );
        }

        // Sort
        switch (sortOption) {
            case 'price-asc':
                result.sort((a, b) => (Number(a.precio) || 0) - (Number(b.precio) || 0));
                break;
            case 'price-desc':
                result.sort((a, b) => (Number(b.precio) || 0) - (Number(a.precio) || 0));
                break;
            case 'name-asc':
                result.sort((a, b) => a.nombre.localeCompare(b.nombre));
                break;
            default:
                // Default sorting (e.g., by ID or original order)
                break;
        }

        return result;
    }, [products, selectedCategory, searchQuery, sortOption]);

    return {
        categories,
        products: filteredProducts,
        loading: loadingCategories || loadingProducts,
        error: errorCategories || errorProducts,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        sortOption,
        setSortOption,
        totalProducts: filteredProducts.length
    };
};
