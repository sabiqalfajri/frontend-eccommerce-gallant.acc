import { Skeleton } from "@/components/ui/skeleton"

export const OrderDetailDashboardSkeleton = () => {
    return (
        <div className="flex flex-col gap-5">
            <div className="flex flex-wrap items-center gap-3">
                <Skeleton className="h-7 w-7 bg-gray-300" />
                <Skeleton className="h-4 w-26 bg-gray-300" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-[62%_1fr] gap-5">
                <div className="flex flex-col bg-white rounded-md py-3 px-3.5 h-fit">
                    {/* mapping */}
                    {Array.from({ length: 2 }).map((_, i) => (
                        <div key={i} className="flex flex-col gap-3 py-3.5">
                            <div className="grid grid-cols-[0.3fr_1fr] gap-2">
                                <Skeleton className="h-20 w-full bg-gray-300" />
                                <div className="flex flex-col gap-1">
                                    <Skeleton className="h-4 w-full bg-gray-300" />
                                    <Skeleton className="h-4 w-[55%] bg-gray-300" />
                                    <Skeleton className="h-4 w-[20%] bg-gray-300 mt-1" />
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <Skeleton className="h-6 w-24 bg-gray-300" />
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex flex-col gap-3 bg-white rounded-md py-3 px-3.5">
                    <div>
                        <Skeleton className="h-4 w-28 bg-gray-300 mb-4 mt-2.5" />
                        <div className="flex flex-col gap-1 mt-2.5 text-sm">
                            <Skeleton className="h-4 w-[95%] bg-gray-300" />
                            <Skeleton className="h-4 w-[95%] bg-gray-300" />
                            <Skeleton className="h-4 w-[35%] bg-gray-300" />
                            <Skeleton className="h-4 w-[25%] bg-gray-300" />
                        </div>
                    </div>
                    <div>
                        <Skeleton className="h-4 w-28 bg-gray-300 mb-4 mt-3" />
                        <div className="flex flex-col gap-1 mt-2.5 text-sm">
                            <div className="flex flex-wrap justify-between items-center">
                                <Skeleton className="h-4 w-[65%] bg-gray-300" />
                                <Skeleton className="h-4 w-[8%] bg-gray-300" />
                            </div>
                            <div className="flex flex-wrap justify-between items-center">
                                <Skeleton className="h-4 w-[65%] bg-gray-300" />
                                <Skeleton className="h-4 w-[8%] bg-gray-300" />
                            </div>
                            <div className="flex flex-wrap justify-between items-center">
                                <Skeleton className="h-4 w-[65%] bg-gray-300" />
                                <Skeleton className="h-4 w-[8%] bg-gray-300" />
                            </div>
                            <div className="bg-gray-300 w-full h-px my-2"></div>
                            <div className="flex flex-wrap justify-between items-center">
                                <Skeleton className="h-4 w-[15%] bg-gray-300" />
                                <Skeleton className="h-4 w-[15%] bg-gray-300" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}