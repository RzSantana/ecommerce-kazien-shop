// components/productCard/ProductCardReact.tsx
interface ProductCardProps {
    cover: string;
    name: string;
    price: number;
    currencyType: string;
}

export default function ProductCard({
    cover,
    name,
    price,
    currencyType
}: ProductCardProps) {
    return (
        <div className="grid grid-rows-[1.75fr_0.25fr] w-72 h-96">
            {!cover ? (
                <div className="w-full h-full bg-stone-500/20 animate-pulse" />
            ) : (
                <picture>
                    <img
                        src={cover}
                        alt={name || "Product"}
                        loading="lazy"
                        className="w-full h-full object-cover"
                    />
                </picture>
            )}
            <div className="flex flex-row justify-between items-center">
                <span>{name ?? "Nombre"}</span>
                <span>{price ?? "00.00"}{currencyType}</span>
            </div>
        </div>
    );
}
