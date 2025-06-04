import { useState, type ChangeEvent, type ReactElement } from "react";

type Props = {
    type: string;
    name?: string;
    placeholder?: string;
    action?: {
        default: ReactElement | string;
        active: ReactElement | string;
        callback: CallableFunction;
    };
    value?: string;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    error?: boolean;
    disabled?: boolean;
    required?: boolean;
};

export default function Input({
    type,
    name,
    placeholder,
    action,
    value,
    onChange,
    error = false,
    disabled = false,
    required = false,
}: Props) {
    const [isActiveAction, setIsActiveAction] = useState(false);

    const handleClick = () => {
        if (action && !disabled) {
            action.callback();
            setIsActiveAction(!isActiveAction);
        }
    };

    return (
        <div className="relative flex justify-center items-center">
            <input
                value={value}
                name={name}
                type={type ?? "text"}
                placeholder={placeholder}
                onChange={onChange}
                disabled={disabled}
                required={required}
                className={`min-w-2xs h-8 px-4 py-4.5
                bg-[#27272A]/80 rounded-sm
                border-1 border-gray-200/60
                focus-visible:outline-none focus-visible:border-gray-200
                disabled:opacity-50 disabled:cursor-not-allowed
                ${error ? "border-red-400 bg-red-50/80" : ""}
                `}
            />
            {action ? (
                <button
                    type="button"
                    onClick={handleClick}
                    disabled={disabled}
                    className="absolute right-4 top-0
                    w-5 h-9 [&>*]:w-full
                    flex items-center cursor-pointer
                    disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {!isActiveAction ? action.default : action.active}
                </button>
            ) : null}
        </div>
    );
}
