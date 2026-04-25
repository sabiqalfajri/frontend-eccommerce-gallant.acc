import { Section } from "@/components/common/Section"

export const About = () => {

    return (
        <Section>
            <div className="flex flex-col justify-center items-center px-0 md:px-24">
                <div className="w-fit flex flex-col items-center mt-5 mb-5">
                    <h1 className="font-bold text-2xl md:text-3xl text-primary">Tentang Kami</h1>
                    <p className="w-full md:w-[80%] text-center text-sm md:text-base mt-2.5 text-muted-foreground">
                        Menghadirkan aksesoris berkualitas dengan desain modern, nyaman digunakan, dan tetap terjangkau untuk melengkapi gaya harianmu.
                    </p>
                    <div className="flex flex-col md:grid md:grid-cols-2 justify-center gap-8 w-full mt-10">
                        <div className="w-full aspect-4/3 max-h-[350px] md:max-h-none">
                            <img 
                                src="/images/about.webp" 
                                alt="banner-about" 
                                loading="lazy"
                                className="w-full h-full object-cover rounded-xl"
                            />
                        </div>
                        <div className="text-sm md:text-[15px] text-gray-600 leading-relaxed">
                            Gallant.acc menghadirkan berbagai aksesoris seperti gelang, bando, dan item lainnya dengan desain simpel, elegan, dan mudah dipadukan untuk berbagai gaya harian.

                            <br /><br />

                            Setiap produk dipilih dengan teliti untuk memastikan kualitas dan kenyamanan saat digunakan, baik untuk aktivitas sehari-hari maupun momen spesial.

                            <br /><br />

                            Dengan kombinasi desain yang modern dan harga yang tetap terjangkau, kami ingin membantu kamu tampil lebih percaya diri melalui detail kecil yang berkesan.
                        </div>
                    </div>
                </div>

                <div className="w-full flex justify-center my-14 px-0 md:px-4">
                    <div className="w-full md:w-[70%] bg-primary/5 border border-primary/20 rounded-2xl p-6 md:p-10 text-center relative overflow-hidden">
                        <div className="w-16 h-1 bg-primary mx-auto mb-4 rounded-full"></div>

                        <h1 className="font-bold text-[19px] md:text-2xl">
                            Cerita Kami
                        </h1>

                        <p className="text-sm md:text-[15px] text-gray-600 mt-4 leading-relaxed">
                            Berawal dari ketertarikan pada dunia aksesoris, usaha ini berkembang menjadi brand yang menghadirkan produk dengan desain simpel dan nyaman digunakan. Dengan mengikuti tren serta kebutuhan pengguna, kami berusaha memberikan aksesoris yang relevan untuk melengkapi gaya harian.
                        </p>

                        <div className="mt-6">
                            <p className="text-sm font-medium text-gray-600 mb-3">
                                Sudah tertarik melengkapi gaya kamu?
                            </p>
                            <a href="/shop" className="inline-flex px-5 py-2.5 bg-primary text-white text-sm rounded-lg hover:opacity-90 transition cursor-pointer font-semibold">
                                Belanja Sekarang
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    )
}