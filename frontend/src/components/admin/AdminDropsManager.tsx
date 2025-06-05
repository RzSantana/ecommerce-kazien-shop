import { useState } from "react";
import Button from "@components/ui/Button";
import type { Drop } from "src/types/drop";
import { dropService } from "src/services/dropService";
import { productService } from "src/services/productService";

interface AdminDropsManagerProps {
    drops: Drop[];
    currentUserId?: string;
}

export default function AdminDropsManager({ drops: initialDrops, currentUserId }: AdminDropsManagerProps) {
    const [drops, setDrops] = useState<Drop[]>(initialDrops);
    const [loading, setLoading] = useState(false);
    const [productsLoading, setProductsLoading] = useState(false);
    const [error, setError] = useState("");
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [editingDrop, setEditingDrop] = useState<Drop | null>(null);
    const [showProductsModal, setShowProductsModal] = useState<Drop | null>(null);
    const [availableProducts, setAvailableProducts] = useState<any[]>([]);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        status: "ACTIVE" as "ACTIVE" | "COMING_SOON" | "ENDED",
        releaseDate: "",
        endDate: "",
        bannerImage: "",
        primaryColor: "#000000",
        secondaryColor: "#ffffff",
        accentColor: "#ff0000"
    });

    // CRUD Operations
    const handleDeleteDrop = async (dropId: string) => {
        if (!confirm("Are you sure you want to delete this collection?")) return;

        setLoading(true);
        try {
            const success = await dropService.deleteDrop(dropId);
            if (success) {
                setDrops(drops.filter(d => d.id !== dropId));
                showToast("Collection deleted successfully", "success");
            } else {
                setError("Failed to delete collection");
            }
        } catch (e) {
            setError("Error deleting collection");
        } finally {
            setLoading(false);
        }
    };

    const handleCreateDrop = () => {
        setShowCreateForm(true);
        setEditingDrop(null);
        setFormData({
            name: "",
            description: "",
            status: "ACTIVE",
            releaseDate: "",
            endDate: "",
            bannerImage: "",
            primaryColor: "#000000",
            secondaryColor: "#ffffff",
            accentColor: "#ff0000"
        });
    };

    const handleEditDrop = (drop: Drop) => {
        setEditingDrop(drop);
        setFormData({
            name: drop.name,
            description: drop.description,
            status: drop.status,
            releaseDate: drop.releaseDate.split('T')[0],
            endDate: drop.endDate ? drop.endDate.split('T')[0] : "",
            bannerImage: drop.bannerImage,
            primaryColor: drop.primaryColor,
            secondaryColor: drop.secondaryColor,
            accentColor: drop.accentColor
        });
        setShowCreateForm(true);
    };

    const handleSubmitForm = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const dropData = {
                ...formData,
                releaseDate: new Date(formData.releaseDate).toISOString(),
                endDate: formData.endDate ? new Date(formData.endDate).toISOString() : undefined
            };

            if (editingDrop) {
                const updatedDrop = await dropService.updateDrop(editingDrop.id, dropData);
                if (updatedDrop) {
                    setDrops(drops.map(d => d.id === editingDrop.id ? updatedDrop : d));
                    showToast("Collection updated successfully", "success");
                }
            } else {
                const newDrop = await dropService.createDrop(dropData);
                if (newDrop) {
                    setDrops([newDrop, ...drops]);
                    showToast("Collection created successfully", "success");
                }
            }

            setShowCreateForm(false);
            setError("");
        } catch (e) {
            setError(`Error ${editingDrop ? 'updating' : 'creating'} collection`);
        } finally {
            setLoading(false);
        }
    };

    // Products Management
    const handleManageProducts = async (drop: Drop) => {
        setShowProductsModal(drop);
        setProductsLoading(true);
        try {
            // Cargar productos frescos cada vez que se abre el modal
            const products = await productService.getAllProducts();
            setAvailableProducts(products);
        } catch (e) {
            setError("Error loading products");
        } finally {
            setProductsLoading(false);
        }
    };

    const handleAddProductToDrop = async (productId: string) => {
        if (!showProductsModal) return;

        setProductsLoading(true);
        try {
            const dropProduct = await dropService.addProductToDrop(showProductsModal.id, {
                productId,
                dropPrice: undefined,
                isLimited: false
            });

            if (dropProduct) {
                // Refresh drops to show updated products
                const updatedDrops = await dropService.getAllDrops();
                setDrops(updatedDrops);

                // Actualizar el modal con el drop actualizado
                const updatedDrop = updatedDrops.find(d => d.id === showProductsModal.id);
                if (updatedDrop) {
                    setShowProductsModal(updatedDrop);
                }

                showToast("Product added to collection", "success");
            }
        } catch (e) {
            setError("Error adding product to collection");
        } finally {
            setProductsLoading(false);
        }
    };

    const handleRemoveProductFromDrop = async (productId: string) => {
        if (!showProductsModal) return;

        setProductsLoading(true);
        try {
            const success = await dropService.removeProductFromDrop(showProductsModal.id, productId);
            if (success) {
                // Refresh drops to show updated products
                const updatedDrops = await dropService.getAllDrops();
                setDrops(updatedDrops);

                // Actualizar el modal con el drop actualizado
                const updatedDrop = updatedDrops.find(d => d.id === showProductsModal.id);
                if (updatedDrop) {
                    setShowProductsModal(updatedDrop);
                }

                showToast("Product removed from collection", "success");
            }
        } catch (e) {
            setError("Error removing product from collection");
        } finally {
            setProductsLoading(false);
        }
    };

    // Utility functions
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'ACTIVE': return 'bg-green-100 text-green-800';
            case 'COMING_SOON': return 'bg-blue-100 text-blue-800';
            case 'ENDED': return 'bg-gray-100 text-gray-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString();
    };

    const showToast = (message: string, type: "success" | "error") => {
        // Simple toast implementation
        const toast = document.createElement('div');
        toast.className = `fixed top-4 right-4 z-50 p-4 rounded-md text-white font-medium ${
            type === 'success' ? 'bg-green-500' : 'bg-red-500'
        }`;
        toast.textContent = message;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
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
                    Collections ({drops.length})
                </h2>
                <Button
                    text="Create New Collection"
                    type="primary"
                    onClick={handleCreateDrop}
                    disabled={loading}
                />
            </div>

            {/* Collections Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {drops.map((drop) => (
                    <div key={drop.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                        {/* Banner */}
                        <div className="h-48 bg-gray-200">
                            <img
                                src={drop.bannerImage}
                                alt={drop.name}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Content */}
                        <div className="p-6">
                            <div className="flex items-start justify-between mb-2">
                                <h3 className="text-lg font-semibold text-gray-900 truncate">
                                    {drop.name}
                                </h3>
                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full capitalize ${getStatusColor(drop.status)}`}>
                                    {drop.status.replace('_', ' ')}
                                </span>
                            </div>

                            <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                                {drop.description}
                            </p>

                            <div className="space-y-2 text-sm text-gray-500 mb-4">
                                <div className="flex justify-between">
                                    <span>Release:</span>
                                    <span>{formatDate(drop.releaseDate)}</span>
                                </div>
                                {drop.endDate && (
                                    <div className="flex justify-between">
                                        <span>End:</span>
                                        <span>{formatDate(drop.endDate)}</span>
                                    </div>
                                )}
                                <div className="flex justify-between">
                                    <span>Products:</span>
                                    <span>{drop.products?.length || 0}</span>
                                </div>
                            </div>

                            {/* Theme Colors */}
                            <div className="mb-4">
                                <div className="text-xs text-gray-500 mb-2">Theme Colors:</div>
                                <div className="flex space-x-2">
                                    <div
                                        className="w-6 h-6 rounded border"
                                        style={{ backgroundColor: drop.primaryColor }}
                                        title="Primary"
                                    ></div>
                                    <div
                                        className="w-6 h-6 rounded border"
                                        style={{ backgroundColor: drop.secondaryColor }}
                                        title="Secondary"
                                    ></div>
                                    <div
                                        className="w-6 h-6 rounded border"
                                        style={{ backgroundColor: drop.accentColor }}
                                        title="Accent"
                                    ></div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="space-y-2">
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => handleEditDrop(drop)}
                                        className="flex-1 text-sm px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                        disabled={loading}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleManageProducts(drop)}
                                        className="flex-1 text-sm px-3 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                                        disabled={loading}
                                    >
                                        Products
                                    </button>
                                </div>
                                <button
                                    onClick={() => handleDeleteDrop(drop.id)}
                                    className="w-full text-sm px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                                    disabled={loading}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {drops.length === 0 && (
                <div className="text-center py-12">
                    <div className="text-gray-500 mb-4">
                        No collections found. Create your first collection to get started.
                    </div>
                </div>
            )}

            {/* Create/Edit Modal */}
            {showCreateForm && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                    <div className="relative top-10 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
                        <form onSubmit={handleSubmitForm} className="mt-3">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">
                                {editingDrop ? "Edit Collection" : "Create New Collection"}
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>

                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                                        rows={3}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                    <select
                                        value={formData.status}
                                        onChange={(e) => setFormData({...formData, status: e.target.value as any})}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="ACTIVE">Active</option>
                                        <option value="COMING_SOON">Coming Soon</option>
                                        <option value="ENDED">Ended</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Release Date</label>
                                    <input
                                        type="date"
                                        value={formData.releaseDate}
                                        onChange={(e) => setFormData({...formData, releaseDate: e.target.value})}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>

                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">End Date (Optional)</label>
                                    <input
                                        type="date"
                                        value={formData.endDate}
                                        onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Banner Image URL</label>
                                    <input
                                        type="url"
                                        value={formData.bannerImage}
                                        onChange={(e) => setFormData({...formData, bannerImage: e.target.value})}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Primary Color</label>
                                    <input
                                        type="color"
                                        value={formData.primaryColor}
                                        onChange={(e) => setFormData({...formData, primaryColor: e.target.value})}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Secondary Color</label>
                                    <input
                                        type="color"
                                        value={formData.secondaryColor}
                                        onChange={(e) => setFormData({...formData, secondaryColor: e.target.value})}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Accent Color</label>
                                    <input
                                        type="color"
                                        value={formData.accentColor}
                                        onChange={(e) => setFormData({...formData, accentColor: e.target.value})}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                    />
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
                                    {loading ? 'Saving...' : (editingDrop ? 'Update' : 'Create')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Products Management Modal */}
            {showProductsModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                    <div className="relative top-10 mx-auto p-5 border w-full max-w-4xl shadow-lg rounded-md bg-white">
                        <div className="mb-4">
                            <h3 className="text-lg font-medium text-gray-900">
                                Manage Products - {showProductsModal.name}
                            </h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Products in Collection */}
                            <div>
                                <h4 className="text-md font-medium text-gray-700 mb-3">
                                    In Collection ({showProductsModal.products?.length || 0})
                                </h4>
                                <div className="space-y-2 max-h-96 overflow-y-auto">
                                    {showProductsModal.products?.map((dp) => (
                                        <div key={dp.id} className="flex items-center justify-between p-3 border rounded">
                                            <div className="flex items-center space-x-3">
                                                <img src={dp.product.cover} alt={dp.product.name} className="w-12 h-12 object-cover rounded" />
                                                <div>
                                                    <div className="font-medium">{dp.product.name}</div>
                                                    <div className="text-sm text-gray-500">{dp.product.price}€</div>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => handleRemoveProductFromDrop(dp.product.id)}
                                                className="text-red-600 hover:text-red-800 disabled:opacity-50 disabled:cursor-not-allowed"
                                                disabled={productsLoading}
                                            >
                                                {productsLoading ? "Removing..." : "Remove"}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Available Products */}
                            <div>
                                <h4 className="text-md font-medium text-gray-700 mb-3">Available Products</h4>
                                <div className="space-y-2 max-h-96 overflow-y-auto">
                                    {availableProducts
                                        .filter(p => !showProductsModal.products?.some(dp => dp.product.id === p.id))
                                        .map((product) => (
                                        <div key={product.id} className="flex items-center justify-between p-3 border rounded">
                                            <div className="flex items-center space-x-3">
                                                <img src={product.cover} alt={product.name} className="w-12 h-12 object-cover rounded" />
                                                <div>
                                                    <div className="font-medium">{product.name}</div>
                                                    <div className="text-sm text-gray-500">{product.price}€</div>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => handleAddProductToDrop(product.id)}
                                                className="text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
                                                disabled={productsLoading}
                                            >
                                                {productsLoading ? "Adding..." : "Add"}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end mt-6">
                            <button
                                onClick={() => setShowProductsModal(null)}
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
