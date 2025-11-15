import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import { useCategories } from "@/hooks/category/useCategories"
import { SliderPrice } from "./SliderPrice";
import { useSmoothLoading } from "@/hooks/universal/useSmoothLoading";
import { useFilter } from "@/context/FilterContext";

export const SidebarUser = () => {
    const { categories, isLoadingCategory, isErrorCategory, isFetchedCategory } = useCategories();
    const { selectedCategories, setSelectedCategories } = useFilter();
    const loadingCategory = isLoadingCategory || !isFetchedCategory
    const smoothLoading = useSmoothLoading(loadingCategory, 300);

    if(isErrorCategory) return <div>Something went wrong</div>;
    if(isFetchedCategory && categories?.length === 0) return <div>No categories found</div>;

    const handleCategoryChange = (id: string) => {
        const updated = selectedCategories.includes(id) 
        ? selectedCategories.filter(catId => catId !== id) : [...selectedCategories, id];
        setSelectedCategories(updated);
    }

    return (
        <div className="pb-0 md:pb-4 mt-2 border-r border-gray-100 flex flex-col min-w-max sticky top-[5.8rem] h-screen lg:h-[80vh] overflow-y-auto sidebar">
            <div className="hidden md:block bg-[#F1F4F7] mb-2 px-4 py-2">
                <h2 className="text-base font-garamond">Filter Options</h2>
            </div>
            <div className="flex flex-col px-4 mt-2">
                <h1 className="font-semibold mb-2.5">Category</h1>
                <div className="flex flex-col gap-2">
                    {smoothLoading ? (
                        Array.from({ length: 5 }).map((_, index) => (
                            <div key={index} className="flex items-center w-full justify-between mt-1">
                                <Skeleton className="h-4 w-[130px] bg-gray-300" />
                                <Skeleton className="h-4 w-4 bg-gray-300 rounded-sm" />
                            </div>
                        ))
                    ) : (
                        categories?.map((cat) => (
                            <div key={cat.id} className="flex flex-wrap justify-between items-center text-[15px]">
                                <p>{cat.name}</p>
                                <Checkbox 
                                className="cursor-pointer"
                                checked={selectedCategories.includes(cat.id)} 
                                onCheckedChange={() => handleCategoryChange(cat.id)}
                                />
                            </div>
                        ))
                    )}
                </div>
                <h1 className="font-semibold mt-3 mb-2.5">Price</h1>
                {smoothLoading ? (
                    <div className="flex flex-col gap-2">
                        <Skeleton className="h-4 w-[40%] bg-gray-300 rounded-sm" />
                        <Skeleton className="h-4 w-full bg-gray-300 rounded-sm" />
                    </div>
                ) : (
                    <SliderPrice />
                )}
            </div>
        </div>
    )
}