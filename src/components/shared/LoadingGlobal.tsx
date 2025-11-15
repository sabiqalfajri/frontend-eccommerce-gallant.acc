export const LoadingGlobal = () => {
    return (
        <div>
            <div className="fixed inset-0 bg-transparent z-50 flex justify-center items-center">
                <div className="w-36 h-28 md:w-40 md:h-30 bg-black/50 rounded-md p-4 flex flex-col gap-2 justify-center items-center text-[#FFFFFF] z-20">
                    <svg
                        className="w-14 h-14"
                        viewBox="0 0 50 50"
                    >
                        {/* Spinner searah jarum jam */}
                        <circle
                            className="spinner spinner-cw opacity-50"
                            cx="25"
                            cy="25"
                            r="20"
                            fill="none"
                            stroke="#e26df2"
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
                            stroke="#e26df2"
                            strokeWidth="6"
                            strokeLinecap="round"
                        />
                    </svg>
                    <h1 className="font-semibold text-md md:text-lg">Loading...</h1>
                </div>
            </div>
        </div>
    )
}