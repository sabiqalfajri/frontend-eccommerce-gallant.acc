import { useWindowSize } from "@/hooks/universal/useWindowSize";
import { DetailProduct } from "@/types/Product"
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Thumbs } from "swiper/modules"
import type { Swiper as SwiperType } from 'swiper';
import { Button } from "@/components/ui/button";
import { GrNext, GrPrevious } from "react-icons/gr";
import { ImageWithPlaceholder } from "@/components/common/ImageWithPlaceholder";

interface DetailProductGalleryProps {
    id: string
    product: DetailProduct | undefined
}

export const DetailProductGallery = ({
    id,
    product
}: DetailProductGalleryProps) => {
    const mainSwiperRef = useRef<SwiperType | null>(null);
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const { isDesktop } = useWindowSize();
    const nextRef = useRef(null);
    const prevRef = useRef(null);

    return (
        <div className="grid grid-cols-1 gap-3 w-full">
            {/* Main Image */}
            <div className="relative h-fit">
                <Swiper
                key={id}
                onSwiper={(swiper) => (mainSwiperRef.current = swiper)}
                initialSlide={activeIndex}
                modules={[Navigation, Pagination, Thumbs]}
                pagination={isDesktop ? { clickable: true } : false}
                direction="horizontal"
                navigation={{
                    nextEl: nextRef.current,
                    prevEl: prevRef.current
                }}
                slidesPerView={1}
                thumbs={{ swiper: thumbsSwiper }}
                onBeforeInit={(swiper) => {
                    if(typeof swiper.params.navigation !== 'boolean' && swiper.params.navigation) {
                        swiper.params.navigation.prevEl = prevRef.current;
                        swiper.params.navigation.nextEl = nextRef.current;
                    }
                }}
                onSlideChange={(swiper) => {
                    setActiveIndex(swiper.activeIndex);
                }}
                className="w-full h-80 md:h-100 lg:h-80 swiper-main"
                >
                    {product?.images.map((image, index) => (
                        <SwiperSlide key={index}>
                            <ImageWithPlaceholder
                                src={image.url}
                                alt={image.id}
                                wrapperClassName="w-full h-full"
                                imageClassName="rounded-md"
                                imagePlaceholderClassName="w-[70%] h-[70%] object-contain"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
                <Button ref={prevRef} className="custom-prev absolute top-1/2 left-2 z-10 transform -translate-y-1/2 bg-black/50 w-9 h-9 rounded-full"
                variant="primary"
                >
                    <GrPrevious size={18} />
                </Button>
                <Button ref={nextRef} className="custom-next absolute top-1/2 right-2 z-10 transform -translate-y-1/2 bg-black/50 w-9 h-9 rounded-full"
                variant="primary"
                >
                    <GrNext size={18} />
                </Button>
            </div>
            {/* Thumbnail */}
            <div>
                <Swiper
                key={id}
                onSwiper={setThumbsSwiper}
                direction="horizontal"
                spaceBetween={10}
                slidesPerView={4}
                watchSlidesProgress
                className="w-full h-20"
                >
                    {product?.images.map((image, index) => (
                        <SwiperSlide key={index}>
                            <div className="lg:w-full lg:h-fit aspect-4/3 lg:aspect-auto">
                                <ImageWithPlaceholder 
                                    src={image.url}
                                    alt={image.id}
                                    wrapperClassName="w-full h-20 lg:h-20"
                                    imageClassName={`rounded-md border-2 ${activeIndex === index ? 'border-primary' : 'hover:bg-none md:hover:opacity-70 cursor-pointer'}`}
                                    imagePlaceholderClassName="w-[70%] h-[70%] object-contain"
                                    onClick={() => {
                                        setActiveIndex(index)
                                        thumbsSwiper?.slideTo(index);
                                    }}
                                />
                            </div>
                        </SwiperSlide> 
                    ))}
                </Swiper>
            </div>
        </div>
    )
}