import moment from "moment";


const millisecondInDay = 1000 * 60 * 60 * 24;

export const formatDDMMYYYY = (date: Date): string => {
    return moment(date).format("DD/MM/yyyy");
}

export const formatHHMMDDMMYYYY = (date: Date): string => {
    return moment(date).format("HH:mm DD/MM/yyyy");
}

export const formatHHMM = (date: Date): string => {
    return moment(date).format("HH:mm");
}


const isDateToday = (date: Date): boolean => {
    const today = Math.ceil(new Date().getTime() / millisecondInDay);

    return today == Math.ceil(date.getTime() / millisecondInDay);
}

export const formatSmartToday = (date: Date): string => {
    if (isDateToday(date)) {
        return formatHHMM(date);
    }
    return formatHHMMDDMMYYYY(date);
}
