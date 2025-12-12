import { Section } from "@/components/common/Section"
import { Button } from "@/components/ui/button"
import { AddressCard } from "@/components/user/address/AddressCard"
import { CheckoutItem } from "@/components/user/checkout/CheckoutItem"
import { CheckoutSkeleton } from "@/components/user/checkout/CheckoutSkeleton"
import { useCartSelection } from "@/context/CartSelectionContext"
import { useCheckout } from "@/context/CheckoutContext"
import { useCheckoutTransition } from "@/context/CheckoutTransitionContext"
import { useAddress } from "@/hooks/address/useAddress"
import { useCreateOrder } from "@/hooks/transaction/useCreateOrder"
import { useCreatePayment } from "@/hooks/transaction/useCreatePayment"
import { useSmoothLoading } from "@/hooks/universal/useSmoothLoading"
import { useToken } from "@/hooks/universal/useToken"
import { showError } from "@/utils/Toast"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ClipLoader } from "react-spinners"

export const Checkout = () => {
    const { token } = useToken()
    const { checkoutItems, clearCheckout } = useCheckout();
    const { clearSelection } = useCartSelection();
    const [hasCompletedPayment, setHasCompletedPayment] = useState(false);
    const { address, isLoadingAddress, isFetchedAddress, isErrorAddress } = useAddress(token!);
    const { createTransactionOrder, isCreatingTransactionOrder } = useCreateOrder(token)
    const { createTransactionPayment, isCreatingTransactionPayment } = useCreatePayment(token)
    const checkoutLoading = isLoadingAddress || !isFetchedAddress
    const smoothLoadingCheckout = useSmoothLoading(checkoutLoading, 400)
    const checkoutTotal = checkoutItems.reduce((sum, i) => sum + (i.product.price * i.quantity), 0);
    const checkoutCount = checkoutItems.reduce((sum, i) => sum + i.quantity, 0 );
    const navigate = useNavigate();
    const isLoading = isCreatingTransactionOrder || isCreatingTransactionPayment;
    const { skipNextAddressValidation, setSkipNextAddressValidation } = useCheckoutTransition();
    
    const handlePayNow = async () => {
        if(checkoutItems.length === 0) return;

        const selectedAddressId = address.find(a => a.isDefault)?.id ?? address[0]?.id;
        if (!selectedAddressId) {
            showError("Please add a shipping address.");
            return;
        }
        
        const items = checkoutItems.map(item => ({
            cartItemId: item.id,
            productId: item.productId,
            quantity: item.quantity,
        }))

        const order = await createTransactionOrder({
            addressId: selectedAddressId,
            items
        });
        await createTransactionPayment(order.id);

        clearCheckout();
        clearSelection();
        setHasCompletedPayment(true);
        
        navigate(`/transaction/${order.id}`, { replace: true })
    }

    useEffect(() => {
        if(isErrorAddress) {
            navigate("/auth/sign-in", { replace: true });
        }
    }, [isErrorAddress, navigate])

    useEffect(() => {
        if(!isFetchedAddress || smoothLoadingCheckout || hasCompletedPayment) return;
        if(skipNextAddressValidation) {
            setSkipNextAddressValidation(false);
            return
        }

        if(!address || address.length === 0) {
            console.log('address checkout', address)
            showError('Silakan tambahkan alamat pengiriman terlebih dahulu.')
            navigate(`/customer/address/add?redirect=/checkout`, { replace: true });
            return;
        }

        if(checkoutItems.length === 0) {
            showError('Keranjang Anda kosong.')
            navigate(`/cart`, { replace: true });
            return;
        }
    }, [
        smoothLoadingCheckout, 
        hasCompletedPayment,
        isFetchedAddress, 
        address, 
        checkoutItems, 
        navigate
    ])

    return (
        <Section>
            {smoothLoadingCheckout ? (
                <CheckoutSkeleton />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-5">
                    <div className="flex flex-col p-0 md:p-3">
                        <h1 className="font-semibold text-[18px] md:text-2xl">Checkout</h1>
                        <AddressCard address={address} />
                        <div className="flex flex-col gap-4 mt-4">
                            <CheckoutItem item={checkoutItems} />
                        </div>
                    </div>
                    <div className="flex flex-col h-fit border border-gray-200 rounded-md p-3 pb-4">
                        <h1 className="font-semibold text-[16.5px] md:text-[20px]">Detail Pembayaran</h1>
                        <div className="flex flex-col gap-1 text-sm pb-3 border-b border-gray-200 mt-4">
                            <div className="flex flex-wrap justify-between items-center">
                                <div className="flex flex-nowrap items-center gap-x-3.5">
                                    <div className="w-8 h-8">
                                        <img className="w-full h-full object-contain" src="/images/qris.svg" alt="qris-logo" />
                                    </div>
                                    <p className="text-base -translate-y-0.5">QRIS</p>
                                </div>
                                <div className="flex justify-center items-center border border-gray-400 w-5 h-5 rounded-full">
                                    <div className="w-3 h-3 rounded-full bg-primary"></div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col mt-3 gap-1.5 border-b border-gray-200 pb-3.5">
                            <h1 className="font-semibold mb-1 text-[15px] md:text-base">Pastikan pesanan kamu sudah sesuai, ya</h1>
                            <div className="flex flex-wrap items-center justify-between text-sm">
                                <p>Subtotal ({checkoutCount} item)</p>
                                <p>Rp{checkoutTotal.toLocaleString('id-ID')}</p>
                            </div>
                            <div className="flex flex-wrap items-center justify-between text-sm">
                                <p>Biaya Pengiriman</p>
                                <p>Free</p>
                            </div>
                            <div className="flex flex-wrap items-center justify-between text-sm">
                                <p>Biaya Layanan</p>
                                <p>Free</p>
                            </div>
                        </div>
                        <div className="flex flex-wrap items-center justify-between text-sm mt-3">
                            <p>Total</p>
                            <p className="text-base font-semibold">
                                Rp{checkoutTotal.toLocaleString('id-ID')}
                            </p>
                        </div>
                        <Button 
                        variant="primary" 
                        className="mt-2" 
                        disabled={isLoading}
                        onClick={handlePayNow}
                        size="lg"
                        >
                            {isLoading ? (
                                <ClipLoader size={24} color="white" />
                            ) : 'Bayar Sekarang'}
                        </Button>
                    </div>
                </div>
            )}
        </Section>
    )
}