import { Link } from "react-router-dom"
import { ImageWithPlaceholder } from "../common/ImageWithPlaceholder";

interface CardProductProps {
    id: string;
    images: { url: string }[];
    name: string;
    price: number
}

export const CardProduct = ({
    id,
    images,
    name,
    price
}: CardProductProps) => {
    return (
        <Link to={`/detail/${id}`} className="flex flex-col bg-white shadow-[0_0_5px_rgba(0,0,0,0.12)] rounded-md">
            <ImageWithPlaceholder
                src={images[0].url}
                alt={images[0].url}
                wrapperClassName="w-full h-40 md:h-48"
                imageClassName="rounded-t-md"
                imagePlaceholderClassName="w-[70%] h-[70%] object-contain"
            />
            <div className="flex flex-col py-1 px-2.5">
                <h1 className="line-clamp-2 text-sm">{name}</h1>
                <p className="font-semibold text-[15px] mt-0.5">
                    Rp{price.toLocaleString('id-ID')}
                </p>
            </div>
        </Link>
    )
}