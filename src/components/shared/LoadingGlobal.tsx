interface LoadingGlobalProps {
    show: boolean;
    text?: string;
}

export const LoadingGlobal = ({ 
    show,
    text = 'Loading...'
}: LoadingGlobalProps) => {
    if(!show) return null;
    
    return (
        <div>
            <div className="fixed inset-0 bg-black/45 z-50 flex justify-center items-center">
                <div className="w-36 h-28 md:w-40 md:h-30 bg-white rounded-md p-4 flex flex-col gap-2 justify-center items-center z-20">
                    <svg
                        className="w-14 h-14"
                        viewBox="0 0 50 50"
                    >
                        {/* Spinner searah jarum jam */}
                        <circle
                            className="spinner spinner-cw"
                            cx="25"
                            cy="25"
                            r="20"
                            fill="none"
                            stroke="#E8A4C3"
                            strokeWidth="6"
                            strokeLinecap="round"
                        />
                        {/* Spinner berlawanan arah jarum jam */}
                        <circle
                            className="spinner spinner-ccw"
                            cx="25"
                            cy="25"
                            r="20"
                            fill="none"
                            stroke="var(--color-primary)"
                            strokeWidth="6"
                            strokeLinecap="round"
                        />
                    </svg>
                    <h1 className="font-semibold text-base md:text-lg text-black">{text}</h1>
                </div>
            </div>
        </div>
    )
}