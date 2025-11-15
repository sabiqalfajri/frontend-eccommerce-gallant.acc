export const CapitalizeText = (text: string | undefined | null): string => {
    if(!text) return "";
    return text
    .toLocaleLowerCase()
    .split(/[\s-']/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}