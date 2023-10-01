import moment from "moment";

export const formatDDMMYYYY = (date: Date): string => {
    return moment(date).format("DD/MM/yyyy");
}