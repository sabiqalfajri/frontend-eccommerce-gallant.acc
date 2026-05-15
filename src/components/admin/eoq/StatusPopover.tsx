import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { AiOutlineQuestionCircle } from "react-icons/ai"

const STATUS_INFO = [
    { 
        color: "bg-green-100 text-green-700 border-green-200",  
        label: "Optimal",          
        desc: "Stok masih ideal dan belum perlu restock" 
    },
    { 
        color: "bg-yellow-100 text-yellow-700 border-yellow-200", 
        label: "Reorder",  
        desc: "Produk disarankan untuk segera restock" 
    },
    { 
        color: "bg-red-100 text-red-700 border-red-200",        
        label: "Critical",            
        desc: "Stok sangat rendah dan berisiko habis" 
    },
    { 
        color: "bg-blue-100 text-blue-700 border-blue-200",     
        label: "Overstock",         
        desc: "Jumlah stok melebihi kebutuhan optimal" 
    },
    { 
        color: "bg-gray-100 text-gray-500 border-gray-200",     
        label: "Unknown",  
        desc: "Data penjualan belum cukup untuk analisis EOQ" 
    },
]

export const StatusPopover = () => (
    <Popover>
        <PopoverTrigger asChild>
            <button className="cursor-pointer p-0.5">
                <AiOutlineQuestionCircle size={16} />
            </button>
        </PopoverTrigger>
        <PopoverContent 
            className="w-80 p-3" 
            align="end"
        >
            <h4 className="text-sm font-semibold text-gray-500">Keterangan Status</h4>
            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                Status ditentukan berdasarkan perbandingan stok saat ini dengan hasil rekomendasi EOQ.
            </p>

            <div className="flex flex-col gap-2 my-2.5">
                {STATUS_INFO.map(({ color, label, desc }) => (
                    <div key={label} className="grid grid-cols-[1fr_3fr] items-center gap-3">
                        <Badge variant="outline" className={`${color} text-xs shrink-0 mt-0.5`}>
                            {label}
                        </Badge>
                        <p className="text-xs text-muted-foreground leading-tight">{desc}</p>
                    </div>
                ))}
            </div>
        </PopoverContent>
    </Popover>
)