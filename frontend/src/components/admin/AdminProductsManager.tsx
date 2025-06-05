import { useState } from "react";
import Button from "@components/ui/Button";
import type { Product } from "src/types/product";
import { productService } from "src/services/productService";

interface AdminProductsManagerProps {
    products: Product[];
    currentUserId?: string;
}

export default function AdminProductsManager({ products: initialProducts, currentUserId }: AdminProductsManagerProps) {
    const [products, setProducts] = useState<Product[]>(initialProducts);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        cover: "",
        category: "",
        description: "",
        stock: "",
        currencyType: "€",
        isNew: false,
        isTopSale: false,
        isLimited: false
    });

    const handleDeleteProduct = async (productId: string) => {
        if (!confirm("Are you sure you want to delete this product?")) return;

        setLoading(true);
        try {
            const success = await productService.deleteProduct(productId);
            if (success) {
                setProducts(products.filter(p => p.id !== productId));
            } else {
                setError("Failed to delete product");
            }
        } catch (e) {
            setError("Error deleting product");
        } finally {
            setLoading(false);
        }
    };

    const handleCreateProduct = () => {
        setShowCreateForm(true);
        setEditingProduct(null);
        setFormData({
            name: "",
            price: "",
            cover: "",
            category: "",
            description: "",
            stock: "",
            currencyType: "€",
            isNew: false,
            isTopSale: false,
            isLimited: false
        });
    };

    const handleEditProduct = (product: Product) => {
        setEditingProduct(product);
        setFormData({
            name: product.name,
            price: product.price.toString(),
            cover: product.cover,
            category: product.category,
            description: product.description || "",
            stock: product.stock.toString(),
            currencyType: product.currencyType,
            isNew: product.isNew,
            isTopSale: product.isTopSale,
            isLimited: product.isLimited
        });
        setShowCreateForm(true);
    };

    const handleSubmitForm = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const productData = {
                name: formData.name,
                price: parseFloat(formData.price),
                cover: formData.cover,
                category: formData.category,
                description: formData.description,
                stock: parseInt(formData.stock),
                currencyType: formData.currencyType,
                isNew: formData.isNew,
                isTopSale: formData.isTopSale,
                isLimited: formData.isLimited
            };

            if (editingProduct) {
                // Actualizar producto existente
                const updatedProduct = await productService.updateProduct(editingProduct.id, productData);
                if (updatedProduct) {
                    setProducts(products.map(p => p.id === editingProduct.id ? updatedProduct : p));
                }
            } else {
                // Crear nuevo producto
                const newProduct = await productService.createProduct(productData);
                if (newProduct) {
                    setProducts([newProduct, ...products]);
                }
            }

            setShowCreateForm(false);
            setError("");
        } catch (e) {
            setError(`Error ${editingProduct ? 'updating' : 'creating'} product`);
        } finally {
            setLoading(false);
        }
    };

    const formatPrice = (price: number, currency: string) => {
        return `${price}${currency}`;
    };

    const getStockStatus = (stock: number) => {
        if (stock === 0) return { text: "Out of Stock", color: "text-red-600" };
        if (stock <= 5) return { text: "Low Stock", color: "text-orange-600" };
        return { text: "In Stock", color: "text-green-600" };
    };

    return (
        <div>
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                    Products ({products.length})
                </h2>
                <Button
                    text="Add New Product"
                    type="primary"
                    onClick={handleCreateProduct}
                    disabled={loading}
                />
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Product
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Price
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Stock
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Category
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {products.map((product) => {
                                const stockStatus = getStockStatus(product.stock);
                                return (
                                    <tr key={product.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-12 w-12">
                                                    <img
                                                        className="h-12 w-12 rounded-md object-cover"
                                                        src={product.cover}
                                                        alt={product.name}
                                                    />
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {product.name}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        ID: {product.id.slice(0, 8)}...
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">
                                                {formatPrice(product.price, product.currencyType)}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">
                                                {product.stock} units
                                            </div>
                                            <div className={`text-xs ${stockStatus.color}`}>
                                                {stockStatus.text}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800 capitalize">
                                                {product.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex space-x-1">
                                                {product.isNew && (
                                                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                                                        New
                                                    </span>
                                                )}
                                                {product.isTopSale && (
                                                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                                                        Top Sale
                                                    </span>
                                                )}
                                                {product.isLimited && (
                                                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">
                                                        Limited
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                            <button
                                                onClick={() => handleEditProduct(product)}
                                                className="text-blue-600 hover:text-blue-900"
                                                disabled={loading}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDeleteProduct(product.id)}
                                                className="text-red-600 hover:text-red-900"
                                                disabled={loading}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {products.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-gray-500">
                            No products found. Create your first product to get started.
                        </div>
                    </div>
                )}
            </div>

            {/* Modal de formulario funcional */}
            {showCreateForm && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                    <div className="relative top-10 mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white">
                        <form onSubmit={handleSubmitForm} className="mt-3">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">
                                {editingProduct ? "Edit Product" : "Create New Product"}
                            </h3>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            value={formData.price}
                                            onChange={(e) => setFormData({...formData, price: e.target.value})}
                                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                                        <input
                                            type="number"
                                            value={formData.stock}
                                            onChange={(e) => setFormData({...formData, stock: e.target.value})}
                                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                        required
                                    >
                                        <option value="">Select category</option>
                                        <option value="electronics">Electronics</option>
                                        <option value="clothing">Clothing</option>
                                        <option value="accessories">Accessories</option>
                                        <option value="sports">Sports</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                                    <input
                                        type="url"
                                        value={formData.cover}
                                        onChange={(e) => setFormData({...formData, cover: e.target.value})}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                                        rows={3}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={formData.isNew}
                                            onChange={(e) => setFormData({...formData, isNew: e.target.checked})}
                                            className="mr-2"
                                        />
                                        <span className="text-sm text-gray-700">Mark as New</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={formData.isTopSale}
                                            onChange={(e) => setFormData({...formData, isTopSale: e.target.checked})}
                                            className="mr-2"
                                        />
                                        <span className="text-sm text-gray-700">Top Sale</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={formData.isLimited}
                                            onChange={(e) => setFormData({...formData, isLimited: e.target.checked})}
                                            className="mr-2"
                                        />
                                        <span className="text-sm text-gray-700">Limited Edition</span>
                                    </label>
                                </div>
                            </div>

                            <div className="flex space-x-2 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setShowCreateForm(false)}
                                    className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                                    disabled={loading}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
                                    disabled={loading}
                                >
                                    {loading ? 'Saving...' : (editingProduct ? 'Update' : 'Create')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
