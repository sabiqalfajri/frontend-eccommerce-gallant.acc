import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime"
import updateLocale from "dayjs/plugin/updateLocale";
import "dayjs/locale/id"

dayjs.extend(relativeTime);
dayjs.extend(updateLocale)
dayjs.locale('id');

dayjs.updateLocale("id", {
    relativeTime: {
        future: "dalam %s",
        past: "%s yang lalu",
        s: "%d detik",
        m: "1 menit",
        mm: "%d menit",
        h: "1 jam",
        hh: "%d jam",
        d: "1 hari",
        dd: "%d hari",
        w: "1 minggu",    
        ww: "%d minggu",  
        M: "1 bulan",
        MM: "%d bulan",
        y: "1 tahun",
        yy: "%d tahun",
    }
})

export const TimeAgo = (date: string | Date) => {
    const now = dayjs()
    const input = dayjs(date)

    if (now.diff(input, "day") > 30) {
        return input.format("D MMM YYYY - HH:mm [WIB]");
    }

    return input.fromNow();
}