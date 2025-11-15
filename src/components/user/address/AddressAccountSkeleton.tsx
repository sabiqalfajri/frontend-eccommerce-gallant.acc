import { Skeleton } from "@/components/ui/skeleton"

export const AddressAccountSkeleton = () => {
    return (
        <div className="flex flex-col gap-3 border border-gray-300 rounded-md">
            <div className="flex flex-wrap items-center gap-4 text-[15px] h-12 px-3.5 border-b border-gray-200">
                <Skeleton className="h-4 w-14 bg-gray-300" />
                <Skeleton className="h-5 w-28 bg-gray-300" />
            </div>
            <div className="grid grid-cols-[80%_1fr] px-3.5 pb-4 border-b border-gray-200">
                <div className="flex flex-col gap-2">
                    <Skeleton className="h-4 w-[8%] bg-gray-300" />
                    <Skeleton className="h-4 w-[18%] bg-gray-300" />
                    <Skeleton className="h-4 w-[85%] bg-gray-300" />
                </div>
                <div className="flex justify-end items-center px-1">
                    <Skeleton className="h-6 w-6 bg-gray-300 rounded-full" />
                </div>
            </div>
            <div className="flex flex-wrap items-center h-full gap-x-4 px-3.5 pb-3">
                <Skeleton className="h-4 w-[5%] bg-gray-300" />
                <div className="w-px h-5 bg-gray-300"></div>
                <Skeleton className="h-4 w-[5%] bg-gray-300" />
            </div>
        </div>
    )
}