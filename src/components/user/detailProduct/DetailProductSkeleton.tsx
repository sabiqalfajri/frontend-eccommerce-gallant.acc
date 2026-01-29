import { Skeleton } from "@/components/ui/skeleton"

export const DetailProductSkeleton = () => {
    return (
        <div className="flex flex-col w-full">
            <div className="flex flex-col lg:flex-row items-start gap-4 lg:gap-10 w-full">
                <div className="flex-1 w-full">
                    <div className="grid grid-cols-1 gap-3 w-full">
                        <Skeleton className="h-[35vh] md:h-[40vh] w-full bg-gray-300" />
                        <div className="grid grid-cols-4 gap-3">
                            {Array.from({ length: 4 }).map((_, index) => (
                                <Skeleton key={index} className="h-20 w-full bg-gray-300" />
                            ))}
                        </div>
                    </div>
                </div>
                <div className="flex-1 w-full">
                    <div className="flex flex-col gap-1">
                        <Skeleton className="h-5 w-[30%] bg-gray-300" />
                        <div className="flex flex-col gap-2 mt-3 border-b border-gray-200 pb-3">
                            <Skeleton className="h-4 w-[80%] bg-gray-300" />
                            <Skeleton className="h-4 w-[20%] bg-gray-300" />
                        </div>
                        <div className="flex flex-col gap-2 mt-3">
                            <Skeleton className="h-4 w-full bg-gray-300" />
                            <Skeleton className="h-20 w-full bg-gray-300" />
                        </div>
                        <div className="flex flex-col gap-2 mt-3">
                            <Skeleton className="h-4 w-full bg-gray-300" />
                            <Skeleton className="h-4 w-[40%] bg-gray-300" />
                            <div className="flex flex-wrap gap-x-3 mt-3">
                                <Skeleton className="h-10 w-28 bg-gray-300" />
                                <Skeleton className="h-10 w-40 bg-gray-300" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-12">
                <div className="border-b border-gray-200 pb-3">
                    <div className="grid grid-cols-2 gap-4 w-[60%] mx-auto">
                        <Skeleton className="h-4 w-full bg-gray-300" />
                        <Skeleton className="h-4 w-full bg-gray-300" />
                    </div>
                </div>
                <div className="mt-6">
                    <Skeleton className="h-20 w-full bg-gray-300" />      
                </div>
            </div>
        </div>
    )
}