import { useState, useEffect } from "react";
import Button from "@components/ui/Button";
import Input from "@components/ui/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUser,
    faLock,
    faTrash,
    faEye,
    faEyeSlash,
    faEdit,
    faSave,
    faTimes,
} from "@fortawesome/free-solid-svg-icons";
import type {
    AccountTypeInfo,
    ChangePasswordData,
    ProfileData,
    UpdateProfileData,
} from "src/types/profile";
import { profileService } from "src/services/profileService";
import ConfirmationModal from "@components/ConfirmationModal";
import { signOut } from "auth-astro/client";

interface ProfileManagerProps {
    initialProfile: ProfileData;
    currentUserId: string;
}

type ActiveTab = "personal" | "security" | "account";

export default function ProfileManager({
    initialProfile,
    currentUserId,
}: ProfileManagerProps) {
    const [profile, setProfile] = useState<ProfileData>(initialProfile);
    const [accountType, setAccountType] = useState<AccountTypeInfo | null>(
        null
    );
    const [activeTab, setActiveTab] = useState<ActiveTab>("personal");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // Estados para edición de perfil
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [profileFormData, setProfileFormData] = useState({
        name: profile.name,
        email: profile.email,
    });

    // Estados para cambio de contraseña
    const [passwordFormData, setPasswordFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [showPasswords, setShowPasswords] = useState({
        current: false,
        new: false,
        confirm: false,
    });

    // Estados para eliminación de cuenta
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [deletePassword, setDeletePassword] = useState("");

    // Cargar tipo de cuenta al montar
    useEffect(() => {
        loadAccountType();
    }, []);

    const loadAccountType = async () => {
        try {
            const accountInfo = await profileService.getAccountType(
                currentUserId
            );
            setAccountType(accountInfo);
        } catch (error) {
            console.error("Error loading account type:", error);
        }
    };

    const showToast = (message: string, type: "success" | "error") => {
        if (type === "success") {
            setSuccess(message);
            setError("");
        } else {
            setError(message);
            setSuccess("");
        }

        // Limpiar después de 5 segundos
        setTimeout(() => {
            setSuccess("");
            setError("");
        }, 5000);
    };

    // ===== GESTIÓN DE PERFIL =====
    const handleProfileEdit = () => {
        setIsEditingProfile(true);
        setProfileFormData({
            name: profile.name,
            email: profile.email,
        });
        setError("");
        setSuccess("");
    };

    const handleProfileCancel = () => {
        setIsEditingProfile(false);
        setProfileFormData({
            name: profile.name,
            email: profile.email,
        });
    };

    const handleProfileSave = async () => {
        setLoading(true);
        setError("");

        try {
            const updateData: UpdateProfileData = {};

            if (profileFormData.name.trim() !== profile.name) {
                updateData.name = profileFormData.name.trim();
            }

            if (profileFormData.email.trim() !== profile.email) {
                updateData.email = profileFormData.email.trim();
            }

            // Si no hay cambios
            if (Object.keys(updateData).length === 0) {
                setIsEditingProfile(false);
                return;
            }

            // Validar
            const validationErrors =
                profileService.validateProfileData(updateData);
            if (validationErrors.length > 0) {
                setError(validationErrors.join(", "));
                return;
            }

            const updatedProfile = await profileService.updateProfile(
                updateData,
                currentUserId
            );

            if (updatedProfile) {
                setProfile(updatedProfile);
                setIsEditingProfile(false);
                showToast("Profile updated successfully!", "success");
            }
        } catch (error) {
            const errorMessage =
                error instanceof Error
                    ? error.message
                    : "Failed to update profile";
            showToast(errorMessage, "error");
        } finally {
            setLoading(false);
        }
    };

    // ===== CAMBIO DE CONTRASEÑA =====
    const handlePasswordChange = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            // Validar confirmación de contraseña
            if (
                passwordFormData.newPassword !==
                passwordFormData.confirmPassword
            ) {
                setError("New passwords do not match");
                return;
            }

            const changeData: ChangePasswordData = {
                currentPassword: passwordFormData.currentPassword,
                newPassword: passwordFormData.newPassword,
            };

            // Validar
            const validationErrors =
                profileService.validatePasswordData(changeData);
            if (validationErrors.length > 0) {
                setError(validationErrors.join(", "));
                return;
            }

            await profileService.changePassword(changeData, currentUserId);

            // Limpiar formulario
            setPasswordFormData({
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
            });

            showToast("Password changed successfully!", "success");
        } catch (error) {
            const errorMessage =
                error instanceof Error
                    ? error.message
                    : "Failed to change password";
            showToast(errorMessage, "error");
        } finally {
            setLoading(false);
        }
    };

    // ===== ELIMINACIÓN DE CUENTA =====
    const handleDeleteAccount = async () => {
        if (!deletePassword) {
            setError("Password is required to delete account");
            return;
        }

        setLoading(true);
        try {
            await profileService.deleteAccount(deletePassword, currentUserId);
            showToast(
                "Account deleted successfully. Redirecting...",
                "success"
            );
            signOut();
            // Redirigir después de 2 segundos
            setTimeout(() => {
                window.location.href = "/";
            }, 1000);
        } catch (error) {
            const errorMessage =
                error instanceof Error
                    ? error.message
                    : "Failed to delete account";
            showToast(errorMessage, "error");
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };
    return (
        <div className="max-w-4xl mx-auto [&_input]:bg-transparent [&_input]:w-full [&_input]:h-[50px]">
            {/* Notificaciones */}
            {error && (
                <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    <div className="flex">
                        <div className="py-1">
                            <svg
                                className="fill-current h-6 w-6 text-red-500 mr-4"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                            >
                                <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                            </svg>
                        </div>
                        <div>
                            <p className="font-bold">Error</p>
                            <p className="text-sm">{error}</p>
                        </div>
                    </div>
                </div>
            )}

            {success && (
                <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                    <div className="flex">
                        <div className="py-1">
                            <svg
                                className="fill-current h-6 w-6 text-green-500 mr-4"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                            >
                                <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                            </svg>
                        </div>
                        <div>
                            <p className="font-bold">Success</p>
                            <p className="text-sm">{success}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Navegación por pestañas */}
            <div className="bg-white rounded-lg shadow mb-6">
                <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-8 px-6">
                        <button
                            onClick={() => setActiveTab("personal")}
                            className={`py-4 px-1 border-b-2 font-medium text-sm flex flex-row w-fit ${
                                activeTab === "personal"
                                    ? "border-blue-500 text-blue-600"
                                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                            }`}
                        >
                            <FontAwesomeIcon
                                icon={faUser}
                                className="w-4 h-4 mr-2"
                            />
                            Personal Information
                        </button>
                        {accountType?.isLocal && (
                            <button
                                onClick={() => setActiveTab("security")}
                                className={`py-4 px-1 border-b-2 font-medium text-sm flex flex-row w-fit${
                                    activeTab === "security"
                                        ? "border-blue-500 text-blue-600"
                                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                }`}
                            >
                                <FontAwesomeIcon
                                    icon={faLock}
                                    className="w-4 h-4 mr-2"
                                />
                                Security
                            </button>
                        )}
                        <button
                            onClick={() => setActiveTab("account")}
                            className={`py-4 px-1 border-b-2 font-medium text-sm flex flex-row w-fit ${
                                activeTab === "account"
                                    ? "border-blue-500 text-blue-600"
                                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                            }`}
                        >
                            <FontAwesomeIcon
                                icon={faTrash}
                                className="w-4 h-4 mr-2"
                            />
                            Account Settings
                        </button>
                    </nav>
                </div>

                <div className="p-6">
                    {/* Pestaña de Información Personal */}
                    {activeTab === "personal" && (
                        <div>
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900">
                                        Personal Information
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        Update your personal details and email
                                        address
                                    </p>
                                </div>
                                {!isEditingProfile && (
                                    <Button
                                        text="Edit"
                                        type="primary"
                                        icon={<FontAwesomeIcon icon={faEdit} />}
                                        onClick={handleProfileEdit}
                                        disabled={loading}
                                    />
                                )}
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Full Name
                                    </label>
                                    {isEditingProfile ? (
                                        <Input
                                            type="text"
                                            value={profileFormData.name}
                                            onChange={(e) =>
                                                setProfileFormData({
                                                    ...profileFormData,
                                                    name: e.target.value,
                                                })
                                            }
                                            placeholder="Enter your full name"
                                            disabled={loading}
                                        />
                                    ) : (
                                        <div className="bg-gray-50 border border-gray-300 rounded-md px-4 py-3">
                                            {profile.name}
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Email Address
                                    </label>
                                    {isEditingProfile ? (
                                        <Input
                                            type="email"
                                            value={profileFormData.email}
                                            onChange={(e) =>
                                                setProfileFormData({
                                                    ...profileFormData,
                                                    email: e.target.value,
                                                })
                                            }
                                            placeholder="Enter your email"
                                            disabled={loading}
                                        />
                                    ) : (
                                        <div className="bg-gray-50 border border-gray-300 rounded-md px-4 py-3">
                                            {profile.email}
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Account Type
                                    </label>
                                    <div className="bg-gray-50 border border-gray-300 rounded-md px-4 py-3">
                                        <span
                                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                profile.role === "admin"
                                                    ? "bg-red-100 text-red-800"
                                                    : "bg-green-100 text-green-800"
                                            }`}
                                        >
                                            {profile.role === "admin"
                                                ? "Administrator"
                                                : "Standard User"}
                                        </span>
                                        {accountType && (
                                            <span className="ml-2 text-sm text-gray-500">
                                                (
                                                {accountType.type === "local"
                                                    ? "Local Account"
                                                    : "OAuth Account"}
                                                )
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Member Since
                                    </label>
                                    <div className="bg-gray-50 border border-gray-300 rounded-md px-4 py-3">
                                        {formatDate(profile.createdAt)}
                                    </div>
                                </div>

                                {isEditingProfile && (
                                    <div className="flex space-x-4 pt-4">
                                        <Button
                                            text="Save Changes"
                                            type="primary"
                                            icon={
                                                <FontAwesomeIcon
                                                    icon={faSave}
                                                />
                                            }
                                            onClick={handleProfileSave}
                                            disabled={loading}
                                        />
                                        <Button
                                            text="Cancel"
                                            type="outline"
                                            icon={
                                                <FontAwesomeIcon
                                                    icon={faTimes}
                                                />
                                            }
                                            onClick={handleProfileCancel}
                                            disabled={loading}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Pestaña de Seguridad */}
                    {activeTab === "security" && accountType?.isLocal && (
                        <div>
                            <div className="mb-6">
                                <h3 className="text-lg font-medium text-gray-900">
                                    Security Settings
                                </h3>
                                <p className="text-sm text-gray-500">
                                    Manage your password and security
                                    preferences
                                </p>
                            </div>

                            <form
                                onSubmit={handlePasswordChange}
                                className="space-y-4"
                            >
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Current Password
                                    </label>
                                    <Input
                                        type={
                                            showPasswords.current
                                                ? "text"
                                                : "password"
                                        }
                                        value={passwordFormData.currentPassword}
                                        onChange={(e) =>
                                            setPasswordFormData({
                                                ...passwordFormData,
                                                currentPassword: e.target.value,
                                            })
                                        }
                                        placeholder="Enter your current password"
                                        disabled={loading}
                                        action={{
                                            callback: () =>
                                                setShowPasswords({
                                                    ...showPasswords,
                                                    current:
                                                        !showPasswords.current,
                                                }),
                                            default: (
                                                <FontAwesomeIcon
                                                    icon={faEyeSlash}
                                                />
                                            ),
                                            active: (
                                                <FontAwesomeIcon icon={faEye} />
                                            ),
                                        }}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        New Password
                                    </label>
                                    <Input
                                        type={
                                            showPasswords.new
                                                ? "text"
                                                : "password"
                                        }
                                        value={passwordFormData.newPassword}
                                        onChange={(e) =>
                                            setPasswordFormData({
                                                ...passwordFormData,
                                                newPassword: e.target.value,
                                            })
                                        }
                                        placeholder="Enter your new password (min. 6 characters)"
                                        disabled={loading}
                                        action={{
                                            callback: () =>
                                                setShowPasswords({
                                                    ...showPasswords,
                                                    new: !showPasswords.new,
                                                }),
                                            default: (
                                                <FontAwesomeIcon
                                                    icon={faEyeSlash}
                                                />
                                            ),
                                            active: (
                                                <FontAwesomeIcon icon={faEye} />
                                            ),
                                        }}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Confirm New Password
                                    </label>
                                    <Input
                                        type={
                                            showPasswords.confirm
                                                ? "text"
                                                : "password"
                                        }
                                        value={passwordFormData.confirmPassword}
                                        onChange={(e) =>
                                            setPasswordFormData({
                                                ...passwordFormData,
                                                confirmPassword: e.target.value,
                                            })
                                        }
                                        placeholder="Confirm your new password"
                                        disabled={loading}
                                        action={{
                                            callback: () =>
                                                setShowPasswords({
                                                    ...showPasswords,
                                                    confirm:
                                                        !showPasswords.confirm,
                                                }),
                                            default: (
                                                <FontAwesomeIcon
                                                    icon={faEyeSlash}
                                                />
                                            ),
                                            active: (
                                                <FontAwesomeIcon icon={faEye} />
                                            ),
                                        }}
                                    />
                                </div>

                                <div className="pt-4">
                                    <Button
                                        text="Update Password"
                                        type="primary"
                                        icon={<FontAwesomeIcon icon={faLock} />}
                                        onClick={() => {}}
                                        disabled={
                                            loading ||
                                            !passwordFormData.currentPassword ||
                                            !passwordFormData.newPassword ||
                                            !passwordFormData.confirmPassword
                                        }
                                    />
                                </div>
                            </form>
                        </div>
                    )}

                    {/* Pestaña de Configuración de Cuenta */}
                    {activeTab === "account" && (
                        <div>
                            <div className="mb-6">
                                <h3 className="text-lg font-medium text-gray-900">
                                    Account Settings
                                </h3>
                                <p className="text-sm text-gray-500">
                                    Manage your account preferences and data
                                </p>
                            </div>

                            {/* Zona peligrosa */}
                            <div className="border border-red-200 rounded-lg p-6 bg-red-50">
                                <h4 className="text-lg font-medium text-red-900 mb-2">
                                    Danger Zone
                                </h4>
                                <p className="text-sm text-red-700 mb-4">
                                    Once you delete your account, there is no
                                    going back. Please be certain.
                                </p>

                                <Button
                                    text="Delete Account"
                                    type="destructive"
                                    icon={<FontAwesomeIcon icon={faTrash} />}
                                    onClick={() => setShowDeleteConfirm(true)}
                                    disabled={loading}
                                />
                            </div>

                            {/* Modal de confirmación para eliminación */}
                            <ConfirmationModal
                                isOpen={showDeleteConfirm}
                                onClose={() => {
                                    setShowDeleteConfirm(false);
                                    setDeletePassword("");
                                }}
                                onConfirm={handleDeleteAccount}
                                title="Delete Account"
                                message="This action cannot be undone. This will permanently delete your account and remove all of your data from our servers."
                                confirmText="Delete Account"
                                cancelText="Cancel"
                                type="danger"
                                loading={loading}
                                requiresPassword={true}
                                password={deletePassword}
                                onPasswordChange={setDeletePassword}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
