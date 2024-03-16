/* eslint-disable prettier/prettier */
import moment from "moment";

export const today = moment().format("MM-DD-YYYY");
export const tomorrow = moment().add(1, "days").format("MM-DD-YYYY");
export const yesterday = moment().subtract(1, "days").format("MM-DD-YYYY");
export const lastMonth = moment().subtract(1, "months").format("MM-DD-YYYY");

export const momentToday = moment().startOf("day");
export const momentTomorrow = moment(today).add(1, "day");
// return the time of now
export const thisTime = moment().format("HH:mm:ss");
export const startOfTodayUtc = moment()
  .startOf("day")
  .utc()
  .format("YYYY-MM-DD HH:mm:ss");

export const thisMoment = moment().format("YYYY-MM-DD HH:mm:ss");
export const endOfTodayUtc = moment()
  .endOf("day")
  .utc()
  .format("YYYY-MM-DD HH:mm:ss");
export const startOfToday = moment()
  .startOf("day")
  .format("YYYY-MM-DD HH:mm:ss");

export const startOfTodayDefaultNumber = moment()
  .hour(0) // Set hour to 0
  .minute(0) // Set minute to 0
  .second(0) // Set second to 0
  .format("YYYY-MM-DD HH:mm:ss");

export const startOfTodayUtcTimeStamp = moment().startOf("day").format("");
export const endOfTodayUtcTimeStamp = moment().endOf("day").format("");
export const endOfToday = moment().endOf("day").format("YYYY-MM-DD HH:mm:ss");

export function toLocalTimeFormat(time) {
  return moment.utc(time).local().format("HH:mm:ss");
}
export function toLocalDateFormat(date) {
  return moment.utc(date).local().format("DD-MM-YYYY ");
}
export function customRequestFormFormat(form, cond) {
  for (const field in form) {
    switch (cond[field]) {
      case "utcHour":
        form[field] = utcHour(form, field);
        break;
      case "RequestDateFormat":
        form[field] = RequestDateFormat(form, field);
        break;
      case "YearFormat":
        form[field] = toYearFormat(form, field);
        break;
      case "requestDateYearFirst":
        form[field] = yearFirst(form, field);
        break;
      case "getId":
        form[field] = getId(form, field);
        break;
      case "getUserId":
        form[field] = getUserId(form, field);
        break;
      case "stringToDate":
        form[field] = stringToDate(form, field);
        break;
      case "dateToTimeSpam": {
        form[field] = moment(form[field]).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
      }
      // eslint-disable-next-line no-fallthrough
      case "dateToUtcTimeSpam": {
        form[field] = form[field]
          ? moment(form[field])
              .hour(+moment(form[field]).format("HH"))
              ?.utc()
              ?.format("YYYY-MM-DDTHH:mm:ss.SSS[Z]")
          : form[field];
      }
    }
  }
  return form;
}
export function utcHour(form, field) {
  return form[field]
    ? parseInt(moment().hour(form[field])?.utc()?.format("HH"))
    : form[field];
}
function RequestDateFormat(form, field) {
  const result = moment(form[field])?.format("MM-DD-YYYY");
  return result;
}
function toYearFormat(form, field) {
  const result = moment(form[field])?.format("YYYY");
  return result;
}
function yearFirst(form, field) {
  const result = moment(form[field])?.format("YYYY-MM-DD");
  return result;
}
function getId(form, field) {
  const result = form[field]?.id ?? form[field];
  return result;
}
function getUserId(form, field) {
  const result = form[field]?.uid ?? form[field];
  return result;
}
function stringToDate(form, field) {
  const result = new Date(form[field]);
  return result;
}
