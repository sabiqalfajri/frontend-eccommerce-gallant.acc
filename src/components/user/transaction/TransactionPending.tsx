import { Button } from "@/components/ui/button";
import { TransactionResponse } from "@/types/Transaction";
import { BsInfoCircle } from "react-icons/bs";
import QRCode from "react-qr-code";
import { LuRefreshCcw } from "react-icons/lu";
import { IoCopyOutline } from "react-icons/io5";
import { FormatDate } from "@/utils/FormatDate";
import { useCountdown } from "@/hooks/universal/useCoutdown";
import { ClipLoader } from "react-spinners";
import { ToISODate } from "@/helper/ToIsoDate";

interface TransactionPendingProps {
    transaction: TransactionResponse
    refetch: () => void
    isRefetching: boolean
}

export const TransactionPending = ({
    transaction,
    refetch,
    isRefetching
}: TransactionPendingProps) => {
    const time = useCountdown(transaction.qrisExpiryAt);
    console.log("expiry raw:", transaction.qrisExpiryAt);
    console.log("expiry iso:", ToISODate(transaction.qrisExpiryAt));
    console.log("parsed:", new Date(ToISODate(transaction.qrisExpiryAt)));

    return (
        <div className="flex justify-center items-center px-2">
            <div className="flex flex-col gap-3 w-full md:w-[25rem]">
                <div className="flex flex-col gap-1.5 bg-white rounded-md p-4">
                    <div className="flex flex-wrap justify-between items-center text-sm md:text-[15px]">
                        <div className="flex flex-col">
                            <p className="text-gray-600">Bayar Sebelum</p>
                            <p className="font-semibold text-sm md:text-[15px]">
                                {FormatDate(transaction.qrisExpiryAt)}
                            </p>
                        </div>
                        <div className="flex flex-wrap items-center gap-1 text-sm text-primary">
                            <div className="bg-primary-light px-1.5 py-1 rounded-md">
                                {String(time?.minutes ?? "00").padStart(2, "0")}
                            </div>
                            :
                            <div className="bg-primary-light px-1.5 py-1 rounded-md">
                                {String(time?.seconds ?? "00").padStart(2, "0")}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-nowrap items-center gap-x-2 bg-gray-100 text-xs md:text-sm rounded-md px-2.5 py-1.5">
                        <BsInfoCircle size={16} className="shrink-0" />
                        <p>Pembayaran dapat dilakukan melalui e-wallet atau aplikasi mobile banking yang didukung.</p>
                    </div>
                </div>
                <div className="relative flex flex-col items-center gap-5 bg-primary h-fit pt-4 pb-12 px-5 rounded-md text-white">
                    <div className="flex flex-wrap justify-between w-full">
                        <div className="flex justify-center items-center w-16 h-12">
                            <img src="/images/qris.svg" 
                                alt="" 
                                className="w-14 h-10 object-contain brightness-0 invert" 
                            />
                        </div>
                        <div className="flex justify-center items-center w-16 h-12">
                            <img src="/images/gpn.svg" 
                            alt="" 
                            className="w-full h-full object-contain brightness-0 invert mb-1" 
                            />
                        </div>
                    </div>
                    <div className="bg-white w-[70%] rounded-md p-4 flex items-center justify-center">
                        <QRCode 
                            value={transaction.qrisUrl}
                            style={{ width: "90%", height: "90%" }}
                            viewBox={`0 0 256 256`}
                        />
                    </div>

                    <div className="absolute flex flex-col gap-2 items-center justify-center -bottom-[4.4rem] shadow-[0_0_10px_rgba(0,0,0,0.12)] bg-white rounded-3xl w-full h-fit py-3 px-5">
                        <div className="flex flex-wrap justify-between items-center text-black w-full">
                            <p>Total</p>
                            <p className="font-bold">
                                Rp{transaction.totalAmount.toLocaleString("id-ID")}
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-x-2 w-full">
                            <Button 
                            size="lg"
                            variant="outlinePrimary"
                            onClick={() => refetch()}
                            >
                                {isRefetching ? (
                                    <>
                                        <ClipLoader size={22} color="primary" />
                                        Memuat...
                                    </>
                                ) : (
                                    <>
                                        <LuRefreshCcw />
                                        Cek Status
                                    </>
                                )}
                            </Button>
                            <Button size="lg" variant="default">
                                <IoCopyOutline />
                                Salin Kode
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}