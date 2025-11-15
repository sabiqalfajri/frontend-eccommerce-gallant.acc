import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer } from "recharts";

export const TopCategoryPie = () => {
  const data = [
    { name: "Group A", value: 400, fill: "#A41662" },
    { name: "Group B", value: 300, fill: "#00C49F" },
    { name: "Group C", value: 300, fill: "#FFBB28" },
    { name: "Group D", value: 200, fill: "#F5DEE0" },
  ];

  return (
    <div className="flex flex-col justify-center items-center text-sm" style={{ height: 305, width: '90%' }}>
        <ResponsiveContainer width="100%" height="100%" style={{ overflow: "hidden" }}>
            <PieChart>
                <Pie
                    data={data}
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
    </div>
  );
};
