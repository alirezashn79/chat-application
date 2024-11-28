export function AvatarMaker(firstName: string, lastName: string) {
  return `${firstName.toUpperCase()}${lastName.toUpperCase()}`;
}

export function convertDate(value: Date) {
  const dateTime = new Date(value);
  const time = dateTime.toTimeString().split(" ")[0];
  return `${time}`;
}
