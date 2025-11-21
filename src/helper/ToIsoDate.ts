export const ToISODate = (dateString: string) => {
    return dateString.replace(" ", "T") + "+07:00"; 
};