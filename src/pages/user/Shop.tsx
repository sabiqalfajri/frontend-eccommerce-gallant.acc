import { CustomSheet } from "@/components/common/CustomSheet";
import { Section } from "@/components/common/Section";
import { Products } from "@/components/user/shop/Products"
import { SidebarUser } from "@/components/user/shop/Sidebar"
import { useProductsForUser } from "@/hooks/product/useProducts";
import { useSmoothLoading } from "@/hooks/universal/useSmoothLoading";
import { useWindowSize } from "@/hooks/universal/useWindowSize";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";

export const Shop = () => {
    const { isMobile } = useWindowSize();
    const { productsUser, isErrorProductUser, isLoadingProductsUser, isFetchedProductUser } = useProductsForUser();
    const loadingProducts = isLoadingProductsUser || !isFetchedProductUser
    const smoothLoading = useSmoothLoading(loadingProducts, 200);

    return (
        <Section>
            <div className="flex flex-col md:flex-row gap-2">
                <div className="w-[250px] hidden lg:block">
                    <SidebarUser />
                </div>
                <div className="flex-1 transition-all duration-300 p-0 md:p-4">
                    <div className="flex flex-wrap justify-between items-center pt-1 pb-3 md:pt-0">
                        {isMobile && (
                            <CustomSheet
                                side="left"
                                trigger={
                                    <button className="flex flex-wrap gap-2 items-center md:hidden cursor-pointer pl-0 pr-2 py-0.5 text-sm">
                                        <HiAdjustmentsHorizontal size={24} />
                                        <span className="text-gray-600">Filter</span>
                                    </button>
                                }
                                title="Filter"
                            >
                                <SidebarUser />
                            </CustomSheet>
                        )}
                        {!smoothLoading && (productsUser && productsUser.products.length > 0) && 
                        <p className="text-sm md:text-base text-gray-600">
                            Showing {productsUser.products.length} products
                        </p>}
                    </div>
                    <Products 
                        products={productsUser?.products}
                        isError={isErrorProductUser}
                        isLoading={smoothLoading}
                    />
                </div>
            </div>
        </Section>
    )
}