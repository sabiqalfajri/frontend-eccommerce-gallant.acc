import { CustomTabs } from "@/components/common/CustomTabs"
import { DetailProduct } from "@/types/Product"

interface DetailProductTabsProps {
    product: DetailProduct | undefined
}

export const DetailProductTabs = ({
    product
}: DetailProductTabsProps) => {

    const tabs = [
        {
            value: "description",
            label: "Description",
            content: <div><p>{product?.description}</p></div>,
        },
        // {
        //     value: "orders",
        //     label: "Additional Info",
        //     content: <div>📦 Daftar pesanan pelanggan</div>,
        // },
    ]

    return (
        <div>
            <CustomTabs 
                defaultValue="description"
                tabs={tabs}
                className="w-full"
                listClassName="flex bg-transparent! justify-center items-center w-full border-b border-gray-200"
                contentClassName="py-3 px-4 bg-gray-100 text-sm md:text-base rounded-md"
                triggerClassName="data-[state=active]:shadow-none data-[state=active]:text-primary text-[15px]"
            />
        </div>
    )
}