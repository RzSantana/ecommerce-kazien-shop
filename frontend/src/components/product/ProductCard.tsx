import { nameToSlug } from "src/utils/slug";

interface ProductCardProps {
    id?: string;
    key?: string;
    cover: string;
    name: string;
    price: number;
    currencyType: string;
}
export default function ProductCard({
    id,
    key,
    cover,
    name,
    price,
    currencyType,
}: ProductCardProps) {
    const content = (
        <div key={key} className="grid grid-rows-[1.75fr_0.25fr] w-72 h-96">
            {!cover ? (
                <div className="w-full h-full bg-stone-500/20 animate-pulse" />
            ) : (
                <picture>
                    <img
                        src={cover}
                        alt={name || "Product"}
                        loading="lazy"
                        className="w-full h-full aspect-2/1 object-cover select-none"
                    />
                </picture>
            )}
            <div className="flex flex-row justify-between items-center">
                <span>{name ?? "Nombre"}</span>
                <span>
                    {price ?? "00.00"}
                    {currencyType}
                </span>
            </div>
        </div>
    );

    // Si tiene nombre, hacer clickeable usando slug
    if (name) {
        return (
            <a
                href={`/product/${nameToSlug(name)}`}
                className="block hover:opacity-80 transition-opacity cursor-pointer"
            >
                {content}
            </a>
        );
    }

    return content;
}
