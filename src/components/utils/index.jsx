import { format, addYears } from "date-fns";

export function dateFormatting(data) {
  if (data === "") {
    return "date is not defined";
  }
  const dat = addYears(new Date(data), 1);
  return format(dat, "MMMM dd, yyyy");
}

export function koncut(text, limit) {
  const re = new RegExp("(^.{" + (limit - 1) + "}([^ ]+|\\s))(.*)");
  if (text) {
    const result = text.replace(re, "$1");
    return `${result}`;
  }
}
