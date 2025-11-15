export const FormatNumber = (val: string) => {
    const num = val.replace(/\D/g, "");
    if(!num) return "";
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}