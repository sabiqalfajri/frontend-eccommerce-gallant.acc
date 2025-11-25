import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Skeleton } from "@/components/ui/skeleton"
import { ClipLoader } from "react-spinners"

export const CartSkeleton = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-5">
            <div className="flex flex-col p-0 md:p-3">
                <h1 className="font-semibold text-[19px] md:text-2xl">Shopping Cart</h1>
                <div className="flex flex-col gap-3 mt-4">
                    <div className="flex flex-wrap px-0 md:px-2 justify-start items-center pb-2.5 border-b border-gray-200 gap-3">
                        <div className="flex flex-wrap items-center gap-x-2.5">
                            <Checkbox disabled className="w-[1.20rem] h-[1.20rem]" />
                        </div>
                        <Skeleton className="w-28 h-4 rounded-md bg-gray-300" />
                    </div>
                    <div className="px-0 md:px-2 flex flex-col gap-4">
                        {Array.from({ length: 3 }).map((_, index) => (
                            <div key={index} className="grid grid-cols-[auto_minmax(0,1fr)] md:grid-cols-[1fr_4fr] gap-x-2 md:gap-x-0">
                                <div className="flex flex-wrap items-center gap-3">
                                    <Checkbox disabled className="w-[1.20rem] h-[1.20rem]" />
                                    <Skeleton className="w-24 h-20 rounded-md bg-gray-300" />
                                </div>
                                <div className="flex flex-col">
                                    <div className="flex flex-nowrap justify-between gap-4">
                                        <Skeleton className="w-full h-4 rounded-md bg-gray-300" />
                                        <Skeleton className="w-20 h-4 rounded-md bg-gray-300" />
                                    </div>
                                    <div className="flex justify-between mt-2.5">
                                        <Skeleton className="w-20 h-4 rounded-md bg-gray-300" />
                                        <Skeleton className="w-24 h-8 rounded-md bg-gray-300" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="hidden md:flex flex-col h-fit border border-gray-200 rounded-md p-3 pb-4">
                <h1 className="font-semibold text-2xl">Summary</h1>
                <div className="flex flex-col gap-2 text-sm pb-3 border-b border-gray-200 mt-4">
                    <div className="flex flex-wrap items-center justify-between">
                        <Skeleton className="w-24 h-4 rounded-md bg-gray-300" />
                        <Skeleton className="w-20 h-4 rounded-md bg-gray-300" />
                    </div>
                    <div className="flex flex-wrap items-center justify-between">
                        <Skeleton className="w-24 h-4 rounded-md bg-gray-300" />
                        <Skeleton className="w-14 h-4 rounded-md bg-gray-300" />
                    </div>
                </div>
                <div className="flex flex-wrap items-center justify-between mt-3">
                    <Skeleton className="w-20 h-4 rounded-md bg-gray-300" />
                    <Skeleton className="w-24 h-4 rounded-md bg-gray-300" />
                </div>
                <Button className="mt-3" variant="primary">
                    <ClipLoader size={20} color="white" />
                </Button>
            </div>
        </div>
    )
}