import moment from "moment";

export function toUtc(date, format?: string) {
  return moment.utc(date, format ?? "DD/MM/YYYY HH:mm:ss").format("");
}
export function toLocale(date) {
  return moment.utc(date, "").local().format("DD/MM/YYYY HH:mm:ss");
}
export function toLocaleDateFormat(date) {
  return moment.utc(date, "").local().toDate();
}

export function convertRawDateToUtc(date) {
  const rawDate = moment(date, "DD/MM/YYYY HH:mm:ss").format("");
  return moment.utc(rawDate).format("") as any;
}
export function toLocaleTimeOnly(time) {
  return moment.utc(time, "HH:mm:ss").local().format("HH:mm:ss");
}
export function toUtcTimeOnly(time) {
  return moment.utc(moment(time, "HH:mm:ss").format("")).format("HH:mm:ss");
}
