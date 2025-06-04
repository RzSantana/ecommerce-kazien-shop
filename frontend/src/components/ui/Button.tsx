import { type MouseEventHandler, type ReactElement } from "react";

type Props = {
    id?: string;
    icon?: ReactElement | string;
    text: string;
    type:
        | "primary"
        | "secundary"
        | "destructive"
        | "outline"
        | "ghost"
        | "link";
    onClick?: MouseEventHandler;
    href?: string;
    disabled?: boolean;
};

const buttonStyles = {
    primary: "bg-(--color-primary) hover:bg-[#FF3131]/70 disabled:bg-gray-400",
    secundary:
        "bg-[#F4F4F5] text-black hover:bg-[#F4F4F5]/70 disabled:bg-gray-300",
    outline:
        "border-1 border-gray-200/60 hover:border-transparent hover:bg-stone-800 disabled:border-gray-300 disabled:hover:bg-transparent",
    destructive:
        "bg-[#7F1D1D] text-white hover:bg-[#7F1D1D]/70 disabled:bg-gray-400",
    ghost: "hover:bg-stone-800 disabled:hover:bg-transparent",
    link: "hover:underline hover:underline-offset-4 disabled:hover:no-underline",
};

export default function Button({
    id,
    icon,
    text,
    type,
    onClick,
    href,
    disabled = false,
}: Props) {
    const baseClasses = `
        px-3 py-2 rounded-sm font-semibold
        h-10
        flex flex-row justify-center items-center gap-1
        cursor-pointer
        overflow-visible
        [&>*]:h-full [&>*]:w-4
        disabled:cursor-not-allowed disabled:opacity-50
        ${buttonStyles[type]}
    `;

    return (
        <>
            {type !== "link" && !href ? (
                <button
                    id={id}
                    onClick={onClick}
                    disabled={disabled}
                    className={baseClasses}
                >
                    {icon} {text}
                </button>
            ) : (
                <a
                    href={disabled ? undefined : href}
                    className={`${baseClasses} ${
                        disabled ? "pointer-events-none" : ""
                    }`}
                    onClick={disabled ? (e) => e.preventDefault() : undefined}
                >
                    {icon} {text}
                </a>
            )}
        </>
    );
}
