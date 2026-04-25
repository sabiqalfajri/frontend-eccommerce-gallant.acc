import { Section } from "@/components/common/Section";
import { Button } from "@/components/ui/button";
import { FaWhatsapp } from "react-icons/fa6";
import Voucher from "@/assets/voucher.webp"

export const NewsLetter = () => {
    return (
        <Section wrapperClassName="bg-primary py-10 flex justify-center items-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full items-center text-white">
                <div className="flex flex-col gap-y-3">
                    <h1 className="text-2xl md:text-3xl font-bold italic">Dapatkan Promo Khusus! ⚡</h1>
                    <p className="text-sm md:text-base opacity-90">
                        Mau voucher diskon 10% untuk pesanan pertamamu? Hubungi CS kami melalui WhatsApp dan klaim kode promonya sekarang!
                    </p>
                    
                    <div className="mt-4">
                        <a 
                            href="https://wa.me/6281553871004?text=Halo!%20Saya%20ingin%20klaim%20voucher%20diskon%20pengguna%20baru" 
                            target="_blank" 
                            rel="noopener noreferrer"
                        >
                            <Button size="lg" className="bg-white text-primary hover:bg-slate-100 font-bold px-8 flex gap-2">
                                <FaWhatsapp size={20} />
                                Klaim Voucher
                            </Button>
                        </a>
                    </div>
                </div>

                <div className="hidden md:flex justify-end items-center relative">
                    <img 
                        src={Voucher}
                        alt="Promo Voucher" 
                        className="w-full max-w-[200px] h-auto drop-shadow-2xl"
                    />

                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/10 w-64 h-64 rounded-full blur-3xl -z-10" />
                </div>
            </div>
        </Section>
    )
}