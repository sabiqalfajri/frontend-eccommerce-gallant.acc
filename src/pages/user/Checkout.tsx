import { Section } from "@/components/common/Section"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { AddressCard } from "@/components/user/address/AddressCard"
import { CheckoutItem } from "@/components/user/checkout/CheckoutItem"
import { CheckoutSkeleton } from "@/components/user/checkout/CheckoutSkeleton"
import { useCheckout } from "@/context/CheckoutContext"
import { useAddress } from "@/hooks/address/useAddress"
import { useSmoothLoading } from "@/hooks/universal/useSmoothLoading"
import { useToken } from "@/hooks/universal/useToken"
import { useEffect } from "react"
import { SiGooglemaps } from "react-icons/si";

export const Checkout = () => {
    const { token } = useToken()
    const { checkoutItems } = useCheckout();
    const { address, isLoadingAddress, isFetchedAddress } = useAddress(token!)
    const checkoutLoading = isLoadingAddress || !isFetchedAddress
    const smoothLoadingCheckout = useSmoothLoading(checkoutLoading, 400)
    const checkoutTotal = checkoutItems.reduce((sum, i) => sum + (i.product.price * i.quantity), 0);
    const checkoutCount = checkoutItems.reduce((sum, i) => sum + i.quantity, 0 );
    
    // useEffect(() => {
    //     console.log('checkoutItems in checkout: ', checkoutItems)
    // }, [checkoutItems])

    return (
        <Section>
            {smoothLoadingCheckout ? (
            <CheckoutSkeleton />
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-5">
                <div className="flex flex-col p-0 md:p-3">
                    <h1 className="font-semibold text-2xl">Checkout</h1>
                    <AddressCard address={address} />
                    <div className="flex flex-col gap-4 mt-4">
                        <CheckoutItem item={checkoutItems} />
                    </div>
                </div>
                <div className="flex flex-col h-fit border border-gray-200 rounded-md p-3 pb-4">
                    <h1 className="font-semibold text-2xl">Payment</h1>
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
                        <h1 className="font-semibold mb-1">Shopping Summary</h1>
                        <div className="flex flex-wrap items-center justify-between text-sm">
                            <p>Subtotal ({checkoutCount} item)</p>
                            <p>Rp{checkoutTotal.toLocaleString('id-ID')}</p>
                        </div>
                        <div className="flex flex-wrap items-center justify-between text-sm">
                            <p>Shipping Cost</p>
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
                    <Button variant="primary" className="mt-2">
                        Checkout Now
                    </Button>
                </div>
            </div>
        )}
        </Section>
        
    )
}