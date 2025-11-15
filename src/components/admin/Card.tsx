import clsx from "clsx";

interface CardProps {
    children: React.ReactNode;
    className?: string;
    title?: string
    description?: string;
    headerContent?: React.ReactNode
}

export const CardDashboard = ({ children, title, className, headerContent, description }: CardProps) => {
    return (
        <div className={clsx(
            "bg-white rounded-md px-4 pt-4 pb-5 flex flex-col gap-3",
            className
        )}>
            {title && (
                <div className="flex flex-wrap justify-between h-10 items-center mb-2">
                    <div className="flex flex-col">
                        {title && <h1 className="font-semibold text-base">{title}</h1>}
                        {description && <p className="text-gray-600 text-[13px]">{description}</p>}
                    </div>
                    
                    {headerContent && <div>{headerContent}</div>}
                </div>
            )}
            {children}
        </div>
    )
}