import { Skeleton } from "../ui/skeleton"

export const CardProductSkeleton = ({ length = 4 }: { length?: number }) => {
    return (
        Array.from({ length }).map((_, index) => (
            <div key={index} className="flex flex-col">
                <Skeleton className="h-44 w-full bg-gray-300" />
                <div className="mt-1 flex flex-col gap-2">
                    <Skeleton className="h-4 w-[80%] bg-gray-300" />
                    <Skeleton className="h-4 w-[50%] bg-gray-300" />
                </div>
            </div>
        ))
    )
}