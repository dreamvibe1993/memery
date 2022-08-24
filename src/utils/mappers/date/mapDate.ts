export const mapDateTo = (type: "DDMMYYYY", date: string): string => {
  if (!date) date = new Date().toISOString();
  let options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };
  if (type === "DDMMYYYY") {
    return new Date(date).toLocaleDateString("ru-RU", options);
  }
  return date;
};
