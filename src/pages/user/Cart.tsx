import { Section } from "@/components/common/Section"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { CartEmpty } from "@/components/user/cart/CartItemEmpty"
import { CartItems } from "@/components/user/cart/CartItems"
import { CartSkeleton } from "@/components/user/cart/CartSkeleton"
import { useCartSelection } from "@/context/CartSelectionContext"
import { useCheckout } from "@/context/CheckoutContext"
import { useAddress } from "@/hooks/address/useAddress"
import { useCart } from "@/hooks/cart/useCart"
import { useSmoothLoading } from "@/hooks/universal/useSmoothLoading"
import { useToken } from "@/hooks/universal/useToken"
import { useWindowSize } from "@/hooks/universal/useWindowSize"
import { showError } from "@/utils/Toast"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ClipLoader } from "react-spinners"

export const Cart = () => {
    const { token } = useToken();
    const { cartItem, isLoadingCartItem, isFetchedCartItem } = useCart(token!);
    const { address } = useAddress(token!);
    const { selectedIds, selectAll, clearSelection } = useCartSelection();
    const { setCheckoutItems } = useCheckout();
    const [isLoadingBuyNow, setIsLoadingBuyNow] = useState(false);
    const navigate = useNavigate();
    const { isMobile } = useWindowSize();
    const cartLoading = isLoadingCartItem || !isFetchedCartItem
    const smoothLoadingCart = useSmoothLoading(cartLoading, 400)
    const selectedItems = cartItem?.items.filter(i => selectedIds.includes(i.id));
    const selectedTotal = selectedItems?.reduce((sum, i) => sum + (i.product.price * i.quantity), 0);
    const selectedCount = selectedItems?.reduce((sum, i) => sum + i.quantity, 0 );

    const handleSelectAll = () => {
        if(selectedIds.length === cartItem?.items.length) {
            clearSelection()
        } else if(cartItem) {
            selectAll(cartItem.items.map((i) => i.id))
        }
    }

    const handleBuyNow = async () => {
        if (!selectedItems || !selectedItems.length) return;
        if(!address.length) return showError('Please set your address first')

        try {
            setIsLoadingBuyNow(true)
            await new Promise((resolve) => setTimeout(resolve, 800));

            navigate('/checkout')
            setCheckoutItems(selectedItems);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoadingBuyNow(false)
        }
    }

    // if (!cartItem && isFetchedCartItem) {
    //     return (
    //         <div className="flex flex-col">
    //             <h1>Your cart is empty.</h1>
    //             <p>Ayo penuhi dengan barang-barang favorit Anda</p>
    //         </div>
    //     )
    // }

    return (
        <Section>
                {smoothLoadingCart ? (
                    <CartSkeleton />
                ) : cartItem && (
                    <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-5">
                        <div className="flex flex-col p-3">
                            <h1 className="font-semibold text-2xl">Shopping Cart</h1>
                            <div className="flex flex-col gap-3 mt-4">
                                {cartItem.items.length > 0 ? (
                                    <>
                                        <div className="flex px-0 md:px-2 pb-2.5 border-b border-gray-200">
                                            <div className="flex flex-wrap items-center gap-x-2.5">
                                                <Checkbox
                                                checked={selectedIds.length === cartItem?.items.length && cartItem.items.length > 0}
                                                onCheckedChange={handleSelectAll}
                                                className="cursor-pointer"
                                                />
                                                <p>Select All ({cartItem.items.length})</p>
                                            </div>
                                        </div>
                                        {/* Cart Items */}
                                        <div className="px-0 md:px-2 flex flex-col gap-4">
                                            {cartItem && <CartItems item={cartItem.items} />}
                                        </div>
                                    </>
                                ) : (
                                    <CartEmpty />
                                )}
                            </div>
                        </div>
                        {/* Summary Cart */}
                        {(!isMobile || (isMobile && cartItem.items.length > 0)) && (
                            <div className="flex flex-col h-fit border border-gray-200 rounded-md p-3 pb-4">
                                <h1 className="font-semibold text-2xl">Summary</h1>
                                <div className="flex flex-col gap-1 text-sm pb-3 border-b border-gray-200 mt-4">
                                    <div className="flex flex-wrap items-center justify-between">
                                        <p>Subtotal ({selectedCount} Item)</p>
                                        <p>
                                            {
                                            selectedTotal === 0 ? '-' : `Rp${selectedTotal?.toLocaleString('id-ID')}`
                                            }
                                        </p>
                                    </div>
                                    <div className="flex flex-wrap items-center justify-between">
                                        <p>Shipping Cost</p>
                                        <p>Free</p>
                                    </div>
                                </div>
                                <div className="flex flex-wrap items-center justify-between mt-2">
                                    <p>Total</p>
                                    <p className="font-semibold">
                                        {
                                        selectedTotal === 0 ? '-' : `Rp${selectedTotal?.toLocaleString('id-ID')}`
                                        }
                                    </p>
                                </div>
                                <Button 
                                className="mt-3 disabled:bg-gray-300 disabled:text-gray-500"
                                onClick={handleBuyNow}
                                disabled={selectedIds.length === 0}
                                variant="primary"
                                size="lg"
                                >
                                    {isLoadingBuyNow ? <ClipLoader size={20} color="white" /> : `Buy Now ${selectedCount ? `(${selectedCount})` : ''}`}
                                </Button>
                            </div>
                        )}
                    </div>
                )}
        </Section>
        
    )
}