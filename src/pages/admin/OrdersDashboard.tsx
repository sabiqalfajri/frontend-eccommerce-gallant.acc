import { CardDashboard } from "@/components/admin/Card"
import { SelectCustom } from "@/components/common/Select"
import { useState } from "react";

export const OrdersDashboard = () => {
    const [period, setPeriod] = useState("today");

    const handleFilter = () => {

    }
    const orderFilter = [
        { title: 'All', onclick: handleFilter },
        { title: 'Pending', onclick: handleFilter },
        { title: 'Processing', onclick: handleFilter },
        { title: 'Shipped', onclick: handleFilter },
        { title: 'Completed', onclick: handleFilter },
    ]

    const options = [
        { label: 'Today', value: 'today' },
        { label: 'Week', value: 'week' },
        { label: 'Month', value: 'month' },
    ]

    return (
        <div className="flex flex-col gap-y-6">
            <div className="flex flex-wrap justify-between items-center">
                <div className="flex flex-wrap gap-x-3 bg-white rounded-md pt-2 px-2 h-10">
                    {orderFilter.map((item) => (
                        <button type="button" 
                        className="cursor-pointer px-4 pb-1 border-b-3 border-primary"
                        >
                            {item.title}
                        </button>
                    ))}
                </div>
                <SelectCustom value={period} onChange={setPeriod} selectLabel="Select period" options={options} className="h-10! w-[120px]!" />
            </div>
            <CardDashboard title="Order Summary">
                <div></div>
            </CardDashboard>
        </div>
    )
}