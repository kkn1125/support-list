export const format = (time: number | Date, form: string) => {
  if (!time) throw new Error("invalid time");
  const base = new Date(time);
  return form.replace(/YYYY|MM|dd|HH|mm|ss|SSS|AP/g, ($1: string) => {
    const year = base.getFullYear();
    const month = base.getMonth() + 1;
    const date = base.getDate();
    const hour = base.getHours();
    const minute = base.getMinutes();
    const second = base.getSeconds();
    const milliseconds = base.getMilliseconds();
    const isOver = hour > 12;

    switch ($1) {
      case "YYYY":
        return year.toString().padStart(4, "0");
      case "MM":
        return month.toString().padStart(2, "0");
      case "dd":
        return date.toString().padStart(2, "0");
      case "HH":
        return hour.toString().padStart(2, "0");
      case "mm":
        return minute.toString().padStart(2, "0");
      case "ss":
        return second.toString().padStart(2, "0");
      case "SSS":
        return milliseconds.toString().padStart(3, "0");
      case "AP":
        return isOver ? "PM" : "AM";
      default:
        return $1;
    }
  });
};
