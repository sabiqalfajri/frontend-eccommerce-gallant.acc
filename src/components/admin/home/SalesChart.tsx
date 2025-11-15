import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export const SalesChart = () => {
    const data = [

        {
            name: 'Sunday',
            uv: 4000,
            pv: 2400,
            amt: 2400,
        },
        {
            name: 'Monday',
            uv: 3000,
            pv: 1398,
            amt: 2210,
        },
        {
            name: 'Tuesday',
            uv: 2000,
            pv: 9800,
            amt: 2290,
        },
        {
            name: 'Wednesday',
            uv: 2780,
            pv: 3908,
            amt: 2000,
        },
        {
            name: 'Thursday',
            uv: 1890,
            pv: 4800,
            amt: 2181,
        },
        {
            name: 'Friday',
            uv: 2390,
            pv: 3800,
            amt: 2500,
        },
        {
            name: 'Saturday',
            uv: 3490,
            pv: 4300,
            amt: 2100,
        },
    ];

    return (
        <div className="text-sm" style={{ width: '100%', height: 315 }}>
            <ResponsiveContainer style={{ overflow: "hidden" }}>
                <AreaChart
                data={data}
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
                    <Tooltip />
                    <Area type="monotone" dataKey="uv" stroke="#8B1454" fill="#EEC8D5" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}