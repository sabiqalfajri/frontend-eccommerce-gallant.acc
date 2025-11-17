import { CartItem } from "@/types/Cart"

interface CheckoutItemProps {
    item: CartItem[]
}

export const CheckoutItem = ({ item }: CheckoutItemProps) => {
    return (
        <>
            {item.map((i) => (
                <div
                key={i.id}
                className="grid grid-cols-[auto_minmax(0,1fr)] md:grid-cols-[15%_85%] gap-x-2 md:gap-x-1 px-0 md:px-3">
                    <img 
                        src={i.product.images[0].url}
                        alt="cartItem" 
                        className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-md border border-gray-200"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-[75%_25%] gap-x-4 items-start text-[15px]">
                        <h1 className="line-clamp-2 text-sm md:text-[15px]">{i.product.name}</h1> 
                        <div className="flex flex-nowrap justify-start md:justify-end gap-2 items-center font-semibold">
                            <p>{i.quantity} x</p>
                            <p className="font-semibold">
                                Rp{i.product.price.toLocaleString('id-ID')}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}