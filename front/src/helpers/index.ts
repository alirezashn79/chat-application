export function AvatarMaker(firstName: string, lastName: string) {
  return `${firstName.toUpperCase()}${lastName.toUpperCase()}`;
}

export function convertDate(value: Date) {
  const dateTime = new Date(value);
  const time = dateTime
    .toLocaleTimeString("fa-ir", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    })
    .split(" ")[0];
  return `${time}`;
}
