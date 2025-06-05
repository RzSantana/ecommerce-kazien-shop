// components/ProductsFilter.tsx - WITH SEARCH IMPLEMENTED
import { useState, useMemo, useEffect, type ChangeEvent } from "react";
import Select from "@components/ui/Select";
import ProductCard from "@components/product/ProductCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";

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
    initialSearchQuery?: string; // Para búsqueda inicial desde URL
}

export default function ProductsFilter({
    products,
    currencyType,
    initialSearchQuery = "",
}: ProductsFilterProps) {
    const [selectedCategory, setSelectedCategory] = useState("");
    const [sortBy, setSortBy] = useState("newest");
    const [searchQuery, setSearchQuery] = useState(initialSearchQuery);

    // Detectar parámetros de búsqueda en la URL al cargar
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const query = urlParams.get("q") || "";
        if (query) {
            setSearchQuery(query);
        }
    }, []);

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
        { value: "name", label: "Name A-Z" },
    ];

    // Filtrar y ordenar productos CON BÚSQUEDA
    const filteredAndSortedProducts = useMemo(() => {
        let filtered = products;

        // Filtrar por búsqueda de texto
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase().trim();
            filtered = filtered.filter(
                (product) =>
                    product.name.toLowerCase().includes(query) ||
                    product.category?.name.toLowerCase().includes(query)
            );
        }

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
                case "name":
                    return a.name.localeCompare(b.name);
                case "newest":
                default:
                    return 0; // Mantener orden original para "newest"
            }
        });

        return sorted;
    }, [products, selectedCategory, sortBy, searchQuery]);

    const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(e.target.value);
    };

    const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setSortBy(e.target.value);
    };

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const clearSearch = () => {
        setSearchQuery("");
    };

    const clearAllFilters = () => {
        setSearchQuery("");
        setSelectedCategory("");
        setSortBy("newest");
    };

    // Contar filtros activos
    const activeFiltersCount =
        (searchQuery.trim() ? 1 : 0) +
        (selectedCategory ? 1 : 0) +
        (sortBy !== "newest" ? 1 : 0);

    return (
        <div className="w-full max-w-7xl mx-auto px-6">
            {/* Barra de búsqueda principal */}
            <div className="mb-8">
                <div className="relative max-w-md mx-auto">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FontAwesomeIcon
                            icon={faSearch}
                            className="h-5 w-5 text-gray-400"
                        />
                    </div>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="Search products, categories..."
                        className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {searchQuery && (
                        <button
                            onClick={clearSearch}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        >
                            <FontAwesomeIcon
                                icon={faTimes}
                                className="h-5 w-5 text-gray-400 hover:text-gray-600"
                            />
                        </button>
                    )}
                </div>
            </div>

            {/* Filtros y estadísticas */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                {/* Información de resultados */}
                <div className="flex items-center gap-4">
                    <p className="text-gray-600">
                        <span className="font-semibold">
                            {filteredAndSortedProducts.length}
                        </span>{" "}
                        {filteredAndSortedProducts.length === 1
                            ? "product"
                            : "products"}
                        {searchQuery && (
                            <>
                                {" "}
                                for{" "}
                                <span className="font-semibold">
                                    "{searchQuery}"
                                </span>
                            </>
                        )}
                    </p>

                    {/* Botón limpiar filtros */}
                    {activeFiltersCount > 0 && (
                        <button
                            onClick={clearAllFilters}
                            className="text-sm text-blue-600 hover:text-blue-800 underline"
                        >
                            Clear all filters ({activeFiltersCount})
                        </button>
                    )}
                </div>

                {/* Selectores de filtros */}
                <div className="flex gap-4 w-full sm:w-auto">
                    <Select
                        options={categoryOptions}
                        placeholder="All Categories"
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                        name="category"
                        className="min-w-[150px]"
                    />
                    <Select
                        options={sortOptions}
                        placeholder="Sort by"
                        value={sortBy}
                        onChange={handleSortChange}
                        name="sort"
                        className="min-w-[150px]"
                    />
                </div>
            </div>

            {/* Filtros activos (tags) */}
            {(searchQuery || selectedCategory || sortBy !== "newest") && (
                <div className="mb-6 flex flex-wrap gap-2">
                    {searchQuery && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                            Search: "{searchQuery}"
                            <button
                                onClick={clearSearch}
                                className="ml-2 text-blue-600 hover:text-blue-800"
                            >
                                <FontAwesomeIcon
                                    icon={faTimes}
                                    className="h-3 w-3"
                                />
                            </button>
                        </span>
                    )}
                    {selectedCategory && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                            Category:{" "}
                            {
                                categoryOptions.find(
                                    (cat) => cat.value === selectedCategory
                                )?.label
                            }
                            <button
                                onClick={() => setSelectedCategory("")}
                                className="ml-2 text-green-600 hover:text-green-800"
                            >
                                <FontAwesomeIcon
                                    icon={faTimes}
                                    className="h-3 w-3"
                                />
                            </button>
                        </span>
                    )}
                    {sortBy !== "newest" && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800">
                            Sort:{" "}
                            {
                                sortOptions.find(
                                    (sort) => sort.value === sortBy
                                )?.label
                            }
                            <button
                                onClick={() => setSortBy("newest")}
                                className="ml-2 text-purple-600 hover:text-purple-800"
                            >
                                <FontAwesomeIcon
                                    icon={faTimes}
                                    className="h-3 w-3"
                                />
                            </button>
                        </span>
                    )}
                </div>
            )}

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
                <div className="text-center py-16">
                    <div className="bg-gray-100 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                        <FontAwesomeIcon
                            icon={faSearch}
                            className="w-12 h-12 text-gray-400"
                        />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        No products found
                    </h3>
                    <p className="text-gray-500 mb-6">
                        {searchQuery
                            ? `No products match "${searchQuery}". Try adjusting your search terms.`
                            : "No products found for the selected filters."}
                    </p>
                    {activeFiltersCount > 0 && (
                        <button
                            onClick={clearAllFilters}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Clear all filters
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}
