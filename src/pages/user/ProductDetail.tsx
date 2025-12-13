import { Section } from "@/components/common/Section";
import { DetailProductGallery } from "@/components/user/detailProduct/DetailProductGallery";
import { DetailProductInfo } from "@/components/user/detailProduct/DetailProductInfo";
import { DetailProductSkeleton } from "@/components/user/detailProduct/DetailProductSkeleton";
import { DetailProductTabs } from "@/components/user/detailProduct/DetailProductTabs";
import { RelatedProduct } from "@/components/user/RelatedProduct";
import { useProductDetail } from "@/hooks/product/useProductDetail";
import { useLockBodyScroll } from "@/hooks/universal/useLockBodyScroll";
import { useSmoothLoading } from "@/hooks/universal/useSmoothLoading";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export const ProductDetail = () => {
    const { id } = useParams()
    const { product, isFetched, isLoading } = useProductDetail(id!);

    const loadingProductDetail = isLoading || !isFetched
    const smoothLoadingDetail = useSmoothLoading(loadingProductDetail, 200);
    useLockBodyScroll(smoothLoadingDetail)

    return (
        <Section>
            <div className="flex flex-col gap-y-14 px-0 md:px-16">
                {smoothLoadingDetail ? (
                    <DetailProductSkeleton />
                ) : id && (
                    <>
                        <div className="flex flex-col md:flex-row items-start gap-4 lg:gap-10 w-full">
                            <div className="flex-1 min-w-0">
                                <DetailProductGallery id={id} product={product} />
                            </div>
                            <div className="flex-1 min-w-0 w-full">
                                <DetailProductInfo id={id} product={product} />
                            </div>
                        </div>
                        <DetailProductTabs product={product} />
                    </>
                )}
                {id && <RelatedProduct id={id} />}
            </div>
        </Section>
    )
}