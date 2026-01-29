import { Link } from "react-router-dom";
import { useWindowSize } from "@/hooks/universal/useWindowSize";
import { ProductBaseUser } from "@/types/Product";
import { ImageWithPlaceholder } from "@/components/common/ImageWithPlaceholder";
import { CardProductSkeleton } from "../CardProductSkeleton";

interface ProductsProps {
    products: ProductBaseUser[] | undefined
    // isFetched: boolean;
    isError: boolean;
    isLoading: boolean;
} 

export const Products = ({
    products,
    // isFetched,
    isError,
    isLoading
}: ProductsProps) => {
    // const { productsUser, isFetchedProductUser, isLoadingProductsUser, isErrorProductUser } = useProductsForUser();
    // const loadingProducts = isLoadingProductsUser || !isFetchedProductUser
    // const smoothLoading = useSmoothLoading(loadingProducts, 300);
    const { isMobile } = useWindowSize();

    if(isError) return <div>Something went wrong</div>;
    if(products && products.length === 0) return <div>No products found</div>;
    const skeletonLength = isMobile ? 6 : 8

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 sticky">
            {isLoading ? (
                <CardProductSkeleton length={skeletonLength} />
            ) : products && (
                products.map((product) => (
                    <Link to={`/detail/${product.id}`} key={product.id} className="flex flex-col bg-white shadow-[0_0_5px_rgba(0,0,0,0.12)] rounded-md">
                        <ImageWithPlaceholder 
                            src={product.images[0].url}
                            alt={product.images[0].url}
                            wrapperClassName="w-full h-40 md:h-48"
                            imageClassName="rounded-t-md"
                            imagePlaceholderClassName="w-[70%] h-[70%] object-contain"
                        />
                        <div className="flex flex-col py-1 px-2.5">
                            <h1 className="line-clamp-2 text-sm">{product.name}</h1>
                            <p className="font-semibold text-[15px] mt-0.5">
                                Rp{product.price.toLocaleString('id-ID')}
                            </p>
                        </div>
                    </Link>
                ))
            )}
        </div>
    )
}