import { Section } from "@/components/common/Section"

export const BestSellers = () => {
    return (
        <Section>
            <div className="flex flex-col gap-y-3">
                <h1 className="text-2xl font-bold text-center">Best Sellers</h1>
            </div>
            {/* <CarousalProducts 
                title="Best Sellers"
                errorTitle="No products found"
                data={newArrivals}
                isLoading={isLoadingNewArrivals}
                isFetched={isFetchedNewArrivals}
                isError={isErrorNewArrivals}
            /> */}
        </Section>
    )
}