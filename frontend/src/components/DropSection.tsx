import Button from "@components/ui/Button";
import type { Drop } from "../types/drop";
import { ProductWithBadges } from "./product/ProductWithBadges";

interface DropSectionProps {
    drop: Drop;
    currencyType: string;
}

export default function DropSection({ drop, currencyType }: DropSectionProps) {
    const isComingSoon = drop.status === "COMING_SOON";
    const isEnded = drop.status === "ENDED";

    type StatusConfigKey = 'coming-soon' | 'ended' | 'active';

    // Configuración centralizada por estado
    const statusConfig = {
        "coming-soon": {
            badge: `Coming ${new Intl.DateTimeFormat("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
            }).format(new Date(drop.releaseDate))}`,
            buttonText: "NOTIFY ME",
            buttonType: "outline" as const,
        },
        ended: {
            badge: "Collection Ended",
            buttonText: "VIEW ARCHIVE",
            buttonType: "secundary" as const,
        },
        active: {
            badge: "Available Now",
            buttonText: "SHOP COLLECTION",
            buttonType: "primary" as const,
        },
    };

    const config = statusConfig[drop.status.toLowerCase().replace('_', '-') as StatusConfigKey];

    // Clases base reutilizables
    const badgeBaseClass =
        "inline-block backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium tracking-wide";
    const productBadgeClass =
        "absolute top-3 z-10 px-3 py-1 rounded-full text-xs font-medium tracking-wide text-white";

    return (
        <section className="mb-24 pt-20">
            {/* Hero Banner */}
            <div className="relative min-h-[500px] max-h-[600px] mb-12 overflow-hidden bg-gray-900">
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60"></div>

                <img
                    src={drop.bannerImage}
                    alt={`${drop.name} Collection`}
                    className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
                    <div className="text-center space-y-6 max-w-4xl px-6 flex flex-col justify-center items-center">
                        {/* Status Badge */}
                        <span
                            className={`${badgeBaseClass} bg-white/10 border border-white/20 text-white`}
                        >
                            {config.badge}
                        </span>

                        <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-[0.2em] leading-tight">
                            {drop.name}
                        </h2>

                        <p className="text-gray-200 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-light">
                            {drop.description}
                        </p>

                        <div className="pt-8">
                            <Button
                                text={config.buttonText}
                                type={config.buttonType}
                                href={`/drop/${drop.name
                                    .toString()
                                    .toLowerCase()
                                    .replace(" ", "-")}`}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Products Grid */}
            {!isComingSoon && drop.products.length > 0 && (
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-[auto_auto_auto_auto] max-xl:grid-cols-[auto_auto_auto] max-sm:grid-cols-[auto] max-md:grid-cols-[auto_auto] gap-8 justify-center">
                        {drop.products.map((product) => (
                            <ProductWithBadges
                                key={product.id}
                                product={product}
                                currencyType={currencyType}
                                badgeClass={productBadgeClass}
                            />
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
}
