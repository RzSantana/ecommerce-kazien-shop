import {
    type FormEvent,
    type FormEventHandler,
    type MouseEventHandler,
    type ReactElement,
} from "react";

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
};

const buttonStyles = {
    primary: "bg-(--color-primary) hover:bg-[#FF3131]/70",
    secundary: "bg-[#F4F4F5] text-black hover:bg-[#F4F4F5]/70",
    outline:
        "border-1 border-gray-200/60 hover:border-transparent hover:bg-stone-800",
    destructive: "bg-[#7F1D1D] text-white hover:bg-[#7F1D1D]/70",
    ghost: "hover:bg-stone-800",
    link: "hover:underline hover:underline-offset-4",
};

export default function Button({ id, icon, text, type, onClick, href }: Props) {
    return (
        <>
            {type !== "link"  && !href? (
                <button
                    id={id}
                    onClick={onClick}
                    className={`
                    px-3 py-2 rounded-sm font-semibold
                    h-10
                    flex flex-row justify-center items-center gap-1
                    cursor-pointer
                    overflow-visible
                    [&>*]:h-full [&>*]:w-4
                    ${buttonStyles[type]}`}
                >
                    {icon} {text}
                </button>
            ) : (
                <a
                    href={href}
                    className={`
                    px-3 py-2 rounded-sm font-semibold
                    h-10
                    flex flex-row justify-center items-center gap-1
                    cursor-pointer
                    overflow-visible
                    [&>*]:h-full [&>*]:w-4
                    ${buttonStyles[type]}`}
                >
                    {icon} {text}
                </a>
            )}
        </>
    );
}
