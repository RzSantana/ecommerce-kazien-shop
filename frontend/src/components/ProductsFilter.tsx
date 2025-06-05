// components/ProductsFilter.tsx (ACTUALIZADO)
import { useState, useMemo, type ChangeEvent } from "react";
import Select from "@components/ui/Select";
import ProductCard from "@components/product/ProductCard";

interface Product {
    id: string;
    name: string;
    price: number;
    cover: string;
    categoryId: string;
    category?: {
        id: string;
        name: string;
    };
}

interface ProductsFilterProps {
    products: Product[];
    currencyType: string;
}

export default function ProductsFilter({
    products,
    currencyType,
}: ProductsFilterProps) {
    const [selectedCategory, setSelectedCategory] = useState("");
    const [sortBy, setSortBy] = useState("newest");

    // Generar opciones de categorías dinámicamente desde los productos
    const categoryOptions = useMemo(() => {
        const uniqueCategories = new Map();

        products.forEach((product) => {
            if (product.category) {
                uniqueCategories.set(product.category.id, {
                    value: product.category.id,
                    label: product.category.name,
                });
            }
        });

        return Array.from(uniqueCategories.values());
    }, [products]);

    const sortOptions = [
        { value: "newest", label: "Newest" },
        { value: "price-low", label: "Price: Low to High" },
        { value: "price-high", label: "Price: High to Low" },
    ];

    // Filtrar y ordenar productos
    const filteredAndSortedProducts = useMemo(() => {
        let filtered = products;

        // Filtrar por categoría
        if (selectedCategory) {
            filtered = filtered.filter(
                (product) => product.category?.id === selectedCategory
            );
        }

        // Ordenar
        const sorted = [...filtered].sort((a, b) => {
            switch (sortBy) {
                case "price-low":
                    return a.price - b.price;
                case "price-high":
                    return b.price - a.price;
                case "newest":
                default:
                    return 0; // Mantener orden original para "newest"
            }
        });

        return sorted;
    }, [products, selectedCategory, sortBy]);

    const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(e.target.value);
    };

    const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setSortBy(e.target.value);
    };

    return (
        <div>
            {/* Filtros */}
            <div className="flex justify-end mb-8 w-fit ml-auto">
                <div className="flex gap-4">
                    <Select
                        options={categoryOptions}
                        placeholder="All Categories"
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                        name="category"
                    />
                    <Select
                        options={sortOptions}
                        placeholder="Sort by"
                        value={sortBy}
                        onChange={handleSortChange}
                        name="sort"
                    />
                </div>
            </div>

            {/* Grid de productos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredAndSortedProducts.map((product) => (
                    <ProductCard
                        key={product.id}
                        name={product.name}
                        price={product.price}
                        currencyType={currencyType}
                        cover={product.cover}
                    />
                ))}
            </div>

            {/* Mensaje si no hay productos */}
            {filteredAndSortedProducts.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">
                        No products found for the selected filters.
                    </p>
                </div>
            )}
        </div>
    );
}
