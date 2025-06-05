import { useState } from "react";
import Button from "@components/ui/Button";
import type { Category } from "src/types/category";
import { categoryService } from "src/services/categoryService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle, faFolder, faCheckCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";

interface AdminCategoriesManagerProps {
    categories: Category[];
    currentUserId?: string;
}

export default function AdminCategoriesManager({
    categories: initialCategories,
    currentUserId,
}: AdminCategoriesManagerProps) {
    const [categories, setCategories] = useState<Category[]>(initialCategories);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(
        null
    );
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        isActive: true,
    });

    const handleDeleteCategory = async (categoryId: string) => {
        const category = categories.find((c) => c.id === categoryId);
        const productCount = category?._count?.products || 0;

        if (productCount > 0) {
            showToast(
                `Cannot delete category "${category?.name}" - it has ${productCount} products assigned`,
                "error"
            );
            return;
        }

        if (
            !confirm(
                `Are you sure you want to delete the category "${category?.name}"?`
            )
        )
            return;

        // Verificar que tengamos el ID del usuario
        if (!currentUserId) {
            setError(
                "User session not found. Please refresh the page and try again."
            );
            return;
        }

        setLoading(true);
        try {
            const success = await categoryService.deleteCategory(
                categoryId,
                currentUserId
            );
            if (success) {
                setCategories(categories.filter((c) => c.id !== categoryId));
                showToast("Category deleted successfully", "success");
            } else {
                setError("Failed to delete category");
            }
        } catch (e) {
            const errorMessage =
                e instanceof Error ? e.message : "Error deleting category";
            setError(errorMessage);
            showToast(errorMessage, "error");
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
            isActive: true,
        });
        setError("");
    };

    const handleEditCategory = (category: Category) => {
        setEditingCategory(category);
        setFormData({
            name: category.name,
            description: category.description || "",
            isActive: category.isActive,
        });
        setShowCreateForm(true);
        setError("");
    };

    const handleSubmitForm = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            // Verificar que tengamos el ID del usuario
            if (!currentUserId) {
                throw new Error(
                    "User session not found. Please refresh the page and try again."
                );
            }

            // Validaciones
            if (!formData.name.trim()) {
                throw new Error("Category name is required");
            }

            if (formData.name.trim().length < 2) {
                throw new Error(
                    "Category name must be at least 2 characters long"
                );
            }

            // Verificar nombres duplicados (excluyendo la categoría actual si estamos editando)
            const duplicateName = categories.find(
                (c) =>
                    c.name.toLowerCase() ===
                        formData.name.trim().toLowerCase() &&
                    c.id !== editingCategory?.id
            );

            if (duplicateName) {
                throw new Error(
                    `A category with the name "${formData.name.trim()}" already exists`
                );
            }

            const categoryData = {
                name: formData.name.trim(),
                description: formData.description.trim() || undefined,
                isActive: formData.isActive,
            };

            if (editingCategory) {
                const updatedCategory = await categoryService.updateCategory(
                    editingCategory.id,
                    categoryData,
                    currentUserId
                );
                if (updatedCategory) {
                    setCategories(
                        categories.map((c) =>
                            c.id === editingCategory.id ? updatedCategory : c
                        )
                    );
                    showToast("Category updated successfully", "success");
                } else {
                    throw new Error("Failed to update category");
                }
            } else {
                const newCategory = await categoryService.createCategory(
                    categoryData,
                    currentUserId
                );
                if (newCategory) {
                    // Agregar el _count para consistencia
                    const categoryWithCount = {
                        ...newCategory,
                        _count: { products: 0 },
                    };
                    setCategories([categoryWithCount, ...categories]);
                    showToast("Category created successfully", "success");
                } else {
                    throw new Error("Failed to create category");
                }
            }

            setShowCreateForm(false);
        } catch (e) {
            const errorMessage =
                e instanceof Error ? e.message : "Unknown error occurred";
            setError(errorMessage);
            showToast(errorMessage, "error");
        } finally {
            setLoading(false);
        }
    };

    const showToast = (message: string, type: "success" | "error") => {
        const toast = document.createElement("div");
        toast.className = `fixed top-4 right-4 z-50 p-4 rounded-md text-white font-medium shadow-lg transition-all duration-300 ${
            type === "success" ? "bg-green-500" : "bg-red-500"
        }`;
        toast.innerHTML = `
            <div class="flex items-center">
                <span class="mr-2">${type === "success" ? "✓" : "✕"}</span>
                <span>${message}</span>
                <button class="ml-4 text-white hover:text-gray-200" onclick="this.parentElement.parentElement.remove()">✕</button>
            </div>
        `;
        document.body.appendChild(toast);
        setTimeout(() => {
            if (toast.parentNode) {
                toast.style.opacity = "0";
                toast.style.transform = "translateX(100%)";
                setTimeout(() => toast.remove(), 300);
            }
        }, 3000);
    };

    const getStatusColor = (isActive: boolean) => {
        return isActive
            ? "bg-green-100 text-green-800"
            : "bg-red-100 text-red-800";
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    return (
        <div>
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    <div className="flex">
                        <div className="py-1">
                            <FontAwesomeIcon
                                icon={faExclamationTriangle}
                                className="h-6 w-6 text-red-500 mr-4"
                            />
                        </div>
                        <div>
                            <p className="font-bold">Error</p>
                            <p className="text-sm">{error}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                        Categories ({categories.length})
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">
                        Manage product categories for your store
                    </p>
                </div>
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
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Created
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {categories.map((category) => (
                                <tr
                                    key={category.id}
                                    className="hover:bg-gray-50"
                                >
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div>
                                            <div className="text-sm font-medium text-gray-900">
                                                {category.name}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                ID: {category.id.slice(0, 8)}...
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-900 max-w-xs">
                                            <p className="line-clamp-2">
                                                {category.description ||
                                                    "No description provided"}
                                            </p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            <span className="font-medium">
                                                {category._count?.products || 0}
                                            </span>{" "}
                                            products
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span
                                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full items-center ${getStatusColor(
                                                category.isActive
                                            )}`}
                                        >
                                            <FontAwesomeIcon
                                                icon={category.isActive ? faCheckCircle : faTimesCircle}
                                                className="w-3 h-3 mr-1"
                                            />
                                            {category.isActive
                                                ? "Active"
                                                : "Inactive"}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {formatDate(category.createdAt)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                        <button
                                            onClick={() =>
                                                handleEditCategory(category)
                                            }
                                            className="text-blue-600 hover:text-blue-900 disabled:opacity-50"
                                            disabled={loading}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDeleteCategory(
                                                    category.id
                                                )
                                            }
                                            className={`hover:text-red-900 disabled:opacity-50 ${
                                                (category._count?.products ||
                                                    0) > 0
                                                    ? "text-gray-400 cursor-not-allowed"
                                                    : "text-red-600"
                                            }`}
                                            disabled={
                                                loading ||
                                                (category._count?.products ||
                                                    0) > 0
                                            }
                                            title={
                                                (category._count?.products ||
                                                    0) > 0
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
                        <div className="bg-gray-100 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                            <FontAwesomeIcon
                                icon={faFolder}
                                className="w-12 h-12 text-gray-400"
                            />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            No categories found
                        </h3>
                        <p className="text-gray-500 mb-6">
                            Create your first category to organize your
                            products.
                        </p>
                        <Button
                            text="Create Category"
                            type="primary"
                            onClick={handleCreateCategory}
                            disabled={loading}
                        />
                    </div>
                )}
            </div>

            {/* Create/Edit Modal */}
            {showCreateForm && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                    <div className="relative top-10 mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white">
                        <form onSubmit={handleSubmitForm} className="mt-3">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">
                                {editingCategory
                                    ? "Edit Category"
                                    : "Create New Category"}
                            </h3>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Name *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                name: e.target.value,
                                            })
                                        }
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Category name"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Description
                                    </label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                description: e.target.value,
                                            })
                                        }
                                        rows={3}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Category description"
                                    />
                                </div>

                                <div>
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={formData.isActive}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    isActive: e.target.checked,
                                                })
                                            }
                                            className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        />
                                        <span className="text-sm text-gray-700">
                                            Active
                                        </span>
                                    </label>
                                    <p className="text-xs text-gray-500 mt-1">
                                        Inactive categories won't be shown to
                                        customers
                                    </p>
                                </div>
                            </div>

                            <div className="flex space-x-2 mt-6">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowCreateForm(false);
                                        setError("");
                                    }}
                                    className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 disabled:opacity-50"
                                    disabled={loading}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                                    disabled={loading}
                                >
                                    {loading
                                        ? "Saving..."
                                        : editingCategory
                                        ? "Update"
                                        : "Create"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Category Stats */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg shadow p-4">
                    <div className="text-sm font-medium text-gray-500">
                        Total Categories
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                        {categories.length}
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow p-4">
                    <div className="text-sm font-medium text-gray-500">
                        Active Categories
                    </div>
                    <div className="text-2xl font-bold text-green-600">
                        {categories.filter((c) => c.isActive).length}
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow p-4">
                    <div className="text-sm font-medium text-gray-500">
                        Total Products
                    </div>
                    <div className="text-2xl font-bold text-blue-600">
                        {categories.reduce(
                            (total, c) => total + (c._count?.products || 0),
                            0
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
