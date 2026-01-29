import { CardDashboard } from "@/components/admin/Card"
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { LuUsers } from "react-icons/lu";
import { OverviewCard } from "@/components/admin/home/OverviewCard";
import { useOverview } from "@/hooks/overview/useOverview";
import { useToken } from "@/hooks/universal/useToken";
import { NavLink } from "react-router-dom";
import { TopCategoryPie } from "@/components/admin/home/TopCategoryPie";
import { SalesChart } from "@/components/admin/home/SalesChart";
import { IoWalletOutline } from "react-icons/io5";
import { RecentOrders } from "@/components/admin/home/RecentOrders";
import { useRecentOrdersAdmin } from "@/hooks/transaction/useRecentOrdersAdmin";

export const HomeDashboard = () => {
    const { token } = useToken();
    const { overview, isLoadingOverview, isFetchedOverview } = useOverview(token!);
    const { 
        recentOrders, 
        isLoadingRecentOrders, 
        isFetchedRecentOrders
    } = useRecentOrdersAdmin(token!);
    const isLoadingRecent = isLoadingRecentOrders || !isFetchedRecentOrders
    const isLoading = isLoadingOverview || !isFetchedOverview

    const overviewMenu = [
        { 
            icon: <IoWalletOutline size={23} /> , 
            title: 'Total Pendapatan', 
            description: 'Bulan ini', 
            data: `Rp${overview?.revenue.total.toLocaleString('id-ID')}`,
            growth: overview?.revenue.growth
        },
        { 
            icon: <HiOutlineShoppingBag size={23} /> , 
            title: 'Total Pesanan', 
            description: 'Bulan ini', 
            data: overview?.orders.total,
            growth: overview?.orders.growth
        },
        { 
            icon: <LuUsers size={23} /> , 
            title: 'Total Pelanggan', 
            description: 'Pelanggan aktif', 
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
                      isLoading={isLoading}
                    />
                ))}
                
                <CardDashboard title="Performa Penjualan" className="md:col-span-2">
                    <SalesChart 
                        weeklySales={overview?.weeklySales ?? []}
                        isLoading={isLoading}
                    />
                </CardDashboard>
                <CardDashboard title="Kategori Populer">
                    <div className="flex justify-center items-center">
                        <TopCategoryPie 
                            topCategories={overview?.topCategories ?? []}
                            isLoading={isLoading}
                        />
                    </div>
                </CardDashboard>
            </div>
            <CardDashboard title="Pesanan Terbaru" className="md:col-span-2" 
            headerContent={
                <NavLink
                to={'/dashboard/orders'}
                className="cursor-pointer text-sm text-gray-500 font-semibold hover:text-primary transform transition-all duration-200"
                >
                    Lihat semua
                </NavLink>
            }>
                <RecentOrders recentOrders={recentOrders} isLoading={isLoadingRecent} />
            </CardDashboard>
        </div>
    )
}