import { useState } from "react";
import Button from "@components/ui/Button";
import { API_CONFIG } from "src/config/api";

interface User {
    id: string;
    email: string;
    name: string;
    role: string;
    createdAt: string;
    updatedAt: string;
}

interface AdminUsersManagerProps {
    users: User[];
    currentUserId?: string;
}

export default function AdminUsersManager({ users: initialUsers, currentUserId }: AdminUsersManagerProps) {
    const [users, setUsers] = useState<User[]>(initialUsers);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const updateUserRole = async (userId: string, newRole: string) => {
        if (!confirm(`Are you sure you want to change this user's role to ${newRole}?`)) return;

        setLoading(true);
        try {
            const response = await fetch(`${API_CONFIG.BASE_URL}/api/admin/users/${userId}/role`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-User-ID': currentUserId || '' // Usar ID real del usuario
                },
                body: JSON.stringify({ role: newRole })
            });

            if (response.ok) {
                const data = await response.json();
                setUsers(users.map(user =>
                    user.id === userId
                        ? { ...user, role: newRole }
                        : user
                ));
                setError("");
            } else {
                throw new Error('Failed to update user role');
            }
        } catch (e) {
            setError("Error updating user role");
        } finally {
            setLoading(false);
        }
    };

    const deleteUser = async (userId: string) => {
        if (!confirm("Are you sure you want to delete this user? This action cannot be undone.")) return;

        setLoading(true);
        try {
            const response = await fetch(`${API_CONFIG.BASE_URL}/api/admin/users/${userId}`, {
                method: 'DELETE',
                headers: {
                    'X-User-ID': currentUserId || '' // Usar ID real del usuario
                }
            });

            if (response.ok) {
                setUsers(users.filter(u => u.id !== userId));
                setError("");
            } else {
                throw new Error('Failed to delete user');
            }
        } catch (e) {
            setError("Error deleting user");
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString();
    };

    const getRoleBadgeColor = (role: string) => {
        switch (role) {
            case 'admin': return 'bg-red-100 text-red-800';
            case 'user': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
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
                    Users ({users.length})
                </h2>
                <div className="text-sm text-gray-600">
                    Manage user accounts and permissions
                </div>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    User
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Role
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Joined
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Last Updated
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {users.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div>
                                            <div className="text-sm font-medium text-gray-900">
                                                {user.name}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {user.email}
                                            </div>
                                            <div className="text-xs text-gray-400">
                                                ID: {user.id.slice(0, 8)}...
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full capitalize ${getRoleBadgeColor(user.role)}`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {formatDate(user.createdAt)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {formatDate(user.updatedAt)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex justify-end space-x-2">
                                            {user.role === 'user' ? (
                                                <button
                                                    onClick={() => updateUserRole(user.id, 'admin')}
                                                    className="text-blue-600 hover:text-blue-900"
                                                    disabled={loading}
                                                >
                                                    Make Admin
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => updateUserRole(user.id, 'user')}
                                                    className="text-orange-600 hover:text-orange-900"
                                                    disabled={loading}
                                                >
                                                    Remove Admin
                                                </button>
                                            )}
                                            <button
                                                onClick={() => deleteUser(user.id)}
                                                className="text-red-600 hover:text-red-900"
                                                disabled={loading}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {users.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-gray-500">
                            No users found.
                        </div>
                    </div>
                )}
            </div>

            {/* User Stats */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg shadow p-4">
                    <div className="text-sm font-medium text-gray-500">Total Users</div>
                    <div className="text-2xl font-bold text-gray-900">{users.length}</div>
                </div>
                <div className="bg-white rounded-lg shadow p-4">
                    <div className="text-sm font-medium text-gray-500">Administrators</div>
                    <div className="text-2xl font-bold text-red-600">
                        {users.filter(u => u.role === 'admin').length}
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow p-4">
                    <div className="text-sm font-medium text-gray-500">Regular Users</div>
                    <div className="text-2xl font-bold text-green-600">
                        {users.filter(u => u.role === 'user').length}
                    </div>
                </div>
            </div>
        </div>
    );
}
