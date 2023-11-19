import moment from "moment";
import { TRANSLATE_TERMS } from "src/utils/messageTerms";


const millisecondInDay = 1000 * 60 * 60 * 24;

const MinutesInDay = 1000 * 60;
const HoursInDay = 1000 * 60 * 60;
const DayInMonth = 1000 * 60 * 60 * 24;

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

export const formatSmartCurrent = (date: Date): string => {
    if (isDateToday(date)) {
        const current = new Date();
        const before = current.getTime() - date.getTime();

        if (before < 5 * MinutesInDay)
            return TRANSLATE_TERMS.JUST_VISITED
        else if (before / MinutesInDay > 60) {
            return TRANSLATE_TERMS.get("HOURS_VISITED", { hours: Math.floor(before / HoursInDay) })
        } else if (before > 5 * MinutesInDay) {
            return TRANSLATE_TERMS.get("MINUTES_VISITED", { munites: Math.floor(before / MinutesInDay) })
        }
        return formatHHMM(date);
    }
    return formatDDMMYYYY(date);
}

export const formatSmartDay = (date: Date): string => {
    const current = new Date();
    const before = current.getTime() - date.getTime();
    if (isDateToday(date)) {
        if (before < 5 * MinutesInDay)
            return TRANSLATE_TERMS.JUST_POSTED;
        else if (before / MinutesInDay > 60) {
            return TRANSLATE_TERMS.get("HOURS_POSTED", { hours: Math.floor(before / HoursInDay) })
        } else if (before > 5 * MinutesInDay) {
            return TRANSLATE_TERMS.get("MINUTES_POSTED", { minutes: Math.floor(before / MinutesInDay) })
        }
    }
    if (before > DayInMonth) {
        return TRANSLATE_TERMS.get("DAYS_POSTED", { days: Math.floor(before / DayInMonth) })
    }

    return formatDDMMYYYY(date);
}
