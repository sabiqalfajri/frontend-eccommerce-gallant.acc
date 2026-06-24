import { Button } from "@/components/ui/button";
import { 
    Dialog, 
    DialogContent, 
    DialogDescription, 
    DialogFooter, 
    DialogHeader, 
    DialogTitle 
} from "@/components/ui/dialog";
import { EOQProduct } from "@/types/EOQ";
import { 
    HiOutlineClipboardDocumentCheck, 
    HiOutlineShoppingBag 
} from "react-icons/hi2";
import { PiSigma } from "react-icons/pi";

interface ModalDetailEoqProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    product: EOQProduct | null;
}

export const ModalDetailEoq = ({
    open,
    onOpenChange,
    product
}: ModalDetailEoqProps) => {
    if (!product) return null;

    const { 
        productName,
        productImage,
        calculationDetail, 
        annualDemand, 
        currentStock, 
        recommendedOrder, 
        reorderPoint 
    } = product;
    const { 
        orderingCost, 
        holdingCost, 
        averageDailyDemand, 
        leadTimeDays, 
        safetyStock 
    } = calculationDetail;

    const formatRupiah = (val: number) =>
        new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);

    return (
        <Dialog 
            open={open} 
            onOpenChange={onOpenChange}
        >
            <DialogContent className="max-w-lg flex flex-col">
                <DialogHeader>
                    <DialogTitle>Detail</DialogTitle>
                    <DialogDescription>
                        Melihat rincian perhitungan EOQ dan Reorder Point untuk produk.
                    </DialogDescription>
                </DialogHeader>
                 <div className="max-h-[65vh] overflow-y-auto space-y-4 pr-1 text-sm">
                    <section className="rounded-lg border p-4 space-y-3">
                        <div className="flex items-center gap-2 font-semibold">
                            <HiOutlineShoppingBag size={18} />
                            <span>Produk</span>
                        </div>
                        <div className="flex items-center gap-3">
                            {productImage ? (
                                <img
                                src={productImage}
                                alt={productName}
                                className="h-12 w-12 rounded-md border object-cover"
                                />
                            ) : (
                                <div className="h-12 w-12 rounded-md border bg-muted" />
                            )}
                            <div>
                                <p className="font-medium">{productName}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-y-2">
                            <span className="text-muted-foreground">Total Terjual</span>
                            <span className="font-medium">{annualDemand.toLocaleString()} unit</span>

                            <span className="text-muted-foreground">Stok Saat Ini</span>
                            <span className="font-medium">{currentStock} unit</span>
                        </div>
                    </section>

                    <section className="rounded-lg border p-4 space-y-3">
                        <div className="flex items-center gap-2 font-semibold">
                            <PiSigma size={18} />
                            <span>Perhitungan EOQ</span>
                        </div>

                        <div className="grid grid-cols-2 gap-y-2">
                            <span className="text-muted-foreground">Demand Tahunan (D)</span>
                            <span className="font-medium">{annualDemand.toLocaleString()} unit</span>
                            <span className="text-muted-foreground">Ordering Cost (S)</span>
                            <span className="font-medium">{formatRupiah(orderingCost)}</span>
                            <span className="text-muted-foreground">Holding Cost (H)</span>
                            <span className="font-medium">{formatRupiah(holdingCost)}</span>
                        </div>

                        <div className="rounded-md bg-muted px-4 py-3 space-y-2">
                            <p className="text-xs text-muted-foreground">Rumus EOQ</p>
                            <p className="font-mono text-sm">√((2 × D × S) / H)</p>

                            <p className="text-xs text-muted-foreground">Substitusi</p>
                            <p className="font-mono text-sm">
                                √((2 × {annualDemand.toLocaleString()} ×{" "}
                                {orderingCost.toLocaleString("id-ID")}) /{" "}
                                {holdingCost.toLocaleString("id-ID")})
                            </p>

                            <div className="pt-1">
                                <p className="text-xs text-muted-foreground">Hasil EOQ</p>
                                <p className="text-[15px] font-semibold mt-0.5">
                                    {recommendedOrder} unit
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="rounded-lg border p-4 space-y-3">
                        <div className="flex items-center gap-2 font-semibold">
                            <HiOutlineClipboardDocumentCheck size={18} />
                            <span>Perhitungan ROP</span>
                        </div>
                        <div className="grid grid-cols-2 gap-y-2">
                            <span className="text-muted-foreground">Demand Harian</span>
                            <span className="font-medium">
                                {averageDailyDemand.toFixed(2)} unit
                            </span>

                            <span className="text-muted-foreground">Lead Time</span>
                            <span className="font-medium">{leadTimeDays} hari</span>

                            <span className="text-muted-foreground">Safety Stock</span>
                            <span className="font-medium">{safetyStock} unit</span>
                        </div>
                        <div className="rounded-md bg-muted px-4 py-3 space-y-2">
                            <p className="text-xs text-muted-foreground">Rumus ROP</p>
                            <p className="font-mono text-sm">
                                (Demand Harian × Lead Time) + Safety Stock
                            </p>

                            <p className="text-xs text-muted-foreground">Substitusi</p>
                            <p className="font-mono text-sm">
                                ({averageDailyDemand.toFixed(2)} × {leadTimeDays}) +{" "}
                                {safetyStock}
                            </p>

                            <div className="pt-1">
                                <p className="text-xs text-muted-foreground">Hasil ROP</p>
                                <p className="text-[15px] font-semibold mt-0.5">
                                    {reorderPoint} unit
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
                <DialogFooter>
                    <Button
                        className="min-w-20"
                        onClick={() => onOpenChange(false)}
                    >
                        OK
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}