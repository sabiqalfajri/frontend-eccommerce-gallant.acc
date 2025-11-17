import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAddToCart } from "@/hooks/cart/useAddToCart"
import { useProductQuantity } from "@/hooks/universal/useProductQuantity"
import { useToken } from "@/hooks/universal/useToken"
import { DetailProduct } from "@/types/Product"
import { showError } from "@/utils/Toast"
import { FiMinus, FiPlus } from "react-icons/fi"
import { ClipLoader } from "react-spinners"

interface DetailProductInfoProps {
    id: string
    product: DetailProduct | undefined
}

export const DetailProductInfo = ({ product, id }: DetailProductInfoProps) => {
    const { token } = useToken();
    const { addToCart, isAddingToCart } = useAddToCart(token!)
    const { quantity, increase: handlePlus, decrease: handleMinus, setQuantity } = useProductQuantity(1);
    if(!product || !id) return;

    return (
        <div className="">
            <div className="flex flex-col gap-1">
                <p className="text-[25px] md:text-[29px] font-semibold text-primary">
                    Rp{product.price.toLocaleString('id-ID')}
                </p>
                <div className="border-b border-gray-200 pb-3">
                    <h1 className="font-semibold">{product.name}</h1>
                </div>
                <div className="flex flex-wrap items-center gap-3 mt-3 text-[15px]">
                    <p>Pasti Ori</p>
                    <div className="w-1 h-1 rounded-full bg-gray-500"></div>
                    <p>Jaminan Tepat Waktu</p>
                    <div className="w-1 h-1 rounded-full bg-gray-500"></div>
                    <p>Jaminan Tepat Waktu</p>
                </div>
                <p className="line-clamp-3 mt-3">{product.description}</p>
                <div className="flex flex-wrap items-center gap-x-3 mb-2.5 mt-3">
                    <div className="flex flex-wrap items-center py-1 px-1 w-fit border border-gray-300 rounded-md">
                        <button 
                        onClick={handleMinus}
                        disabled={quantity === 1}
                        className={`px-0.5 h-fit py-0.5 text-[22px] font-semibold text-gray-700 flex justify-center items-center rounded-sm ${quantity === 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-gray-200'}`}>
                            <FiMinus size={18} />
                        </button>
                        <Input
                        value={quantity} 
                        onChange={(e) => {
                            const value = parseInt(e.target.value) || 0;
                            if(value === 0) {
                                showError('Minimum quantity is 1 item(s)');
                            }
                            setQuantity(value);
                        }}
                        onBlur={() => {
                            if(!quantity || quantity < 1) {
                                setQuantity(1);
                            }
                        }}
                        className="w-12 rounded-none text-center focus:outline-none text-base! font-semibold h-fit border-none shadow-none focus:ring-0 p-0 focus-visible:ring-0" 
                        />
                        <button 
                        onClick={handlePlus}
                        className={`px-0.5 h-fit py-0.5 text-[22px] font-semibold text-gray-700 flex justify-center items-center rounded-sm cursor-pointer hover:bg-gray-200`}>
                            <FiPlus size={18} />
                        </button>
                    </div>
                    <div>
                        <p>Stok: <span className="font-semibold">{product.stock}</span></p>
                    </div>
                </div>
                <div className="flex flex-wrap gap-x-3 mt-3">
                    <Button 
                    variant="outlinePrimary"
                    size="lg"
                    className="w-32"
                    >
                        Buy Now
                    </Button>
                    <Button 
                    variant="primary"
                    size="lg"
                    onClick={() => addToCart({ productId: id, quantity })}
                    disabled={isAddingToCart}
                    className="w-40"
                    >
                        {isAddingToCart ? <ClipLoader size={25} /> : 'Add To Cart'}
                    </Button>
                </div>


                {/* <div className="hidden md:flex flex-col gap-3.5 border border-gray-300 rounded-md p-3 pb-4">
                    <div className="flex flex-wrap items-center gap-x-2 mb-2.5 mt-1.5">
                        <div className="flex flex-wrap items-center py-1 px-1 w-fit border border-gray-300 rounded-md">
                            <button 
                            onClick={handleMinus}
                            disabled={quantity === 1}
                            className={`px-0.5 h-fit py-0.5 text-[22px] font-semibold text-gray-700 flex justify-center items-center rounded-sm ${quantity === 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-gray-200'}`}>
                                <FiMinus size={18} />
                            </button>
                            <Input
                            value={quantity} 
                            onChange={(e) => {
                                const value = parseInt(e.target.value) || 0;
                                if(value === 0) {
                                    showError('Minimum quantity is 1 item(s)');
                                }
                                setQuantity(value);
                            }}
                            onBlur={() => {
                                if(!quantity || quantity < 1) {
                                    setQuantity(1);
                                }
                            }}
                            className="w-12 rounded-none text-center focus:outline-none text-base! font-semibold h-fit border-none shadow-none focus:ring-0 p-0 focus-visible:ring-0" 
                            />
                            <button 
                            onClick={handlePlus}
                            className={`px-0.5 h-fit py-0.5 text-[22px] font-semibold text-gray-700 flex justify-center items-center rounded-sm cursor-pointer hover:bg-gray-200`}>
                                <FiPlus size={18} />
                            </button>
                        </div>
                        <div>
                            <p>Stok: <span className="font-semibold">{product.stock}</span></p>
                        </div>
                    </div>
                    <div className="flex flex-wrap justify-between items-center border-t border-gray-200 pt-2.5">
                        <p className="text-sm">Subtotal</p>
                        <p className="font-semibold">
                            Rp{(product.price * quantity).toLocaleString('id-ID')}
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-2.5">
                        <Button variant="outlinePrimary">
                            Buy Now
                        </Button>
                        <Button 
                        variant="primary"
                        onClick={() => addToCart({ productId: id, quantity })}
                        disabled={isAddingToCart}
                        >
                            {isAddingToCart ? <ClipLoader /> : 'Add To Cart'}
                        </Button>
                    </div>
                </div> */}
            </div>
            
        </div>
    )
}