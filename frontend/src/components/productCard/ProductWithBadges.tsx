import ProductCard from "./ProductCard";

export function ProductWithBadges({
    product,
    currencyType,
    badgeClass,
}: {
    product: any;
    currencyType: string;
    badgeClass: string;
}) {
    const badges = [];

    // Limited badge
    if (product.isLimited) {
        badges.push(
            <span key="limited" className={`${badgeClass} left-3 bg-black`}>
                LIMITED
            </span>
        );
    }

    // Stock badge
    if (product.stock !== undefined && product.stock < 5 && product.stock > 0) {
        badges.push(
            <span key="stock" className={`${badgeClass} right-3 bg-gray-800`}>
                {product.stock} LEFT
            </span>
        );
    }

    return (
        <div className="relative group w-72 h-96">
            {/* Render badges */}
            {badges.map((badge) => badge)}

            {/* Sold out overlay */}
            {product.stock === 0 && (
                <div className="absolute inset-0 bg-white/90 z-10 flex items-center justify-center backdrop-blur-sm">
                    <span className="bg-black text-white px-6 py-3 rounded font-semibold tracking-wide">
                        SOLD OUT
                    </span>
                </div>
            )}

            <ProductCard
                cover={product.cover}
                currencyType={currencyType}
                name={product.name}
                price={product.price}
            />
        </div>
    );
}
