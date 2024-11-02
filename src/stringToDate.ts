export default function stringToDate(date: string): Date {
  const [data, time] = date.split(" ");
  const [day, month, year] = data.split("/").map(Number);
  const [hours, minutes] = time.split(":").map(Number);
  return new Date(year, month - 1, day, hours, minutes);
}
