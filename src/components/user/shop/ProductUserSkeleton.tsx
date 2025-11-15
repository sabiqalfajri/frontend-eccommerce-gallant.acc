export const ProductUserSkeleton = () => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 sticky">
            {Array.from({ length: 12 }).map((_, index) => (
                <div key={index}>
                    
                </div>
            ))}
        </div>
    )
}