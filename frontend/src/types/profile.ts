
export interface ProfileData {
    id: string;
    name: string;
    email: string;
    role: string;
    createdAt: string;
    updatedAt: string;
}

export interface UpdateProfileData {
    name?: string;
    email?: string;
}

export interface ChangePasswordData {
    currentPassword: string;
    newPassword: string;
}

export interface AccountTypeInfo {
    isLocal: boolean;
    type: 'local' | 'oauth';
}
