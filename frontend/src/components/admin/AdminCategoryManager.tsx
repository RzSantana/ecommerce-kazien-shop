import { useState } from "react";
import Button from "@components/ui/Button";
import type { Category } from "src/types/category";
import { categoryService } from "src/services/categoryService";

interface AdminCategoriesManagerProps {
    categories: Category[];
}

export default function AdminCategoriesManager({ categories: initialCategories }: AdminCategoriesManagerProps) {
    const [categories, setCategories] = useState<Category[]>(initialCategories);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        isActive: true
    });

    const handleDeleteCategory = async (categoryId: string) => {
        if (!confirm("Are you sure you want to delete this category?")) return;

        setLoading(true);
        try {
            const success = await categoryService.deleteCategory(categoryId);
            if (success) {
                setCategories(categories.filter(c => c.id !== categoryId));
                showToast("Category deleted successfully", "success");
            } else {
                setError("Failed to delete category");
            }
        } catch (e) {
            setError("Error deleting category");
        } finally {
            setLoading(false);
        }
    };

    const handleCreateCategory = () => {
        setShowCreateForm(true);
        setEditingCategory(null);
        setFormData({
            name: "",
            description: "",
            isActive: true
        });
    };

    const handleEditCategory = (category: Category) => {
        setEditingCategory(category);
        setFormData({
            name: category.name,
            description: category.description || "",
            isActive: category.isActive
        });
        setShowCreateForm(true);
    };

    const handleSubmitForm = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (editingCategory) {
                const updatedCategory = await categoryService.updateCategory(editingCategory.id, formData);
                if (updatedCategory) {
                    setCategories(categories.map(c => c.id === editingCategory.id ? updatedCategory : c));
                    showToast("Category updated successfully", "success");
                }
            } else {
                const newCategory = await categoryService.createCategory(formData);
                if (newCategory) {
                    setCategories([newCategory, ...categories]);
                    showToast("Category created successfully", "success");
                }
            }

            setShowCreateForm(false);
            setError("");
        } catch (e) {
            setError(`Error ${editingCategory ? 'updating' : 'creating'} category`);
        } finally {
            setLoading(false);
        }
    };

    const showToast = (message: string, type: "success" | "error") => {
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
                    Categories ({categories.length})
                </h2>
                <Button
                    text="Add New Category"
                    type="primary"
                    onClick={handleCreateCategory}
                    disabled={loading}
                />
            </div>

            {/* Categories Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Category
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Description
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Products
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
                            {categories.map((category) => (
                                <tr key={category.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">
                                            {category.name}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            ID: {category.id.slice(0, 8)}...
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-900 max-w-xs truncate">
                                            {category.description || "No description"}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {category._count?.products || 0} products
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                            category.isActive
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-red-100 text-red-800'
                                        }`}>
                                            {category.isActive ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                        <button
                                            onClick={() => handleEditCategory(category)}
                                            className="text-blue-600 hover:text-blue-900"
                                            disabled={loading}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeleteCategory(category.id)}
                                            className="text-red-600 hover:text-red-900"
                                            disabled={loading || (category._count?.products || 0) > 0}
                                            title={
                                                (category._count?.products || 0) > 0
                                                    ? "Cannot delete category with products"
                                                    : "Delete category"
                                            }
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {categories.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-gray-500">
                            No categories found. Create your first category to get started.
                        </div>
                    </div>
                )}
            </div>

            {/* Create/Edit Modal */}
            {showCreateForm && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                    <div className="relative top-10 mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white">
                        <form onSubmit={handleSubmitForm} className="mt-3">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">
                                {editingCategory ? "Edit Category" : "Create New Category"}
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

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                                        rows={3}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={formData.isActive}
                                            onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                                            className="mr-2"
                                        />
                                        <span className="text-sm text-gray-700">Active</span>
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
                                    {loading ? 'Saving...' : (editingCategory ? 'Update' : 'Create')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
