import { Section } from "@/components/common/Section";
import { Button } from "@/components/ui/button"
import { useState } from "react";
import { GrNext, GrPrevious } from "react-icons/gr"

export const HomeBanner = () => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Section>
            <div className="w-full relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            >
                <div className="bg-gray-200 h-80">
                    {/* <img src="" alt="" /> */}
                    <p>Banner Content</p>
                </div>
                <div className="hidden md:block w-full">
                    <Button 
                    // ref={prevRef} 
                    className={`absolute top-1/2 -left-4 z-10 transform -translate-y-1/2 bg-white shadow-md w-10 h-10 rounded-full transition-all duration-300  ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-5'}`}
                    >
                        <GrPrevious size={18} color="#000" />
                    </Button>
                    <Button 
                    // ref={nextRef} 
                    className={`absolute top-1/2 -right-4 z-10 transform -translate-y-1/2 bg-white shadow-md w-10 h-10 rounded-full transition-all duration-300 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-5'}`}
                    >
                        <GrNext size={18} color="#000" />
                    </Button>
                </div>
            </div>
        </Section>
    )
}