import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { CardProductSkeleton } from "../CardProductSkeleton";

export const CarousalProductSkeleton = ({ length, title }: { length: number; title: string }) => {
    return (
        <div className="flex flex-col gap-y-2 md:gap-y-3 w-full">
            <div className="flex justify-between items-center md:block w-full">
                <h1 className="text-[19px] md:text-2xl font-bold text-center md:mb-2">
                    {title}
                </h1>

                <button 
                className="flex flex-wrap items-center gap-1 text-primary font-semibold md:hidden cursor-pointer"
                type='button'
                >
                    Lihat semua
                    <MdOutlineKeyboardArrowRight size={20} />
                </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-3 md:mt-5">
                <CardProductSkeleton length={length} />
            </div>
        </div>
    )
}