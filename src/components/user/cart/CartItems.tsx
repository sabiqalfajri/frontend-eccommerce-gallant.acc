import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input";
import { useProductQuantity } from "@/hooks/universal/useProductQuantity";
import { CartItem } from "@/types/Cart"
import { showError } from "@/utils/Toast";
import { FiMinus, FiPlus } from "react-icons/fi";
import { BsTrash3 } from "react-icons/bs";
import { useCartSelection } from "@/context/CartSelectionContext";
import { useEffect } from "react";
import { useUpdateProduct } from "@/hooks/product/useUpdatedProduct";
import { useToken } from "@/hooks/universal/useToken";
import { useAddToCart } from "@/hooks/cart/useAddToCart";
import { useUpdateCart } from "@/hooks/cart/useUpdateCart";
import { ClipLoader } from "react-spinners";
import { useDeletedCartItem } from "@/hooks/cart/useDeletedCartItem";
import { Link, useNavigate } from "react-router-dom";

interface CartItemProps {
    item: CartItem[] | undefined;
    onDeleted?: () => void;
    isDeleting?: boolean
}

export const CartItems = ({
    item,
    onDeleted,
    isDeleting
}: CartItemProps) => {
    // const { quantity, increase: handlePlus, decrease: handleMinus, setQuantity, reset } = useProductQuantity(1);
    const { token } = useToken();
    const { updateCart, loadingItemIds } = useUpdateCart(token!);
    const { deleteCartItem, isDeletingIds } = useDeletedCartItem(token!)
    const { selectedIds, toggleSelect, selectAll, clearSelection, isSelected } = useCartSelection();
    const navigate = useNavigate();

    if(!item) return null

    const handleNavigate = (productId: string) => {
        navigate(`/detail/${productId}`)
    }

    const handlePlus = async (itemId: string, currentQty: number) => {
        console.log('handlePlus called with: ', { itemId, currentQty })
        await updateCart({ id: itemId, quantity: currentQty + 1 })
    }

    const handleMinus = async (itemId: string, currentQty: number) => {
        await updateCart({ id: itemId, quantity: currentQty - 1 })
    }

    const handleRemove = async (id: string) => {
        await deleteCartItem(id)
    }

    // console.log('token anda: ', token)

    useEffect(() => {
        console.log('selected ids: ', selectedIds)
    }, [selectedIds])

    useEffect(() => {
        console.log('cartItem: ', item)
    }, [item])

    return (
        <>
            {item && item.map((i) => (
                <div key={i.id} 
                className={`grid grid-cols-[auto_minmax(0,1fr)] md:grid-cols-[1fr_4fr] gap-x-2 md:gap-x-0 ${loadingItemIds?.includes(i.id) ? 'opacity-40 pointer-events-none' : ''}`}>
                    <div className="flex flex-wrap gap-3 w-full items-center">
                        <Checkbox 
                            id={i.id}
                            checked={isSelected(i.id)}
                            onCheckedChange={() => toggleSelect(i.id)}
                        /> 
                        <Link
                          to={`/detail/${i.productId}`}
                        >
                            <img 
                                src={i.product.images[0].url} 
                                onClick={() => handleNavigate(i.productId)}
                                alt="cartItem" 
                                className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-md border border-gray-200"
                            />
                        </Link>
                    </div>
                    <div className="flex flex-col w-full">
                        <div className="flex flex-col">
                            <div 
                            className="grid grid-cols-1 lg:grid-cols-[86%_1fr] gap-x-4 items-start text-sm md:text-[15px]">
                                <Link
                                  to={`/detail/${i.productId}`}
                                >
                                    <h1 className="line-clamp-2">{i.product.name}</h1> 
                                </Link>
                                <p className="font-semibold">
                                    Rp{i.product.price.toLocaleString('id-ID')}
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-3 justify-end items-center mt-0.5">
                                <button className="flex justify-center items-center p-1 cursor-pointer text-gray-600"
                                onClick={() => handleRemove(i.id)}
                                >
                                    <BsTrash3 size={18} />
                                </button>
                                <div className="flex flex-wrap items-center p-1 w-fit border border-gray-300 rounded-md">
                                    <button 
                                    onClick={() => handleMinus(i.id, i.quantity)}
                                    disabled={i.quantity === 1}
                                    className={`px-0.5 h-fit py-0.5 text-[22px] font-semibold text-gray-700 flex justify-center items-center rounded-sm ${i.quantity === 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-gray-200'}`}>
                                        <FiMinus size={18} />
                                    </button>
                                    {loadingItemIds.includes(i.id) ? (
                                        <div className="w-8 h-5 md:w-10 flex justify-center items-center">
                                            <ClipLoader size={18} />
                                        </div>
                                    ) : (
                                        <Input
                                        value={i.quantity} 
                                        onChange={(e) => {
                                            const value = parseInt(e.target.value) || 0;
                                            if(value === 0) {
                                                showError('Minimum quantity is 1 item(s)');
                                            }
                                            // setQuantity(value);
                                        }}
                                        className="w-10 rounded-none text-center focus:outline-none text-[13px]! font-semibold h-5 border-none shadow-none focus:ring-0 p-0 focus-visible:ring-0" 
                                        />
                                    )}
                                    <button 
                                    onClick={() => handlePlus(i.id, i.quantity)}
                                    className={`px-0.5 h-fit py-0.5 text-[22px] font-semibold text-gray-700 flex justify-center items-center rounded-sm cursor-pointer hover:bg-gray-200`}>
                                        <FiPlus size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}