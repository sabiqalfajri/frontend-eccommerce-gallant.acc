import { useRelatedProducts } from "@/hooks/product/useRelatedProducts"
import { useSmoothLoading } from "@/hooks/universal/useSmoothLoading";
import { CardProduct } from "./CardProduct";
import { CardProductSkeleton } from "./CardProductSkeleton";

export const RelatedProduct = ({ id }: { id: string }) => {
    const { relatedProducts, isLoadingRelatedProducts, isErrorRelatedProducts, isFetchedRelatedProducts } = useRelatedProducts(id);
    const loadingRelatedProduct = isLoadingRelatedProducts || !isFetchedRelatedProducts;
    const smoothLoading = useSmoothLoading(loadingRelatedProduct, 300);

    if(isErrorRelatedProducts) return <div>Something went wrong</div>;
    if(relatedProducts && relatedProducts.length === 0) return <div>No products found</div>;

    return (
        <div>
            <h1 className="font-semibold text-[25px] md:text-[29px] text-center">Related Product</h1>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 lg:gap-5 mt-6">
                {smoothLoading ? (
                    <CardProductSkeleton />
                ) : relatedProducts && (
                    relatedProducts.map((relate) => (
                        <CardProduct 
                            key={relate.id}
                            id={relate.id}
                            name={relate.name}
                            price={relate.price}
                            images={relate.images}
                        />
                    ))
                )}
            </div>
        </div>
    )
}