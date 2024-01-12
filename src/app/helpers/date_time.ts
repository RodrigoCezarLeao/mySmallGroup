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

export const formatYearMonthDay = (date: Date) => {
    return `${date.getFullYear()}-${(date.getMonth()+1).toString().padStart(2, "0")}-${(date.getDate()).toString().padStart(2, "0")}`;
}

export const isItToday = (day: string, date: Date) => {
    return day === date.getDate().toString();
}