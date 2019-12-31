/* The current year */
export const C_YEAR: number = +(new Date().getFullYear());

/* The current month; 
 *1 => January, 12 => December */
export const C_MONTH: number = +(new Date().getMonth()) + 1;

/* Week days names; 
 * Default Values; */
export const D_WEEK_DAYS: object = {
  Sunday: "Sun",
  Monday: "Mon",
  Tuesday: "Tue",
  Wednesday: "Wed",
  Thursday: "Thu",
  Friday: "Fri",
  Saturday: "Sat"
};

/* Months names;
 * Default values */
export const D_MONTHS: object = {
  January: "Jan",
  February: "Feb",
  March: "Mar",
  April: "Apr",
  May: "May",
  June: "Jun",
  July: "Jul",
  August: "Aug",
  September: "Sep",
  October: "Oct",
  November: "Nov",
  December: "Dec"
}

/* display the max number of weeks */
export const M_WEEKS: number = 6;

/* Pads a string value with leading zeroes(0) until length is reached */
export const zeroPad = (value: string, length: number): string => {
  return `${value}`.padStart(length, '0');
}

/* return how many days include in the target month. */
export const getMonthDays = (month: number = C_MONTH, year: number = C_YEAR): number => {
  const months30 = [4, 6, 9, 11];   // the months which has 30 days
  const leapYear = year % 4 === 0;  // whether leap year?

  return month === 2
    ? leapYear
      ? 29
      : 28
    : months30.includes(month)
      ? 30
      : 31;
}

/* check the first day of the month in week */
export const getMonthFirstDay = (month: number = C_MONTH, year: number = C_YEAR): number => {
  return +(new Date(`${year}-${zeroPad(month.toString(), 2)}-01`).getDay()) + 1;
}

/* checks if a value is a date - this is just a simple check */
export const isDate = (date: Date): boolean => {
  const isDate = Object.prototype.toString.call(date) === '[object Date]';
  const isValidDate = date && !Number.isNaN(date.valueOf());

  return isDate && isValidDate;
}

/* transfor the date into 'YY-MM-DD' */
export const getDateStr = (date: Date = new Date()): string | null => {
  return isDate(date)
    ? [date.getFullYear(), date.getMonth() + 1, date.getDate()]
      .map(v => String(v).padStart(2, '0'))
      .join('-')
    : null;
}

/* according to the input date return the number of year, month, day */
export const getDateArray = (date: Date = new Date()): Array<number | null> => {
  const [year = null, month = null, day = null] = (getDateStr(date) || '').split('-').map(v => +v);
  return [year, month, day];
}


interface MonthInfo {
  month: number | null,
  year: number | null,
};

/* Get the previous month and year */
export const getPreviousMonth = (date: Date = new Date()): MonthInfo => {
  const [year, month] = getDateArray(date);
  if (!year || !month) {
    return { month: null, year: null };
  }
  return {
    month: month > 1 ? month - 1 : 12,
    year: month > 1 ? year : year - 1
  }
}

/* Get the next month and year */
export const getNextMonth = (date: Date = new Date()): MonthInfo => {
  const [year, month] = getDateArray(date);
  if (!year || !month) {
    return { month: null, year: null };
  }
  return {
    month: month < 12 ? month + 1 : 1,
    year: month < 12 ? year : year + 1
  };
}

/* calc the days between two dates, 
 * the default value of date2 is today,
 * if one of the dates is invalid return null */
export const dateDiff = (date1: Date, date2: Date = new Date()): number | null => {
  return isDate(date1) && isDate(date2)
    ? (new Date(+date1).setHours(0, 0, 0, 0)) - (new Date(+date2).setHours(0, 0, 0, 0))
    : null;
}

/* check whether date1 is before date2,
 * if one of the dates is invalid return null */
export const isBeforeDay = (date1: Date, date2: Date): boolean | null => {
  const _result = dateDiff(date1, date2);
  return _result ? +_result < 0 : null;
}

/* check whether date1 is after date2,
 * if one of the dates is invalid return null */
export const isAfterDay = (date1: Date, date2: Date): boolean | null => {
  const _result = dateDiff(date1, date2);
  return _result ? +_result > 0 : null;
}

/* check whether date1 and date2 is same day */
export const isSameDay = (date1: Date, date2: Date): boolean => dateDiff(date1, date2) === 0

/* check whether date1 and date2 is same month */
export const isSameMonth = (date1: Date, date2: Date): boolean => {
  return isDate(date1) && isDate(date2)
    ? new Date(+date1).setDate(1) - new Date(+date2).setDate(1) === 0
    : false;
}

export const getCurrentViewDays = (date: Date): Array<Array<number>> => {

  const [year, month] = getDateArray(date);
  if (!year || !month) {
    return [];
  }
  const monthDays = getMonthDays(+month, +year);
  const monthFirstDay = getMonthFirstDay(+month, +year);

  const daysFromPrevMonth = monthFirstDay - 1;
  const daysFromNextMonth = (M_WEEKS * 7) - (daysFromPrevMonth + monthDays);

  const { month: prevMonth, year: prevMonthYear } = getPreviousMonth(date);
  const { month: nextMonth, year: nextMonthYear } = getNextMonth(date);

  let prevMonthDates: Array<Array<number>> = [];
  if (prevMonth && prevMonthYear) {
    const prevDate = new Date(prevMonthYear, prevMonth);
    const prevMonthDays = getMonthDays(prevDate.getMonth(), prevDate.getFullYear());
    prevMonthDates = [...new Array(daysFromPrevMonth)].map((n, index) => [prevMonthYear, prevMonth, index + 1 + (prevMonthDays - daysFromPrevMonth)]);
  }

  const thisMonthDates: Array<Array<number>> = [...new Array(monthDays)]
    .map((n, index) => [year, month, index + 1]);

  let nextMonthDates: Array<Array<number>> = [];
  if (nextMonth && nextMonthYear) {
    nextMonthDates = [...new Array(daysFromNextMonth)].map((n, index) => [nextMonthYear, nextMonth, index + 1]);
  }

  return [...prevMonthDates, ...thisMonthDates, ...nextMonthDates];
}