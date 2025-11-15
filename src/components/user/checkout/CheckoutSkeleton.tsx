import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { SiGooglemaps } from "react-icons/si"
import { ClipLoader } from "react-spinners"

export const CheckoutSkeleton = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-5">
            <div className="flex flex-col p-3">
                <h1 className="font-semibold text-2xl">Checkout</h1>
                <div className="grid grid-cols-[5%_95%] items-center mt-3 border-b border-gray-200 pb-3 text-sm md:text-[15px] gap-1 md:gap-0">
                    <SiGooglemaps size={23} className="text-primary" />
                    <div className="flex flex-wrap justify-between items-center">
                        <div className="flex flex-col gap-1.5">
                            <Skeleton className="w-24 h-4 rounded-md bg-gray-300" />
                            <Skeleton className="w-60 h-4 rounded-md bg-gray-300" />
                        </div>
                        <Skeleton className="w-20 h-6 rounded-md bg-gray-300" />
                    </div>
                </div>
                <div className="flex flex-col gap-4 mt-4">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <div
                        key={index}
                        className="grid grid-cols-[auto_minmax(0,1fr)] md:grid-cols-[15%_85%] gap-x-2 md:gap-x-1 px-0 md:px-3">
                            <Skeleton className="w-24 h-20 rounded-md bg-gray-300" />
                            <div className="flex flex-col">
                                <div className="flex flex-nowrap justify-between gap-4">
                                    <Skeleton className="w-[80%] h-4 rounded-md bg-gray-300" />
                                    <Skeleton className="w-20 h-4 rounded-md bg-gray-300" />
                                </div>
                                <Skeleton className="w-20 h-4 rounded-md bg-gray-300 mt-2" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="hidden md:flex flex-col h-fit border border-gray-200 rounded-md p-3 pb-4">
                <h1 className="font-semibold text-2xl">Payment</h1>
                <div className="flex flex-col gap-2 text-sm pb-3 border-b border-gray-200 mt-4">
                    <div className="flex flex-wrap justify-between items-center">
                        <div className="flex flex-nowrap items-center gap-x-3.5">
                            <Skeleton className="w-8 h-8 rounded-md bg-gray-300 mt-2" />
                            <Skeleton className="w-28 h-4 rounded-md bg-gray-300 mt-2" />
                        </div>
                        <Skeleton className="w-5 h-5 rounded-full bg-gray-300 mt-2" />
                    </div>
                </div>
                <div className="flex flex-col mt-3 gap-1.5 border-b border-gray-200 pb-3.5">
                    <h1 className="font-semibold mb-1">Shopping Summary</h1>
                    <div className="flex flex-wrap items-center justify-between text-sm">
                        <Skeleton className="w-28 h-4 rounded-md bg-gray-300" />
                        <Skeleton className="w-20 h-4 rounded-md bg-gray-300" />
                    </div>
                    <div className="flex flex-wrap items-center justify-between text-sm mt-1">
                        <Skeleton className="w-20 h-4 rounded-md bg-gray-300" />
                        <Skeleton className="w-16 h-4 rounded-md bg-gray-300" />
                    </div>
                    <div className="flex flex-wrap items-center justify-between text-sm mt-1">
                        <Skeleton className="w-20 h-4 rounded-md bg-gray-300" />
                        <Skeleton className="w-16 h-4 rounded-md bg-gray-300" />
                    </div>
                </div>
                <div className="flex flex-wrap items-center justify-between text-sm mt-3">
                    <Skeleton className="w-20 h-4 rounded-md bg-gray-300" />
                    <Skeleton className="w-20 h-4 rounded-md bg-gray-300" />
                </div>
                <Button className="mt-3" variant="primary">
                    <ClipLoader size={20} color="white" />
                </Button>
            </div>
        </div>
    )
}