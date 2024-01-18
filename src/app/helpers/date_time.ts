export const howManyDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

export const firstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
}

export const formatMonthYear = (date: Date) => {
    return `${(date.getMonth()+1).toString().padStart(2, "0")}/${date.getFullYear()}`;
}

export const formatDayMonthYear = (date: Date) => {
    return `${(date.getDate()).toString().padStart(2, "0")}/${(date.getMonth()+1).toString().padStart(2, "0")}/${date.getFullYear()}`;
}

export const formatAbbDayMonthYear = (date: Date) => {
    return `${(date.getDate()).toString().padStart(2, "0")}/${(date.getMonth()+1).toString().padStart(2, "0")}`;
    ///${date.getFullYear().toString().replace("20", "")}
}

export const formatYearMonthDay = (date: Date) => {
    return `${date.getFullYear()}-${(date.getMonth()+1).toString().padStart(2, "0")}-${(date.getDate()).toString().padStart(2, "0")}`;
}

export const isItToday = (day: string, date: Date) => {
    return day === date.getDate().toString();
}

export const isStrDateWindowValid = (date1: string, date2: string) => {
    if (!date1 || date1.length !== 10 || !date1.includes("-"))
        return false;

    if (!date2 || date2.length !== 10 || !date2.includes("-"))
        return false;
    
    if (date1 > date2)
        return false;
    
    return true;
}