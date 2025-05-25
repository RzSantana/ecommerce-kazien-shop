import {
    use,
    useState,
    type ChangeEvent,
    type MouseEventHandler,
    type ReactElement,
} from "react";

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
    disable?: boolean;
};

export default function Input({
    type,
    name,
    placeholder,
    action,
    value,
}: Props) {
    const [isActiveAction, setIsActiveAction] = useState(false);

    const handleClick = () => {
        action?.callback();
        setIsActiveAction(!isActiveAction);
    };

    return (
        <div className="relative flex justify-center items-center">
            <input
                value={value}
                name={name}
                type={type ?? "text"}
                placeholder={placeholder}
                className="min-w-2xs h-8 px-4 py-4.5
                bg-[#27272A]/80 rounded-sm
                border-1 border-gray-200/60
                focus-visible:outline-none focus-visible:border-gray-200"
            ></input>
            {action ? (
                <button
                    type="button"
                    onClick={handleClick}
                    className="absolute right-4 top-0
                    w-5 h-9 [&>*]:w-full
                    flex items-center cursor-pointer"
                >
                    {!isActiveAction ? action.default : action.active}
                </button>
            ) : null}
        </div>
    );
}
