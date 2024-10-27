export function hoursAgo(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const millisecondsDifference = now - date;

  const daysDifference = Math.floor(
    millisecondsDifference / (1000 * 60 * 60 * 24)
  );
  const hoursDifference = Math.floor(
    (millisecondsDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutesDifference = Math.floor(
    (millisecondsDifference % (1000 * 60 * 60)) / (1000 * 60)
  );

  if (daysDifference === 0 && hoursDifference === 0) {
    return `${minutesDifference} minute${
      minutesDifference !== 1 ? "s" : ""
    } ago`;
  } else if (daysDifference > 0) {
    return `${daysDifference} day${
      daysDifference !== 1 ? "s" : ""
    } and ${hoursDifference} hour${hoursDifference !== 1 ? "s" : ""} ago`;
  } else {
    return `${hoursDifference} hour${hoursDifference !== 1 ? "s" : ""} ago`;
  }
}
