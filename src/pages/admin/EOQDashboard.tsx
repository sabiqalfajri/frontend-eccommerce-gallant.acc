import { CardDashboard } from "@/components/admin/Card"
import { Button } from "@/components/ui/button"
import { IoBookOutline, IoWalletOutline } from "react-icons/io5";
// import { GrConfigure } from "react-icons/gr";
import { LuCalendarClock } from "react-icons/lu";
import { GoPackage } from "react-icons/go";
import { FiEdit } from "react-icons/fi";
import { useState } from "react";
import { ModalConfigure } from "@/components/admin/eoq/ModalConfigure";
import { EOQContent } from "@/components/admin/eoq/EOQContent";
import { useToken } from "@/hooks/universal/useToken";
import { useEOQConfig } from "@/hooks/eoq/useEOQConfig";
import { useEOQReport } from "@/hooks/eoq/useEOQReport";
import { EOQPending } from "@/components/admin/eoq/EOQPending";
import { useApplyEOQConfig } from "@/hooks/eoq/useApplyEOQConfig";
import { EOQConfigFormValues } from "@/schema/admin/EOQSchema";
import { Pagination } from "@/components/common/Pagination";

export const EOQDashboard = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [page, setPage] = useState(1)
    const { token } = useToken();
    const ROWS_PER_PAGE = 10

    const {
        config,
        isPendingConfig
    } = useEOQConfig(token!)
    const {
        products,
        total,
        totalPages,
        isPendingReport
    } = useEOQReport(
        token!,
        page,
        ROWS_PER_PAGE
    )
    const {
        applyConfig,
        isApplying
    } = useApplyEOQConfig(token!)

    const isConfigured = !!config;
    // const isConfigured = false;

    const configureMenu = [
        {
            icon: <IoWalletOutline size={23} />,
            title: 'Ordering Cost (S)',  
            value: config ? `Rp${config.orderingCost.toLocaleString()}` : '-',
        },
        {
            icon: <GoPackage size={23} />,
            title: 'Holding Cost (H)',  
            value: config ? `Rp${config.holdingCost.toLocaleString()}` : '-',
        },
        {
            icon: <LuCalendarClock size={23} />,
            title: 'Periode Analisis',  
            value: config ? `${config.periodMonths} Bulan Terakhir` : '-',
        },
    ]

    const handleApplyConfig = async (data: EOQConfigFormValues) => {
        await applyConfig(data)
        setIsModalOpen(false)
    }

    return (
        <div className="flex flex-col gap-6">
            <CardDashboard
                title="EOQ"
                description="Analisis Economic Order Quantity untuk rekomendasi restock produk."
                loading={isPendingConfig}
            >
                {isPendingConfig ? (
                    <EOQPending />
                ) : (
                    <>
                        <div className="grid grid-cols-2 lg:grid-cols-4 items-center gap-6 my-4">
                            {configureMenu.map((item, index) => (
                                <div
                                    key={item.title}
                                    className={`flex flex-wrap gap-2 ${index !== configureMenu.length - 1 ? 'lg:border-r lg:border-gray-300' : ''}`}
                                >
                                    <div className="bg-gray-100 flex justify-center items-center py-1 px-2.5 rounded-md h-11">
                                        {item.icon}
                                    </div>
                                    <div className="flex flex-col gap-0.5">
                                        <p className="text-gray-600 text-[13px] font-medium">{item.title}</p>
                                        <h4 className="text-base font-semibold">{item.value}</h4>
                                    </div>
                                </div>
                            ))}
                            <div className="flex justify-start lg:justify-end items-center">
                                <Button 
                                    className="w-fit flex justify-center items-center"
                                    variant="outlinePrimary"
                                    onClick={() => setIsModalOpen(true)}
                                >   
                                    <FiEdit />
                                    {!isConfigured ? 'Atur Konfigurasi' : 'Edit Konfigurasi'}
                                </Button>
                            </div>
                        </div>

                        <hr className="my-2 border-gray-200" />

                        {!isConfigured ? (
                            <div className="flex flex-col items-center justify-center gap-3 text-center my-8">
                                <img 
                                    src="/images/eoq-empty.svg" 
                                    alt="cartEmpty" 
                                    className="w-32 h-32 md:w-44 md:h-44 object-contain my-2" 
                                />
                                <h1 className="font-bold text-[18px]">
                                    EOQ Belum Dikonfigurasi
                                </h1>
                                <div className="text-gray-600 text-[13.5px]">
                                    <p>
                                        Untuk melihat perhitungan EOQ dan rekomendasi restock produk,
                                    </p>
                                    <p>Silahkan atur parameter EOQ terlebih dahulu.</p>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-2 my-3">
                                <EOQContent 
                                    data={products} 
                                    isLoading={isPendingReport} 
                                />
                                <Pagination
                                    page={page}
                                    totalPages={totalPages}
                                    totalRows={total}
                                    rowsPerPage={ROWS_PER_PAGE}
                                    onPageChange={setPage}
                                />
                            </div>
                        )}
                    </>
                )}
            </CardDashboard>
            
            <div className="bg-white rounded-md px-4 pt-4 pb-5 flex flex-col gap-3">
                <h1 className="font-semibold text-base">Apa itu EOQ?</h1>
                <div className="grid md:grid-cols-[3.5fr_0.5fr] grid-cols-1 gap-7">
                    <p className="text-gray-600 text-[13px] max-w-[650px]">
                        EOQ (Economic Order Quantity) adalah metode untuk menentukan jumlah pemesanan yang optimal dengan tujuan meminimalkan total biaya persediaan.
                    </p>
                    <div className="flex justify-center items-center">
                        <Button 
                            className="w-fit flex justify-center items-center"
                            variant="outlinePrimary"
                        >   
                            <IoBookOutline />
                            Pelajari Lebih Lanjut
                        </Button>
                    </div>
                </div>
            </div>

            <ModalConfigure
                isOpen={isModalOpen} 
                onOpenChange={setIsModalOpen}
                onConfirm={handleApplyConfig}
                isLoading={isApplying}
                initialData={config ?? undefined}
            />
        </div>
    )
}