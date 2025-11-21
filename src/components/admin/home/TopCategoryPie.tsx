import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface TopCategoryPieProps {
    topCategories: { name: string; count: number }[]
    isLoading?: boolean
}

export const TopCategoryPie = ({
    topCategories,
    isLoading
}: TopCategoryPieProps) => {
    const COLORS = [
        "#A41662",
        "#00C49F",
        "#FFBB28",
        "#8884d8",
    ];

    const formattedData = topCategories.map((cat, i) => ({
        name: cat.name,
        value: cat.count,
        fill: COLORS[i % COLORS.length]
    }));

    return (
        <div className="flex flex-col justify-center items-center text-sm" style={{ height: 305, width: '90%' }}>
            {isLoading ? (
                <div className="flex justify-center items-center py-4 h-full">
                    <span className="animate-spin w-5 h-5 border-2 border-t-transparent border-gray-400 rounded-full mr-2"></span>
                    Loading data...
                </div>
            ) : (
                <ResponsiveContainer width="100%" height="100%" style={{ overflow: "hidden" }}>
                    <PieChart>
                        <Pie
                            data={formattedData}
                            dataKey="value"
                            nameKey="name"
                            innerRadius="70%"
                            outerRadius="90%"
                            paddingAngle={5}
                            cornerRadius="50%"
                            isAnimationActive={true}
                        />
                        <Tooltip />
                        <Legend
                        verticalAlign="bottom"
                        align="left"
                        content={({ payload }) => (
                            <ul className="mt-2 text-left">
                                {payload?.map((entry, index) => (
                                    <li key={`item-${index}`} 
                                    className="text-sm text-black flex justify-between items-center py-0.5"
                                    >
                                        <div className="flex items-center justify-center gap-x-2">
                                            <span className={`w-3 h-3 rounded-[20%]`} 
                                            style={{ 
                                                width: 12, height: 12, borderRadius: "20%", background: entry.color 
                                            }} />
                                            {entry.value}
                                        </div>
                                        <p style={{ color: entry.color }}>{entry.payload?.value}</p>
                                    </li>
                                ))}
                            </ul>
                        )}
                />
                    </PieChart>
                </ResponsiveContainer>
            )}
        </div>
    );
};
