export function formatDate(dateString: string): string {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const date = new Date(dateString);
  const month = months[date.getMonth()];
  const year = String(date.getFullYear());
  const dayOfMonth = String(date.getDate());
  return `${dayOfMonth} ${month} ${year}`;
}
