export type OrderStep = {
    label: string;
    icon: React.ReactNode;
    active?: boolean;
    date?: string;
}

interface OrderTimelineProps {
    steps: OrderStep[]
    className?: string
}

interface OrderStepProgressProps {
  steps: OrderStep[];
  className?: string;
}

export const OrderTimeline = ({
    steps,
    className
}: OrderTimelineProps) => {
    const activeIndex = steps.findIndex((s) => s.active);
    
    return (
        <div className={`md:hidden block ${className}`}>
            {steps.map((step, i) => (
                <div key={i} className="flex flex-wrap gap-3 h-[3.7rem]">
                    <div className="relative flex justify-center items-center">
                        <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center shadow-sm
                        ${i <= activeIndex ? "bg-primary text-white" : "bg-gray-200 text-gray-500"}`}
                        >
                            {step.icon}
                        </div>
                        {i !== 0 && (
                            <div
                            className={`absolute left-1/2 -translate-x-1/2 -top-1/2 h-full w-[0.15rem] -z-10
                                ${i <= activeIndex ? "bg-primary" : "bg-gray-300"}`}
                            />
                        )}
                    </div>
                    <div className="flex flex-col justify-center items-start">
                        <p className={`font-medium text-sm ${i <= activeIndex ? "text-primary font-semibold" : "text-gray-500"}`}>
                            {step.label}
                        </p>
                        {step.date && (
                            <p className="text-xs text-gray-500 mt-1">{step.date}</p>
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
}

export const OrderStepProgress = ({
    steps
}: OrderStepProgressProps) => {
    const activeIndex = steps.findIndex((s) => s.active);

    return (
        <div className={`w-full hidden md:flex items-center justify-between`}>
            {steps.map((step, i) => (
                <div key={i} className="flex-1 flex flex-col items-center">
                    <div className="flex items-center justify-center relative w-full">
                        {/* Line */}
                        {i !== 0 && (
                            <div
                            className={`absolute -left-1/2 top-1/2 -translate-y-1/2 h-[2px] w-full -z-10
                                ${i <= activeIndex ? "bg-primary" : "bg-gray-300"}`}
                            />
                        )}
                        <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 shadow-md
                        ${i <= activeIndex ? "bg-primary text-white" : "bg-gray-200 text-gray-500"}`}
                        >
                            {step.icon}
                        </div>
                    </div>
                    <div className="h-10">
                        <p
                            className={`text-sm text-center
                            ${i <= activeIndex ? "text-primary font-semibold" : "text-gray-500"}`}
                        >
                            {step.label}
                        </p>
                        <p
                            className={`text-xs text-center
                            ${i <= activeIndex ? "text-primary font-semibold" : "text-gray-500"}`}
                        >
                            {step.date}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    )
}