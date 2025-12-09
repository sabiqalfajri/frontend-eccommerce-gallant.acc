import dayjs from "dayjs";
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"
import "dayjs/locale/id"; 

dayjs.extend(utc)
dayjs.extend(timezone);
dayjs.locale("id");

export const FormatDate = (dateStr?: string, mode?: "space" | "stripe") => {
    if(!dateStr) return "-"
    switch (mode) {
        case 'space':
            return dayjs.utc(dateStr).tz("Asia/Jakarta").format("DD MMM YYYY HH:mm");
        case 'stripe':
            return dayjs.utc(dateStr).tz("Asia/Jakarta").format("DD/MM/YYYY - HH:mm") + " WIB";
        default:
            return dayjs.utc(dateStr).tz("Asia/Jakarta").format("DD MMM YYYY - HH:mm") + " WIB";
    }
};

export const FormatDateWithoutWib = (dateStr?: string) => {
    if(!dateStr) return "-"
    return dayjs.utc(dateStr).tz("Asia/Jakarta").format("DD MMM YYYY")
}

export const FormatDateWithDay = (dateStr?: string) => {
    if(!dateStr) return "-"
    return dayjs.utc(dateStr).tz("Asia/Jakarta").format("ddd, DD MMM YYYY");
}