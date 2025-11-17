import { CardDashboard } from "@/components/admin/Card"
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { LuUsers } from "react-icons/lu";
import { OverviewCard } from "@/components/admin/home/OverviewCard";
import { useOverview } from "@/hooks/overview/useOverview";
import { useToken } from "@/hooks/universal/useToken";
import { useNavigate } from "react-router-dom";
import { TopCategoryPie } from "@/components/admin/home/TopCategoryPie";
import { SalesChart } from "@/components/admin/home/SalesChart";
import { IoWalletOutline } from "react-icons/io5";

export const HomeDashboard = () => {
    const { token } = useToken();
    const { overview, isLoadingOverview } = useOverview(token!);
    const navigate = useNavigate();
    const overviewMenu = [
        { 
            icon: <IoWalletOutline size={23} /> , 
            title: 'Total Sales', 
            description: 'This month', 
            data: `Rp${overview?.revenue.total.toLocaleString('id-ID')}`,
            growth: overview?.revenue.growth
        },
        { 
            icon: <HiOutlineShoppingBag size={23} /> , 
            title: 'Total Order', 
            description: 'This month', 
            data: overview?.orders.total,
            growth: overview?.orders.growth
        },
        { 
            icon: <LuUsers size={23} /> , 
            title: 'Total Customers', 
            description: 'Active Users', 
            data: overview?.customers.total,
            growth: overview?.customers.growth
        },
    ]

    return (
        <div className="flex flex-col gap-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-6">
                {overviewMenu.map((item) => (
                    <OverviewCard 
                      icon={item.icon}
                      title={item.title}
                      description={item.description}
                      value={item.data}
                      growth={item.growth}
                      isLoading={isLoadingOverview}
                    />
                ))}
                
                <CardDashboard title="Sales Perfomance" className="md:col-span-2">
                    <SalesChart />
                </CardDashboard>
                <CardDashboard title="Top Categories">
                    <div className="flex justify-center items-center">
                        <TopCategoryPie />
                    </div>
                </CardDashboard>
            </div>
            <CardDashboard title="Recent Order" headerContent={
                <button 
                type="button" 
                className="cursor-pointer text-sm font-semibold hover:text-primary transform transition-all duration-200"
                onClick={() => navigate('/dashboard/orders')}
                >
                    See more
                </button>
            }>
                <div className="w-full h-20">
                        
                </div>
            </CardDashboard>
        </div>
    )
}