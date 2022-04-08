export function getLastWeek() {
  const week = 86400000 * 7;
  const lastWeek = new Date(Date.now() - week);
  return `${lastWeek.getFullYear()}-${("0" + (lastWeek.getMonth() + 1)).slice(
    -2
  )}-${("0" + lastWeek.getDate()).slice(-2)}`;
}
