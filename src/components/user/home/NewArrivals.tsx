import { useNewArrivals } from "@/hooks/product/useNewArrivals"
import { Section } from "@/components/common/Section";
import { CarousalProducts } from "@/components/common/CarousalProducts";

export const NewArrivals = () => {
    const { 
        newArrivals, 
        isLoadingNewArrivals, 
        isFetchedNewArrivals, 
        isErrorNewArrivals 
    } = useNewArrivals();

    if(isErrorNewArrivals) return <div>Something went wrong</div>;
    if(newArrivals && newArrivals.length === 0) return <div>No products found</div>;

    return (
        <Section>
            <CarousalProducts 
                title="New Arrivals"
                errorTitle="No products found"
                data={newArrivals}
                isLoading={isLoadingNewArrivals}
                isFetched={isFetchedNewArrivals}
                isError={isErrorNewArrivals}
            />
            {/* <div className="flex flex-col gap-y-3 w-full">
                <h1 className="text-2xl text-center font-bold">New Arrivals</h1>
                {smoothLoading ? (
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-5">
                        <CardProductSkeleton length={skeletonLength} />
                    </div>
                ) : (
                    <div className="relative w-full mt-3">
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
                            {newArrivals?.map((arrival) => (
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
            </div> */}
        </Section>
    )
}