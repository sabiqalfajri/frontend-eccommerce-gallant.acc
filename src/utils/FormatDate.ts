import dayjs from "dayjs";
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"

dayjs.extend(utc)
dayjs.extend(timezone);

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