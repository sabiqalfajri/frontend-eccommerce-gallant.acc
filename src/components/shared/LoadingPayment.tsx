import Lottie from "lottie-react"
import loadingAnimation from "@/assets/loading.json"

export const LoadingPayment = () => {
    return (
        <div className="flex flex-col h-[80vh] gap-1 justify-center items-center">
            <div className="w-55 h-55 flex justify-center items-center transform -translate-x-4">
                <Lottie 
                    animationData={loadingAnimation}
                    loop
                    autoPlay
                />
                {/* <Player 
                    className="w-full h-full"
                    src="/data/loading.json"
                    loop
                    autoplay
                    speed={1}
                /> */}
            </div>
            
            <div className="flex flex-col">
                <p className="text-[1.3rem] md:text-2xl font-bold text-center">Lagi dicek, nih..</p>
                <p className="text-sm text-gray-600 text-center">Pembayaranmu sedang kami proses</p>
            </div>
        </div>
    )
}