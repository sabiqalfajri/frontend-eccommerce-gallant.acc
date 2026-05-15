import { ComboboxCustom } from "@/components/common/ComboboxCustom";
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EOQConfigFormValues, eoqConfigSchema } from "@/schema/admin/EOQSchema";
import { EOQConfig } from "@/types/EOQ";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { ClipLoader } from "react-spinners";

interface ModalConfigureProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    isLoading?: boolean;
    onConfirm?: (data: EOQConfigFormValues) => void
    initialData?: EOQConfig
}

export const ModalConfigure = ({
    isOpen,
    onOpenChange,
    isLoading,
    onConfirm,
    initialData
}: ModalConfigureProps) => {
    const { 
        handleSubmit, 
        watch, 
        setValue, 
        reset,
        control,
        formState: { errors }, 
    } = useForm<EOQConfigFormValues>({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        resolver: zodResolver(eoqConfigSchema) as any,
        defaultValues: {
            orderingCost: initialData?.orderingCost ?? 0,
            holdingCost: initialData?.holdingCost ?? 0,
            periodMonths: initialData?.periodMonths ?? 3
        }
    });
    const isEditMode = !!initialData

    useEffect(() => {
        if(isOpen) {
            reset({
                orderingCost: initialData?.orderingCost ?? 0,
                holdingCost: initialData?.holdingCost ?? 0,
                periodMonths: initialData?.periodMonths ?? 3
            })
        }
    }, [isOpen, initialData, reset])

    const periodOptions = [
        {
            label: '1 Bulan Terakhir',
            value: '1'
        },
        {
            label: '3 Bulan Terakhir',
            value: '3'
        },
        {
            label: '6 Bulan Terakhir',
            value: '6'
        },
        {
            label: '12 Bulan Terakhir',
            value: '12'
        },
    ]

    const onSubmit = (data: EOQConfigFormValues) => {
        onConfirm?.(data)
    }

    const handleClose = () => {
        reset({
            orderingCost: initialData?.orderingCost ?? 0,
            holdingCost: initialData?.holdingCost ?? 0,
            periodMonths: initialData?.periodMonths ?? 3,
        })
        onOpenChange(false)
    }

    return (
        <Dialog 
            open={isOpen} 
            onOpenChange={(open) => !open && handleClose()}
        >
            <DialogContent
                onOpenAutoFocus={(e) => {
                    if(isEditMode) e.preventDefault()
                }}
            >
                <DialogHeader>
                    <DialogTitle>Konfigurasi EOQ</DialogTitle>
                    <DialogDescription>
                        Atur parameter yang akan digunakan untuk perhitungan rekomendasi restock produk.
                    </DialogDescription>
                </DialogHeader>
                <form 
                    onSubmit={handleSubmit(onSubmit)}
                    className={`flex flex-col gap-5 pt-4 ${isLoading && 'pointer-events-none opacity-50'}`}
                >
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="ordering-cost" className="text-[13px]">
                            Ordering Cost (S)
                        </Label>
                        <div
                            className={`
                                flex items-center rounded-md 
                                border-[1.3px] border-input
                                shadow-xs
                                transition-colors
                                focus-within:border-primary
                            `}
                        >
                            <div className="px-3 text-[13px] font-medium text-gray-500 border-r bg-gray-50 self-stretch flex items-center rounded-l-md">
                                Rp
                            </div>

                            <Controller 
                                name="orderingCost"
                                control={control}
                                render={({ field: { onChange, onBlur, value, ref } }) => (
                                    <NumericFormat
                                        customInput={Input}
                                        className="
                                            border-0
                                            shadow-none
                                            focus-visible:ring-0
                                            focus-visible:ring-offset-0
                                            rounded-l-none
                                        "
                                        thousandSeparator="."
                                        decimalSeparator=","
                                        decimalScale={2}
                                        fixedDecimalScale={false}
                                        allowNegative={false}
                                        value={value ?? null}
                                        onValueChange={(values) => {
                                            const { floatValue } = values
                                            onChange(floatValue == null ? null : floatValue)
                                        }}
                                        onBlur={onBlur}
                                        getInputRef={ref}
                                    />
                                )}
                            />
                        </div>
                        {errors.orderingCost && <p className="text-red-500 text-[12px]">{errors.orderingCost.message}</p>}
                        {/* <span className="text-[11px] text-gray-500">
                            Biaya pemesanan
                        </span> */}
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="holding-cost" className="text-[13px]">
                            Holding Cost (H)
                        </Label>
                        <div
                            className={`
                                flex items-center rounded-md 
                                border-[1.3px] border-input
                                shadow-xs
                                transition-colors
                                focus-within:border-primary
                            `}
                        >
                            <div className="px-3 text-[13px] font-medium text-gray-500 bg-gray-50 self-stretch flex items-center rounded-l-md">
                                Rp
                            </div>

                            <Controller 
                                name="holdingCost"
                                control={control}
                                render={({ field: { onChange, onBlur, value, ref } }) => (
                                    <NumericFormat
                                        customInput={Input}
                                        className="
                                            border-0
                                            shadow-none
                                            focus-visible:ring-0
                                            focus-visible:ring-offset-0
                                            rounded-l-none
                                        "
                                        thousandSeparator="."
                                        decimalSeparator=","
                                        decimalScale={2}
                                        fixedDecimalScale={false}
                                        allowNegative={false}
                                        value={value ?? null}
                                        onValueChange={(values) => {
                                            const { floatValue } = values
                                            onChange(floatValue == null ? null : floatValue)
                                        }}
                                        onBlur={onBlur}
                                        getInputRef={ref}
                                    />
                                )}
                            />
                        </div>
                        {errors.holdingCost && <p className="text-red-500 text-[12px]">{errors.holdingCost.message}</p>}
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label className="text-[13px]">
                            Periode Analisis
                        </Label>
                        <ComboboxCustom
                            options={periodOptions}
                            className="w-full"
                            contentClassName="!w-full !max-w-none"
                            placeholder="Pilih opsi periode"
                            value={watch("periodMonths").toString()}
                            onChange={(value) => {
                                setValue("periodMonths", Number(value), { shouldValidate: true });
                            }}
                        />
                        {errors.periodMonths && <p className="text-red-500 text-[12px]">{errors.periodMonths.message}</p>}
                        {/* <span className="text-[11px] text-gray-500">
                            Periode data penjualan yang digunakan untuk menghitung permintaan (demand).
                        </span> */}
                    </div>

                    <DialogFooter>
                        <Button 
                            type="button"
                            variant="outline"
                            disabled={isLoading}
                            onClick={handleClose}
                        >
                            Batal
                        </Button>
                        <Button 
                            type="submit"
                            disabled={isLoading}
                            className="min-w-24"
                        >
                            {isLoading 
                                ? <ClipLoader size={24} color="white" />
                                : 'Simpan'
                            }
                        </Button>
                    </DialogFooter>
                </form>
                
            </DialogContent>
        </Dialog> 
    )
}