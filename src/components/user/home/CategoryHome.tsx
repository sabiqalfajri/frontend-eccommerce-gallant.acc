import { Section } from "@/components/common/Section";
import { useCategories } from "@/hooks/category/useCategories";

export const CategoryHome = () => {
    const { 
        categories, 
        // isLoadingCategory, 
        // isFetchedCategory, 
        isErrorCategory 
    } = useCategories();
    // const loadingCategory = isLoadingCategory || !isFetchedCategory;
    // const smoothLoading = useSmoothLoading(loadingCategory, 300);

    if(isErrorCategory) return <div>Something went wrong</div>;
    if(categories && categories.length === 0) return <div>No Category found</div>;

    return (
        <Section>
            <div className="flex flex-col items-center gap-y-5 w-full overflow-hidden">
                <h1 className="text-[19px] md:text-2xl font-bold">Category</h1>
                <div className="w-full overflow-x-auto scrollbar-hide mt-5">
                    <div className="flex gap-x-6 md:gap-x-12 md:grid-flow-col justify-start md:justify-center max-w-full">
                        {categories?.map((cat) => (
                            <div
                            key={cat.id}
                            className="flex flex-col items-center gap-y-3 shrink-0 w-28 md:w-auto"
                            >
                                <div className="bg-gray-200 w-28 h-28 md:w-32 md:h-32 rounded-full flex items-center justify-center">
                                    <img src={cat.image} alt="" className="w-full h-full rounded-full object-cover" />
                                </div>
                                <h1 className="text-sm md:text-base font-semibold text-center">{cat.name}</h1>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Section>
    );
};
