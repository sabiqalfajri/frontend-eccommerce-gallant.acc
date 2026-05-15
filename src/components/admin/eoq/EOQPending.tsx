import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { ClipLoader } from "react-spinners"

export const EOQPending = () => {
    return (
        <div className="flex flex-col">
            <div className="grid grid-cols-2 lg:grid-cols-4 items-center gap-6 my-4">
                {Array.from({ length: 3 }).map((_, index) => (
                    <div
                        key={index}
                        className={`flex flex-wrap gap-2 items-center ${index !== length - 1 ? 'lg:border-r lg:border-gray-300' : ''}`}
                    >
                        <Skeleton className="h-11 w-11 bg-gray-300" />
                        <div className="flex flex-col gap-2">
                            <Skeleton className="h-4 w-24 bg-gray-300" />
                            <Skeleton className="h-4 w-24 bg-gray-300" />
                        </div>
                    </div>
                ))}
                <div className="flex justify-start lg:justify-end items-center">
                    <Button 
                        className="w-28 flex justify-center items-center"
                        variant="outlinePrimary"
                        disabled={true}
                    >   
                        <ClipLoader size={22} color="black" />
                    </Button>
                </div>
            </div>
            <hr className="my-4 border-gray-200" />
            <div className="my-5 overflow-hidden rounded-md">
                <div className="bg-[#F5F5F5] border-b border-gray-200 px-4 py-3">
                    <div className="grid grid-cols-[2.5fr_1fr_1fr_1fr_1.5fr_1fr] gap-4">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <Skeleton key={index} className="h-4 w-20 bg-gray-300" />
                        ))}
                    </div>
                </div>

                <div className="divide-y divide-gray-200">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div
                            key={index}
                            className="grid grid-cols-[2.5fr_1fr_1fr_1fr_1.5fr_1fr] gap-4 px-4 py-4 items-center"
                        >
                            <div className="flex flex-wrap items-center gap-3">
                                <Skeleton className="w-14 h-14 rounded-md bg-gray-300" />

                                <div className="flex flex-col gap-2">
                                    <Skeleton className="h-4 w-40 bg-gray-300" />
                                    <Skeleton className="h-4 w-24 bg-gray-300" />
                                </div>
                            </div>

                            <Skeleton className="h-4 w-16 bg-gray-300" />
                            <Skeleton className="h-4 w-14 bg-gray-300" />
                            <Skeleton className="h-4 w-12 bg-gray-300" />
                            <Skeleton className="h-4 w-28 bg-gray-300" />
                            <Skeleton className="h-6 w-20 rounded-full bg-gray-300" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}