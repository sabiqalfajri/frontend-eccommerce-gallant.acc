import { CarousalProducts } from "@/components/common/CarousalProducts";
import { Section } from "@/components/common/Section"
import { useBestSeller } from "@/hooks/product/useBestSellerProduct"
import { CarousalProductSkeleton } from "./CarousalProductSkeleton";
import { useWindowSize } from "@/hooks/universal/useWindowSize";
import { useSmoothLoading } from "@/hooks/universal/useSmoothLoading";

export const BestSellers = () => {
    const {
        bestSeller,
        isLoadingBestSeller,
        isFetchedBestSeller,
        isErrorBestSeller
    } = useBestSeller();
    const { isMobile } = useWindowSize();
    const loading = isLoadingBestSeller || !isFetchedBestSeller;
    const skeletonLength = isMobile ? 2 : 5
    const smoothLoading = useSmoothLoading(loading, 200);

    if(isErrorBestSeller) return <div>Something went wrong</div>;
    if(bestSeller && bestSeller.length === 0) return <div>No products found</div>;

    return (
        <Section>
            {smoothLoading ? (
                <CarousalProductSkeleton length={skeletonLength} title="Produk Terlaris" />
            ) : bestSeller && (
                <CarousalProducts 
                    title="Produk Terlaris"
                    errorTitle="No products found"
                    data={bestSeller}
                    isError={isErrorBestSeller}
                />
            )}
        </Section>
    )
}