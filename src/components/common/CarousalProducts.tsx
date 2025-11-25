import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from "swiper/modules"
import { useRef } from 'react';
import { useWindowSize } from '@/hooks/universal/useWindowSize';
import { useSmoothLoading } from '@/hooks/universal/useSmoothLoading';
import { Button } from '../ui/button';
import { GrNext, GrPrevious } from 'react-icons/gr';
import { CardProductSkeleton } from '../user/CardProductSkeleton';
import { CardProduct } from '../user/CardProduct';
import { Carousal } from '@/types/Product';
import { useNavigate } from 'react-router-dom';
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

interface CarousalProductsProps {
    title: string
    data: Carousal[] | undefined
    errorTitle: string
    isLoading?: boolean;
    isFetched?: boolean
    isError: boolean
}

export const CarousalProducts = ({
    title,
    data,
    errorTitle,
    isLoading,
    isFetched,
    isError
}: CarousalProductsProps) => {
    const nextRef = useRef(null);
    const prevRef = useRef(null);
    const { isMobile } = useWindowSize();
    const loading = isLoading || !isFetched;
    const smoothLoading = useSmoothLoading(loading, 200);
    const navigate = useNavigate();

    if(isError) return <div>Something went wrong</div>;
    if(data && data.length === 0) return <div>{errorTitle}</div>;
    const skeletonLength = isMobile ? 2 : 5

    return (
        <div className="flex flex-col gap-y-2 md:gap-y-3 w-full">
            <div className="flex justify-between items-center md:block w-full">
                <h1 className="text-[19px] md:text-2xl font-bold text-center md:mb-2">
                    {title}
                </h1>

                {/* Mobile Only */}
                <button 
                className="flex flex-wrap items-center gap-1 text-primary font-semibold md:hidden cursor-pointer"
                type='button'
                onClick={() => navigate('/shop')}
                >
                    See all
                    <MdOutlineKeyboardArrowRight size={20} />
                </button>
            </div>
            {smoothLoading ? (
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-3 md:mt-5">
                    <CardProductSkeleton length={skeletonLength} />
                </div>
            ) : data && (
                <div className="relative w-full mt-1 md:mt-3">
                    <Swiper
                        modules={[Navigation]}
                        spaceBetween={16}
                        slidesPerView={2.3}
                        slidesOffsetBefore={5}
                        slidesOffsetAfter={5}
                        breakpoints={{
                            640: { slidesPerView: 2 },
                            768: { slidesPerView: 3 },
                            1024: { slidesPerView: 5 },
                        }}
                        navigation={{
                            nextEl: nextRef.current,
                            prevEl: prevRef.current
                        }}
                        onBeforeInit={(swiper) => {
                            if(typeof swiper.params.navigation !== 'boolean' && swiper.params.navigation) {
                                swiper.params.navigation.prevEl = prevRef.current;
                                swiper.params.navigation.nextEl = nextRef.current;
                            }
                        }}
                    >
                        {data.map((arrival) => (
                            <SwiperSlide key={arrival.id} className="py-4">
                                <CardProduct
                                    id={arrival.id}
                                    name={arrival.name}
                                    price={arrival.price}
                                    images={arrival.images}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    <Button
                    ref={prevRef}
                    className={`hidden md:block md:absolute top-1/2 -left-4 z-10 transform -translate-y-1/2 bg-white shadow-lg w-10 h-10 rounded-full transition-all duration-200`}
                    >
                        <GrPrevious size={18} color="#000" />
                    </Button>
                    <Button 
                    ref={nextRef}
                    className={`hidden md:block md:absolute top-1/2 -right-4 z-10 transform -translate-y-1/2 bg-white shadow-lg w-10 h-10 rounded-full transition-all duration-200`}
                    >
                        <GrNext size={18} color="#000" />
                    </Button>
                </div>
            )}
        </div>
    )
}