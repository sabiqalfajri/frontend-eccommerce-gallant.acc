import { Skeleton } from "@/components/ui/skeleton"

export const OrderSkeleton = () => {
    return (
        <div className="flex flex-col gap-4">
            {Array.from({ length: 2 }).map((_, i) => (
                <div 
                key={i}
                className="flex flex-col gap-3 border border-gray-300 py-3 px-3.5 rounded-md">
                    <div className="flex flex-wrap justify-between items-center border-b border-gray-200 pb-3">
                        <div className="flex flex-col gap-1">
                            <Skeleton className="h-4 w-20 bg-gray-300" />
                            <Skeleton className="h-4 w-36 bg-gray-300" />
                        </div>
                        <Skeleton className="h-7 w-7 bg-gray-300" />
                    </div>
                    <div className="flex flex-col gap-2 pb-3 border-b border-gray-200">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <div key={i} className="flex flex-wrap gap-4">
                                <Skeleton className="h-4 w-16 bg-gray-300" />
                                <Skeleton className="h-4 w-16 bg-gray-300" />
                            </div>
                        ))}
                    </div>  
                    <div className="grid grid-cols-[1fr_70%] md:grid-cols-[1fr_85%] gap-x-3">
                        <Skeleton className="h-20 w-full bg-gray-300" />
                        <div className="flex flex-col gap-1">
                            <div className="flex flex-col gap-1">
                                <Skeleton className="h-4 w-[85%] bg-gray-300" />
                                <Skeleton className="h-4 w-[35%] bg-gray-300" />
                            </div>
                            <Skeleton className="h-4 w-[20%] mt-1.5 bg-gray-300" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}