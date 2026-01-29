import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface SalesChartProps {
    weeklySales: { day: string; total: number }[]
    isLoading?: boolean
}

const dayMap: Record<string, string> = {
    Mon: "Senin",
    Tue: "Selasa",
    Wed: "Rabu",
    Thu: "Kamis",
    Fri: "Jum'at",
    Sat: "Sabtu",
    Sun: "Minggu",
};

export const SalesChart = ({
    weeklySales,
    isLoading
}: SalesChartProps) => {
    const formattedData = weeklySales.map(item => ({
        name: dayMap[item.day] ?? item.day,
        uv: item.total
    }));

    const customTooltip = ({ active, payload, label }: any) => {
        if(active && payload && payload.length) {
            return (
                <div className="bg-white p-2 border rounded shadow">
                    <p className="font-medium">{label}</p>
                    <p>Rp{payload[0].value.toLocaleString("id-ID")}</p>
                </div>
            )
        }
        return null
    }

    return (
        <div className="text-sm" style={{ width: '100%', height: 315 }}>
            {isLoading ? (
                <div className="flex justify-center items-center py-4 h-full">
                    <span className="animate-spin w-5 h-5 border-2 border-t-transparent border-gray-400 rounded-full mr-2"></span>
                    Loading data...
                </div>
            ) : (
                <ResponsiveContainer style={{ overflow: "hidden" }}>
                    <AreaChart
                    data={formattedData}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 8,
                    }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" tick={{ dy: 10 }} />
                        <YAxis />
                        <Tooltip content={customTooltip} />
                        <Area type="monotone" dataKey="uv" stroke="#8B1454" fill="#EEC8D5" />
                    </AreaChart>
                </ResponsiveContainer>
            )}
        </div>
    )
}