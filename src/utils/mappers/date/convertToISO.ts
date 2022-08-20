export const convertToISO = (ddmmyyyy: string): string => {
  const dateArr = ddmmyyyy.split(".").map((d: string) => Number(d));
  return new Date(dateArr[2], dateArr[1] - 1, dateArr[0]).toISOString();
};
