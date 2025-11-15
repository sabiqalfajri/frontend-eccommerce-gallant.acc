import { TabsContent } from "@radix-ui/react-tabs";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs"
import { useEffect, useRef, useState } from "react";
import { useWindowSize } from "@/hooks/universal/useWindowSize";

type TabItem = {
    value: string;
    label: string;
    content: React.ReactNode
}

interface CustomTabsProps {
    defaultValue: string;
    tabs: TabItem[];
    className?: string;
    listClassName?: string;
    contentClassName?: string;
    triggerClassName?: string;
    onValueChange?: (value: string) => void
}

export const CustomTabs = ({
    defaultValue,
    tabs,
    className,
    listClassName,
    contentClassName,
    triggerClassName,
    onValueChange
}: CustomTabsProps) => {
    const [activeValue, setActiveValue] = useState(defaultValue);
    const [indicatorStyle, setIndicatorStyle] = useState<{ width: number, left: number }>({ width: 0, left: 0 });
    const listRef = useRef<HTMLDivElement>(null);
    const { isMobile } = useWindowSize();

    useEffect(() => {
        const activeEl = listRef.current?.querySelector(`[data-state="active"]`) as HTMLElement | null
        if(activeEl) {
            const { offsetWidth, offsetLeft } = activeEl
            setIndicatorStyle({ width: offsetWidth, left: offsetLeft })
        }
    }, [activeValue, tabs, isMobile])

    const handleChange = (value: string) => {
        setActiveValue(value)
        onValueChange?.(value)
    }

    return (
        <Tabs
            defaultValue={defaultValue}
            onValueChange={handleChange}
            className={`relative ${className}`}
        >
            <div className="relative">
                <TabsList ref={listRef} className={`flex gap-2 ${listClassName}`}>
                    {tabs.map((tab) => (
                        <TabsTrigger 
                            key={tab.value}
                            value={tab.value}
                            // className="px-3 py-1.5 text-sm font-medium data-[state=active]:bg-primary data-[state=active]:text-white transition-all"
                            className={`${triggerClassName}`}

                        >
                            {tab.label}
                        </TabsTrigger>
                    ))}
                </TabsList>
                <div 
                className="absolute bottom-0 h-0.5 bg-primary rounded-full transition-all duration-300" 
                    style={{
                        width: `${indicatorStyle.width}px`,
                        transform: `translateX(${indicatorStyle.left}px)`
                    }}
                />
            </div>

            {tabs.map((tab) => (
                <TabsContent 
                    key={tab.value}
                    value={tab.value}
                    className={`mt-4 ${contentClassName}`}
                >
                    {tab.content}
                </TabsContent>
            ))}
        </Tabs>
    )
}