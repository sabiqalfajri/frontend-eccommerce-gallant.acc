import { IoNotificationsOutline } from "react-icons/io5";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Archive, CreditCard, Package, TriangleAlert, X } from "lucide-react";
import { Notification } from "@/types/Notification";
import { Skeleton } from "../ui/skeleton";
import { ClipLoader } from "react-spinners";
import { useRef, useState } from "react";
import { useInfiniteScroll } from "@/hooks/universal/useInfiniteScroll";

interface NotificationDropdownProps {
    notifications: Notification[]
    undreadCount: number;
    onMarkAsRead: (id: string | number) => void
    onMarkAllAsRead: () => void
    classNameTrigger?: React.ReactNode
    fetchNextPage: () => void
    isFetchingNextPage: boolean
    hasNextPage?: boolean,
    isLoading?: boolean;
    isError?: boolean;
}

export const NotificationDropdown = ({
    notifications,
    undreadCount,
    onMarkAsRead,
    onMarkAllAsRead,
    classNameTrigger,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isLoading,
    isError
}: NotificationDropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const loadMoreRef = useInfiniteScroll({
        onLoadMore: fetchNextPage,
        hasMore: !!hasNextPage,
        isLoadingMore: isFetchingNextPage,
        rootRef: scrollRef,
        enabled: isOpen
    })

    const getNotificationIcon = (type: Notification['type']) => {
        switch (type) {
            case 'ORDER_CREATED':
                return <Package className="h-5 w-5 text-primary" />
            case 'PAYMENT_RECEIVED':
                return <CreditCard className="h-5 w-5 text-green-600" />
            case 'PAYMENT_FAILED':
                return <X className="h-5 w-5 text-red-600" />
            case 'ORDER_ACTION_REQUIRED':
                return <TriangleAlert className="h-5 w-5 text-amber-600" />
            case 'STOCK_LOW':
                return <Archive className="h-5 w-5 text-orange-600" />
        }
    }

    return (
        <DropdownMenu onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
                <button type="button" 
                className={cn(
                    'cursor-pointer relative',
                    classNameTrigger
                )}
                >
                    <IoNotificationsOutline size={24} />
                    {undreadCount > 0 && (
                        <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                            {undreadCount > 99 ? '99+' : undreadCount}
                        </span>
                    )}
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
            ref={scrollRef}
            align="end"
            className="w-80 sm:w-96 max-h-[min(80vh,500px)] overflow-y-auto p-0"
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b px-4 py-3">
                    <h3 className="font-semibold">Notifikasi</h3>
                    {isLoading ? (
                        <div>
                            <Skeleton className="h-4 w-24 md:w-26 bg-gray-300" />
                        </div>
                    ) : undreadCount > 0 && (
                        <button 
                        onClick={onMarkAllAsRead}
                        className="text-xs cursor-pointer text-gray-700 hover:underline">
                            Tandai semua telah dibaca
                        </button>
                    )}
                </div>

                {isLoading ? (
                    <div className="divide-y">
                        {Array.from({ length: 2 }).map((_, i) => (
                            <div className="flex gap-3 px-4 py-3" key={i}>
                                <Skeleton className="flex h-9 w-9 rounded-full shrink-0 items-center justify-center bg-gray-300" />
                                <div className="flex-1 min-w-0">
                                    <Skeleton className="h-4 w-32 bg-gray-300" />
                                    <Skeleton className="h-10 w-full bg-gray-300 mt-2" />
                                    <Skeleton className="h-3.5 w-20 bg-gray-300 mt-2" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : isError ? (
                    <div className="py-10 text-center text-red-500">
                        Gagal memuat notifikasi.
                    </div>
                ) : notifications.length === 0 ? (
                    <div className="py-10 text-center text-muted-foreground">
                        Belum ada notifikasi.
                    </div>
                ) : (
                    <>
                        <div className="divide-y">
                            {notifications.map((notif) => {
                                const icon = getNotificationIcon(notif.type);

                                return (
                                    <div
                                        key={notif.id}
                                        className={cn(
                                            "px-4 py-3 hover:bg-muted/50 transition-colors",
                                            !notif.isRead && "bg-blue-50/70"
                                        )}
                                    >
                                        <div className="flex gap-3">
                                            <div className="flex h-9 w-9 rounded-full shrink-0 items-center justify-center bg-[#F5F5F5]">
                                                {icon}
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium">
                                                    {notif.title}
                                                </p>
                                                <p className="mt-0.5 text-sm text-muted-foreground line-clamp-2">
                                                    {notif.message}
                                                </p>
                                                <p className="mt-1 text-xs text-muted-foreground">
                                                    {notif.createdAt}
                                                </p>
                                            </div>

                                            {!notif.isRead && (
                                                <div 
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        onMarkAsRead?.(notif.id)
                                                    }}
                                                className="w-2 h-2 rounded-full bg-green-500">
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>  

                        {hasNextPage && (
                            <div className="relative py-4">
                                <div ref={loadMoreRef} className="absolute inset-0" />

                                {isFetchingNextPage && (
                                <div className="flex justify-center">
                                    <ClipLoader size={20} color="#6B7280" />
                                </div>
                                )}
                            </div>
                        )}
                    </>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}