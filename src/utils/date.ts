import { differenceInHours } from "date-fns";

function hourDiff(end_date: Date | string, start_date: Date | string): number {
  return differenceInHours(new Date(end_date), new Date(start_date));
}

export { hourDiff };
