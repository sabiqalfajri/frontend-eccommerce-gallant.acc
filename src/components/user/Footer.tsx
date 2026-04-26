import { FaInstagram } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";

export const Footer = () => {
    return (
        <footer className="bg-primary text-white mt-16 px-4 md:px-16 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 border-b border-white/20 pb-10">

                {/* Brand Info */}
                <div className="flex flex-col gap-4">
                    <h1 className="text-xl font-bold">Gallant.acc</h1>
                    <p className="text-sm leading-relaxed text-white/80">
                        Menyediakan berbagai aksesoris pilihan dengan kualitas terbaik
                        untuk melengkapi gaya dan kebutuhan harian Anda.
                    </p>

                    <div className="flex items-center gap-4 pt-2">
                        <a
                            href="https://instagram.com/gallant.acc"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:scale-110 transition"
                        >
                            <FaInstagram size={22} />
                        </a>

                        <a
                            href="https://wa.me/6281553871004"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:scale-110 transition"
                        >
                            <FaWhatsapp size={22} />
                        </a>
                    </div>
                </div>

                {/* Navigasi */}
                <div className="flex flex-col gap-4">
                    <h2 className="font-semibold text-lg">Navigasi</h2>
                    <ul className="space-y-2 text-sm text-white/80">
                        <li><a href="/" className="hover:text-white">Home</a></li>
                        <li><a href="/shop" className="hover:text-white">Shop</a></li>
                        <li><a href="/about" className="hover:text-white">About</a></li>
                        <li><a href="/contact" className="hover:text-white">Contact</a></li>
                    </ul>
                </div>

                {/* Kontak */}
                <div className="flex flex-col gap-4">
                    <h2 className="font-semibold text-lg">Kontak</h2>
                    <ul className="space-y-2 text-sm text-white/80">
                        <li>WhatsApp: +62 815 5387 1004</li>
                        <li>Email: gallant.acc123@gmail.com</li>
                        <li>Banyumas, Jawa Tengah</li>
                    </ul>
                </div>
            </div>

            {/* Bottom Footer */}
            <div className="pt-6 text-center text-sm text-white/70">
                <p>© 2025 Gallant.acc. All Rights Reserved.</p>
            </div>
        </footer>
    )
}