// Slider.tsx - Versión final mejorada
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import type { IProduct } from "../../types/product";
import ProductCard from "@components/productCard/ProductCard";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface SliderProps {
    products: IProduct[];
    title?: string;
    autoplay?: boolean;
}

export default function Slider({
    products,
    title = "TOP VENTAS",
    autoplay = true,
}: SliderProps) {
    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                {title && (
                    <h2 className="text-4xl font-bold text-center mb-12 uppercase tracking-wider text-gray-900">
                        {title}
                    </h2>
                )}

                <Swiper
                    slidesPerView={1}
                    spaceBetween={24}
                    navigation={true}
                    pagination={{
                        clickable: true,
                        bulletClass: 'swiper-pagination-bullet custom-bullet mini',
                        bulletActiveClass: 'swiper-pagination-bullet-active custom-bullet-active',
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
                    {products.map((product, index) => (
                        <SwiperSlide key={index}>
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
        </section>
    );
}
