export const dateFormat = (dateStr) => {
  if (!dateStr) return "--";
  try {
    const [year, month, day] = dateStr.split("-");
    const date = new Date(year, month - 1, day);
    return `${date.getDate()} ${date.toLocaleString("default", {
      month: "short",
    })}`;
  } catch {
    return "--";
  }
};

export const timeFormat = (timeStr) => {
  if (!timeStr) return "--:--";
  try {
    return timeStr.substring(0, 5); // Gets "14:30" from "14:30:00"
  } catch {
    return "--:--";
  }
};
