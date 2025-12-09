import { LiaShippingFastSolid } from "react-icons/lia";
import { GrSecure } from "react-icons/gr";
import { BsGem } from "react-icons/bs";
import { Section } from "@/components/common/Section";

export const ServiceHighlights = () => {
    const services = [
        { 
            icon: <BsGem size={23} />, 
            title: 'Bahan Berkualitas Tinggi', 
            description: 'Kami menggunakan material premium dan tahan lama untuk memastikan kualitas produk yang awet dan terpercaya.' 
        },
        { 
            icon: <LiaShippingFastSolid size={24} />, 
            title: 'Gratis Ongkir', 
            description: 'Nikmati pengiriman gratis ke seluruh Indonesia untuk setiap pembelian di atas Rp50.000 — cepat, aman, dan terpercaya.' 
        },
        { 
            icon: <GrSecure size={24} />, 
            title: 'Pembayaran Aman', 
            description: 'Transaksi Anda terenkripsi dan dilindungi dengan standar keamanan terbaik di industri.'
        },
    ]

    return (
        <Section>
            <div className="flex flex-wrap justify-center items-center gap-5 md:gap-10">
                {services.map((serv) => (
                    <div className="w-70 flex flex-col justify-start items-center gap-y-2">
                        <div className="text-primary">
                            {serv.icon}
                        </div>
                        <h1 className="font-semibold">{serv.title}</h1>
                        <p className="text-sm text-center h-16">{serv.description}</p>
                    </div>
                ))}
            </div>
        </Section>
    )
}