import { CarousalProducts } from "@/components/common/CarousalProducts";
import { Section } from "@/components/common/Section"
import { useBestSeller } from "@/hooks/product/useBestSellerProduct"

export const BestSellers = () => {
    const {
        bestSeller,
        isLoadingBestSeller,
        isFetchedBestSeller,
        isErrorBestSeller
    } = useBestSeller();

    if(isErrorBestSeller) return <div>Something went wrong</div>;
    if(bestSeller && bestSeller.length === 0) return <div>No products found</div>;

    return (
        <Section>
            <CarousalProducts 
                title="Best Sellers"
                errorTitle="No products found"
                data={bestSeller}
                isLoading={isLoadingBestSeller}
                isFetched={isFetchedBestSeller}
                isError={isErrorBestSeller}
            />
        </Section>
    )
}