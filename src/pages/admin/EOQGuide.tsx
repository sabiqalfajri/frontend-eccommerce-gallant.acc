import { CardDashboard } from "@/components/admin/Card"
import { IoIosArrowBack } from "react-icons/io"
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';
import { IoWalletOutline } from "react-icons/io5";
import { Badge } from "@/components/ui/badge";
import { GoPackage } from "react-icons/go";
import { LuCalendarClock } from "react-icons/lu";
import { IoTrendingUpSharp } from "react-icons/io5";
import { PiScalesFill } from "react-icons/pi";
import { PiSigma } from "react-icons/pi";
import { SlChart } from "react-icons/sl";
import { IoDocumentTextOutline } from "react-icons/io5";
import { LuLightbulb } from "react-icons/lu";
import { useNavigate } from "react-router-dom";


export const EOQGuide = () => {
    const navigate = useNavigate()

    const STATUS_INFO = [
        { 
            color: "bg-green-100 text-green-700 border-green-200",  
            label: "Optimal",          
            desc: "Jumlah stok masih dalam batas optimal. Stok dalam kondisi baik." 
        },
        { 
            color: "bg-yellow-100 text-yellow-700 border-yellow-200", 
            label: "Reorder",  
            desc: "Produk disarankan untuk segera restock" 
        },
        { 
            color: "bg-red-100 text-red-700 border-red-200",        
            label: "Critical",            
            desc: "Stok berada di bawah rekomendasi EOQ. Disarankan melakukan restock" 
        },
        { 
            color: "bg-blue-100 text-blue-700 border-blue-200",     
            label: "Overstock",         
            desc: "Stok produk jauh di atas jumlah optimal EOQ. Disarankan menunda restock" 
        },
        { 
            color: "bg-gray-100 text-gray-500 border-gray-200",     
            label: "Unknown",  
            desc: "Data penjualan belum cukup untuk analisis. Sistem belum dapat memberikan rekomendasi" 
        },
    ]

    const recomendation = [
        {
            icon: <IoDocumentTextOutline size={27} />,
            desc: 'Sistem membaca data penjualan produk'
        },
        {
            icon: <SlChart size={24} />,
            desc: 'Menghitung demand berdasarkan periode analisis'
        },
        {
            icon: <PiSigma size={27} />,
            desc: 'Menghitung nilai EOQ (jumlah optimal)'
        },
        {
            icon: <PiScalesFill size={27} />,
            desc: 'Membandingkan stok saat ini dengan nilai EOQ'
        },
        {
            icon: <IoTrendingUpSharp size={27} />,
            desc: 'Menentukan status dan rekomendasi restock'
        }
    ]

    const paramConfigure = [
        {
            icon: <IoWalletOutline size={22} />,
            title: 'Ordering Cost (S)',
            desc: 'Biaya yang dikeluarkan setiap kali melakukan pemesanan barang'
        },
        {
            icon: <GoPackage size={22} />,
            title: 'Holding Cost (H)',
            desc: 'Biaya pemesanan barang per unit dalam satu periode (mis. perbulan)'
        },
        {
            icon: <LuCalendarClock size={23} />,
            title: 'Periode Analisis',
            desc: 'Rentang waktu data penjualan yang digunakan untuk perhitungan EOQ.'
        },
    ]

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-start gap-x-3">
                <button 
                type="button"
                className="flex justify-center items-center rounded-md w-8 h-8 border border-gray-300 cursor-pointer hover:bg-gray-200 transform transition-all duration-200"
                onClick={() => navigate(-1)}
                >
                    <IoIosArrowBack size={22} />
                </button>
                <div className="flex flex-col gap-1">
                    <h1 className="font-semibold text-base">
                        Pelajari EOQ
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Memahami cara kerja rekomendasi restock produk berdasarkan EOQ.
                    </p>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-[3fr_1.5fr] items-start gap-5">
                <div className="flex flex-col gap-5">
                    <CardDashboard 
                        title="Apa itu EOQ?"
                    >
                        <div className="relative grid grid-cols-1 md:grid-cols-[2.5fr_1.5fr] min-h-fit md:min-h-[90px]">
                            <p className="text-sm">
                                EOQ (Economic Order Quantity) adalah metode untuk menentukan jumlah pembelian optimal agar biaya persediaan tetap efisien.
                            </p>
                            <div className="hidden md:block">
                                <img 
                                    src="/images/eoq-section.svg" 
                                    alt="eOQSection" 
                                    className="absolute -top-12 right-0 w-40 h-40 object-contain" 
                                />
                            </div>
                        </div>
                    </CardDashboard>
                    <CardDashboard 
                        title="Rumus EOQ"
                        description="EOQ dihitung menggunakan rumus berikut:"
                    >
                        <div className=" bg-[#F5F5F5] rounded-md">
                            <BlockMath math="EOQ = \sqrt{\frac{2DS}{H}}" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 mt-1 gap-2">
                            <div className="flex flex-nowrap gap-3 shadow-sm p-3 rounded-md">
                                <div className="flex items-center justify-center bg-primary w-8 h-8 shrink-0 rounded-full text-white/90 text-sm font-semibold">
                                    D
                                </div>
                                <div>
                                    <h5 className="text-[14px] font-semibold">Total Permintaan</h5>
                                    <p className="text-[13px] text-muted-foreground">(demand) selama periode analisis</p>
                                </div>
                            </div>
                            <div className="flex flex-nowrap gap-3 shadow-sm p-3 rounded-md">
                                <div className="flex items-center justify-center bg-primary w-8 h-8 shrink-0 rounded-full text-white/90 text-sm font-semibold">
                                    D
                                </div>
                                <div>
                                    <h5 className="text-[14px] font-semibold">Ordering Cost</h5>
                                    <p className="text-[13px] text-muted-foreground">(Biaya setiap kali memesan barang)</p>
                                </div>
                            </div>
                            <div className="flex flex-nowrap gap-3 shadow-sm p-3 rounded-md">
                                <div className="flex items-center justify-center bg-primary w-8 h-8 shrink-0 rounded-full text-white/90 text-sm font-semibold">
                                    D
                                </div>
                                <div>
                                    <h5 className="text-[14px] font-semibold">Holding Cost</h5>
                                    <p className="text-[13px] text-muted-foreground">Biaya penyimpanan unit per periode</p>
                                </div>
                            </div>
                        </div>
                    </CardDashboard>
                    <CardDashboard 
                        title="Bagaimana rekomendasi dibuat?"
                        description="Sistem menghasilkan rekomendasi melalui tahapan berikut:"
                    >
                        <div className="flex flex-wrap justify-center lg:grid lg:grid-cols-5 items-start gap-4 lg:gap-1 w-full mt-2">
                            {recomendation.map(({ icon, desc }, index) => (
                                <div className="flex flex-col gap-1.5 items-center justify-center shrink-0 w-[30%] md:w-[20%] lg:w-full p-1">
                                    <div className="flex items-center justify-center bg-[#F5F5F5] w-16 h-16 rounded-lg relative">
                                        {icon}
                                        <div className="absolute flex justify-center items-center -top-2 -left-2 w-5 h-5 rounded-full bg-primary text-white/90 text-[12px]">
                                            {index + 1}
                                        </div>
                                    </div>
                                    <p className="text-[12px] leading-snug text-center">
                                        {desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </CardDashboard>
                    <CardDashboard 
                        title="Penjelasan Status"
                        description="Status menunjukan kondisi stok produk dibandingkan nilai EOQ."
                    >
                        <div className="flex flex-col gap-2 rounded-lg border border-gray-300">
                            {STATUS_INFO.map(({ color, label, desc }) => (
                                <div 
                                    key={label} 
                                    className="grid grid-cols-[0.5fr_3fr] items-center gap-1 border-b border-gray-300 p-2.5 last:border-b-0"
                                >
                                    <div className="w-20">
                                        <Badge variant="outline" className={`${color} text-xs shrink-0 mt-0.5`}>
                                            {label}
                                        </Badge>
                                    </div>
                                    
                                    <p className="text-xs text-gray-800 leading-tight">
                                        {desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </CardDashboard>
                    <CardDashboard 
                        title="Parameter Konfigurasi"
                        description="Parameter berikut digunakan untuk sistem menghitung EOQ."
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-1">
                            {paramConfigure.map(({ icon, title, desc }) => (
                                <div className="flex flex-nowrap gap-2">
                                    <div className="flex items-center justify-center bg-[#F5F5F5] w-[45px] h-[45px] rounded-lg shrink-0">
                                        {icon}
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <h5 className="text-[14px] font-medium">
                                            {title}
                                        </h5>
                                        <p className="text-[12px] leading-snug">
                                            {desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardDashboard>
                </div>
                <aside className="sticky top-5">
                    <CardDashboard title="Ringkasan EOQ">
                        <div className="bg-[#FAFAFC] p-4 rounded-md">
                            <h5 className="font-semibold text-[15px]">Rumus EOQ</h5>
                            <p className="text-[13px] mt-2">Rumus dasar yang digunakan:</p>
                            <div className="my-5">
                                <BlockMath math="EOQ = \sqrt{\frac{2DS}{H}}" />
                            </div>
                            <div className="text-sm mt-4">
                                <p>D = Demand, S = Ordering Cost</p>
                                <p>H = Holding Cost</p>
                            </div>
                        </div>
                        <div className="bg-yellow-100/15 border border-yellow-200 p-4 rounded-md">
                            <h5 className="font-semibold text-[15px]">Catatan</h5>
                            <div className="flex flex-nowrap gap-2 mt-2">
                                <div className="flex justify-center items-center w-9 h-9 shrink-0 rounded-full bg-[#FAF0DD]/60 text-yellow-700">
                                    <LuLightbulb size={20} />
                                </div>
                                <p className="text-[13px]">
                                    Semakin akurat data penjualan dan parameter yang diberikan, semakin baik rekomendasi EOQ yang dihasilkan sistem.
                                </p>
                            </div>
                        </div>
                    </CardDashboard>
                </aside>
            </div>
        </div>
    )
}