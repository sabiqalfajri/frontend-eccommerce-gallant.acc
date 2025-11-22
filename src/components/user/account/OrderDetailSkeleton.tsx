import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { ClipLoader } from "react-spinners"

export const OrderDetailSkeleton = () => {
    return (
        <div className="flex flex-col gap-5">
            <div className="flex flex-wrap items-center gap-3">
                <Skeleton className="h-7 w-7 bg-gray-300" />
                <Skeleton className="h-4 w-26 bg-gray-300" />
            </div>
            <div className="flex flex-wrap items-center justify-around gap-x-3 border border-gray-200 py-4">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="flex flex-col items-center gap-2">
                        <Skeleton className="h-10 w-10 rounded-full bg-gray-300" />
                        <div className="flex flex-col items-center gap-0.5">
                            <Skeleton className="h-4 w-20 bg-gray-300" />
                            <Skeleton className="h-4 w-10 bg-gray-300" />
                        </div>
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-[62%_1fr] gap-5">
                <div className="flex flex-col border border-gray-200 rounded-md py-3 px-3.5 h-fit">
                    {/* mapping */}
                    <div className="flex flex-col gap-3 py-3.5">
                        <div className="grid grid-cols-[20%_1fr] gap-2">
                            <Skeleton className="h-20 w-[90%] bg-gray-300" />
                            <div className="flex flex-col gap-1">
                                <Skeleton className="h-4 w-full bg-gray-300" />
                                <Skeleton className="h-4 w-[55%] bg-gray-300" />
                                <Skeleton className="h-4 w-[20%] bg-gray-300 mt-1" />
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <Button variant="primary" className="text-white w-24">
                                <ClipLoader size={22} color="white" />
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-3 border border-gray-200 rounded-md py-3 px-3.5">
                    <div>
                        <h1 className="font-semibold text-[15px]">Shipping Address</h1>
                        <div className="flex flex-col gap-1 mt-2.5 text-sm">
                            <Skeleton className="h-4 w-[95%] bg-gray-300" />
                            <Skeleton className="h-4 w-[95%] bg-gray-300" />
                            <Skeleton className="h-4 w-[35%] bg-gray-300" />
                            <Skeleton className="h-4 w-[25%] bg-gray-300" />
                        </div>
                    </div>
                    <div>
                        <h1 className="font-semibold text-[15px]">Payment Details</h1>
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