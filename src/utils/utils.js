export function hoursAgo(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const millisecondsDifference = now - date;
  const hoursDifference = Math.floor(millisecondsDifference / (1000 * 60 * 60));

  return `${hoursDifference} hours ago`;
}
