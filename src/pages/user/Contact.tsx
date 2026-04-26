import { Button } from "@/components/ui/button"
import { FaWhatsapp } from "react-icons/fa6"
import { FaInstagram } from "react-icons/fa";
import { Section } from "@/components/common/Section";
import { MapPin, PhoneCall, Mail, MessageCircle, InfoIcon } from 'lucide-react';

export const Contact = () => {
    return (
        <Section>
            <div className="flex flex-col justify-center items-center px-0 md:px-24">
                <div className="w-fit flex flex-col items-center my-5">
                    <h1 className="font-bold text-2xl md:text-3xl text-primary">Hubungi Kami</h1>
                    <p className="w-full md:w-[80%] text-center text-sm md:text-base mt-2.5 text-muted-foreground">
                        Punya pertanyaan seputar produk atau pesanan? Tim kami siap membantu Anda melalui saluran di bawah ini.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mt-10 max-w-4xl">
                    <div className=" p-6 rounded-2xl border border-slate-300">
                        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <MessageCircle size={20} /> Chat Langsung
                        </h2>
                        <div className="flex flex-col gap-3">
                            <a href="https://wa.me/6281553871004" target="_blank" rel="noopener noreferrer">
                                <Button className="w-full bg-transparent text-[#25D366] hover:bg-[#25D366]/10 font-semibold flex gap-2 h-12 border border-[#25D366]">
                                    <FaWhatsapp size={20} /> WhatsApp
                                </Button>
                            </a>
                            <a 
                                href="https://instagram.com/gallant.acc" 
                                target="_blank" 
                                rel="noopener noreferrer"
                            >
                                <Button className="w-full bg-transparent hover:bg-[#E4405F]/10 text-[#E4405F] flex gap-2 h-12 border border-[#E4405F]">
                                    <FaInstagram size={20} /> Instagram
                                </Button>
                            </a>
                        </div>
                        <div className="flex justify-center items-center gap-2 text-xs mt-4 text-slate-500 [&_svg]:size-3 [&_svg]:shrink-0">
                            <InfoIcon />
                            <p>
                                Respon cepat pada jam operasional kerja.
                            </p>
                        </div>
                        
                    </div>

                    {/* Kolom 2: Informasi Toko */}
                    <div className="flex flex-col gap-6 p-2">
                        <div>
                            <h2 className="font-semibold text-lg border-b pb-2 mb-3">Info Kontak</h2>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 text-sm">
                                    <div className="bg-primary/10 p-2 rounded-full text-primary">
                                        <PhoneCall size={18} />
                                    </div>
                                    <span className="font-medium">+62 815 5387 1004</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <div className="bg-primary/10 p-2 rounded-full text-primary">
                                        <Mail size={18} />
                                    </div>
                                    <span className="font-medium">gallant.acc123@gmail.com</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h2 className="font-semibold text-lg border-b pb-2 mb-3">Lokasi & Jam Buka</h2>
                            <div className="space-y-2">
                                <div className="flex gap-3 text-sm">
                                    <MapPin size={18} className="text-primary shrink-0" />
                                    <p>Jl. Stasiun, Gambarsari, Kec. Banyumas, Jawa Tengah</p>
                                </div>
                                <div className="text-sm pl-7 text-muted-foreground">
                                    <p>Senin - Sabtu: 07.00 - 16.30</p>
                                    <p>Minggu: Tutup</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </Section>
    )
}