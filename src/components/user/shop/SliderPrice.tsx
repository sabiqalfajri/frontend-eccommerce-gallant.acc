import { Slider } from "@/components/ui/slider";
import { useFilter } from "@/context/FilterContext";
import { useEffect, useState } from "react";

const MIN = 0;
const MAX = 300000;
const STEP = 20000

export const SliderPrice = () => {
    const [range, setRange] = useState<[number, number]>([0, MAX]);
    const { startPrice, endPrice, setPriceRange } = useFilter();
    const safeStart = startPrice ?? MIN
    const safeEnd = endPrice ?? MAX

    useEffect(() => {
        setRange([safeStart, safeEnd])
    }, [startPrice, endPrice]);

    const handleChange = (value: number[]) => {
        if(value.length === 2) {
            setRange([value[0], value[1]]);
        }
    }

    const handleCommit = (value: number[]) => {
        if(value.length === 2) {
            setPriceRange(value[0], value[1])
        }
    } 

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-wrap justify-start items-center gap-2 text-sm">
                <span>Rp {range[0].toLocaleString("id-ID")}</span>
                -
                <span>Rp {range[1].toLocaleString("id-ID")}</span>
            </div>
            <Slider
                min={MIN} 
                max={MAX} 
                step={STEP} 
                value={range} 
                onValueChange={handleChange}
                onValueCommit={handleCommit}
            />
        </div>
    )
}