import { ImgHTMLAttributes, useState } from "react"

interface ImageWithPlaceholderProps extends ImgHTMLAttributes<HTMLImageElement> {
    placeholderSrc?: string;
    wrapperClassName?: string;
    imageClassName?: string;
    imagePlaceholderClassName?: string
}

export const ImageWithPlaceholder = ({
    src,
    alt,
    placeholderSrc = '/images/placeholder-image.svg',
    wrapperClassName,
    imageClassName,
    imagePlaceholderClassName,
    ...props
}: ImageWithPlaceholderProps) => {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <div className={`relative overflow-hidden ${wrapperClassName}`}>
            {!isLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <img
                        src={placeholderSrc}
                        alt="Placeholder"
                        className={`${imagePlaceholderClassName} transition-opacity duration-300 ${isLoaded ? "opacity-0" : "opacity-100"}`}
                    />
                </div>
            )}

            <img 
                src={src}
                alt={alt} 
                className={`${imageClassName} w-full h-full object-cover transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                onLoad={() => setIsLoaded(true)}
                {...props}
            />
        </div>
    )
}