import { useEffect, useState } from "react";

export const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    
    useEffect(() => {
        const handleResize = () => {
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
        });
        };
    
        window.addEventListener("resize", handleResize);
    
        return () => {
        window.removeEventListener("resize", handleResize);
        };
    }, []);

    const isDesktop = windowSize.width >= 992; 
    const isTablet = windowSize.width >= 768 && windowSize.width < 992;
    const isMobile = windowSize.width < 768;
    
    return { ...windowSize, isDesktop, isTablet, isMobile };
}