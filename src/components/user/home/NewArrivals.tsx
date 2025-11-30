import { useNewArrivals } from "@/hooks/product/useNewArrivals"
import { Section } from "@/components/common/Section";
import { CarousalProducts } from "@/components/common/CarousalProducts";
import { useWindowSize } from "@/hooks/universal/useWindowSize";
import { useSmoothLoading } from "@/hooks/universal/useSmoothLoading";
import { CarousalProductSkeleton } from "./CarousalProductSkeleton";

export const NewArrivals = () => {
    const { 
        newArrivals, 
        isLoadingNewArrivals, 
        isFetchedNewArrivals, 
        isErrorNewArrivals 
    } = useNewArrivals();
    const { isMobile } = useWindowSize();
    const loading = isLoadingNewArrivals || !isFetchedNewArrivals;
    const skeletonLength = isMobile ? 2 : 5
    const smoothLoading = useSmoothLoading(loading, 200);

    if(isErrorNewArrivals) return <div>Something went wrong</div>;
    if(newArrivals && newArrivals.length === 0) return <div>No products found</div>;

    return (
        <Section>
            {smoothLoading ? (
                <CarousalProductSkeleton length={skeletonLength} title="New Arrivals" />
            ) : newArrivals && (
                <CarousalProducts 
                    title="New Arrivals"
                    errorTitle="No products found"
                    data={newArrivals}
                    isError={isErrorNewArrivals}
                />
            )}
        </Section>
    )
}