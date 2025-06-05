// Slider.tsx - Versión final mejorada
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import type { Product } from "../../types/product";
import ProductCard from "@components/product/ProductCard";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface SliderProps {
    products: Product[];
    title?: string;
    autoplay?: boolean;
}

export default function Slider({
    products,
    title = "TOP SALES",
    autoplay = true,
}: SliderProps) {
    return (
        <div className="max-w-7xl mx-auto px-6">
            <Swiper
                slidesPerView={1}
                spaceBetween={24}
                navigation={true}
                pagination={{
                    clickable: true,
                    bulletClass: "swiper-pagination-bullet custom-bullet mini",
                    bulletActiveClass:
                        "swiper-pagination-bullet-active custom-bullet-active",
                }}
                autoplay={
                    autoplay
                        ? {
                              delay: 4000,
                              disableOnInteraction: false,
                              pauseOnMouseEnter: true,
                          }
                        : false
                }
                modules={[Navigation, Pagination, Autoplay]}
                breakpoints={{
                    480: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 24,
                    },
                    1024: {
                        slidesPerView: 4,
                        spaceBetween: 24,
                    },
                    1280: {
                        slidesPerView: 4,
                        spaceBetween: 32,
                    },
                }}
                className="product-slider-enhanced"
            >
                {products.map((product) => (
                    <SwiperSlide key={product.id}>
                        <ProductCard
                            cover={product.cover}
                            name={product.name}
                            currencyType={product.currencyType}
                            price={product.price}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
