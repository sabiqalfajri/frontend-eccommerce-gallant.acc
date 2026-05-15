import { IoIosArrowBack } from "react-icons/io"

export const EOQGuide = () => {
    return (
        <div className="flex flex-col">
            <div className="flex flex-wrap items-center gap-x-3">
                <button 
                type="button"
                className="flex justify-center items-center rounded-md w-8 h-8 border border-gray-300 cursor-pointer hover:bg-gray-200 transform transition-all duration-200"
                // onClick={() => navigate(-1)}
                >
                    <IoIosArrowBack size={22} />
                </button>
                <h1 className="font-semibold">
                    Pelajari EOQ
                </h1>
            </div>
        </div>
    )
}