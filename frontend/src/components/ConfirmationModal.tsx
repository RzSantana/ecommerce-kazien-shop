import { useState } from "react";
import Button from "@components/ui/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle, faTimes } from "@fortawesome/free-solid-svg-icons";

interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    type?: 'danger' | 'warning' | 'info';
    loading?: boolean;
    requiresPassword?: boolean;
    password?: string;
    onPasswordChange?: (password: string) => void;
}

export default function ConfirmationModal({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = "Confirm",
    cancelText = "Cancel",
    type = 'danger',
    loading = false,
    requiresPassword = false,
    password = "",
    onPasswordChange
}: ConfirmationModalProps) {
    if (!isOpen) return null;

    const getTypeStyles = () => {
        switch (type) {
            case 'danger':
                return {
                    iconColor: 'text-red-600',
                    bgColor: 'bg-red-100',
                    borderColor: 'border-red-300',
                    titleColor: 'text-red-900',
                    messageColor: 'text-red-700'
                };
            case 'warning':
                return {
                    iconColor: 'text-yellow-600',
                    bgColor: 'bg-yellow-100',
                    borderColor: 'border-yellow-300',
                    titleColor: 'text-yellow-900',
                    messageColor: 'text-yellow-700'
                };
            case 'info':
                return {
                    iconColor: 'text-blue-600',
                    bgColor: 'bg-blue-100',
                    borderColor: 'border-blue-300',
                    titleColor: 'text-blue-900',
                    messageColor: 'text-blue-700'
                };
            default:
                return {
                    iconColor: 'text-red-600',
                    bgColor: 'bg-red-100',
                    borderColor: 'border-red-300',
                    titleColor: 'text-red-900',
                    messageColor: 'text-red-700'
                };
        }
    };

    const styles = getTypeStyles();

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
            <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <div className="flex items-center">
                        <div className={`flex-shrink-0 w-10 h-10 rounded-full ${styles.bgColor} flex items-center justify-center mr-3`}>
                            <FontAwesomeIcon
                                icon={faExclamationTriangle}
                                className={`w-5 h-5 ${styles.iconColor}`}
                            />
                        </div>
                        <h3 className={`text-lg font-medium ${styles.titleColor}`}>
                            {title}
                        </h3>
                    </div>
                    <button
                        onClick={onClose}
                        disabled={loading}
                        className="text-gray-400 hover:text-gray-600 disabled:opacity-50"
                    >
                        <FontAwesomeIcon icon={faTimes} className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6">
                    <p className={`text-sm ${styles.messageColor} mb-4`}>
                        {message}
                    </p>

                    {requiresPassword && (
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Enter your password to confirm
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => onPasswordChange?.(e.target.value)}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter your password"
                                disabled={loading}
                            />
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex space-x-3 justify-end">
                        <Button
                            text={cancelText}
                            type="outline"
                            onClick={onClose}
                            disabled={loading}
                        />
                        <Button
                            text={loading ? "Processing..." : confirmText}
                            type={type === 'danger' ? 'destructive' : 'primary'}
                            onClick={onConfirm}
                            disabled={loading || (requiresPassword && !password)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
