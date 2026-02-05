import { RefObject, useCallback, useEffect, useRef } from "react";

interface useInfiniteScrollProps {
    onLoadMore: () => void;
    hasMore: boolean;
    isLoadingMore: boolean;
    rootRef?: RefObject<HTMLElement | null>;
    enabled?: boolean;
    rootMargin?: string;
    threshold?: number
}

export const useInfiniteScroll = ({
    onLoadMore,
    hasMore,
    isLoadingMore,
    rootRef,
    enabled,
    rootMargin = "0px 0px 200px 0px",
    threshold = 0,
}: useInfiniteScrollProps) => {
    const targetRef = useRef<HTMLDivElement>(null)
    const observerRef = useRef<IntersectionObserver | null>(null)
    const loadMoreRef = useRef(onLoadMore)

    useEffect(() => {
        loadMoreRef.current = onLoadMore
    }, [onLoadMore])

    const handleIntersection = useCallback(
        ([entry]: IntersectionObserverEntry[]) => {
            if (entry.isIntersecting && hasMore && !isLoadingMore) {
                onLoadMore()
            }
        },
        [hasMore, isLoadingMore, onLoadMore]
    )

    useEffect(() => {
        if (!enabled) return

        let raf1: number
        let raf2: number

        const setupObserver = () => {
            const target = targetRef.current
            const root = rootRef?.current ?? null

            if (!target || !hasMore) return

            observerRef.current?.disconnect()

            observerRef.current = new IntersectionObserver(handleIntersection, {
                root,
                rootMargin,
                threshold,
            })

            observerRef.current.observe(target)

            raf2 = requestAnimationFrame(() => {
                const rect = target.getBoundingClientRect()
                const rootRect = root
                    ? root.getBoundingClientRect()
                    : { top: 0, bottom: window.innerHeight }

                const isVisible =
                    rect.top <= rootRect.bottom &&
                    rect.bottom >= rootRect.top

                if (isVisible && !isLoadingMore) {
                    loadMoreRef.current()
                }
            })
        }

        // eslint-disable-next-line prefer-const
        raf1 = requestAnimationFrame(setupObserver)

        const handleVisibility = () => {
            if (document.visibilityState === "visible") {
                setupObserver()
            }
        }

        const handleResize = () => setupObserver()

        document.addEventListener("visibilitychange", handleVisibility)
        window.addEventListener("resize", handleResize)

        return () => {
            cancelAnimationFrame(raf1)
            cancelAnimationFrame(raf2)
            observerRef.current?.disconnect()
            document.removeEventListener("visibilitychange", handleVisibility)
            window.removeEventListener("resize", handleResize)
        }
    }, [
        enabled,
        hasMore,
        isLoadingMore,
        rootMargin,
        threshold,
        rootRef,
        handleIntersection
    ])

    return targetRef
}