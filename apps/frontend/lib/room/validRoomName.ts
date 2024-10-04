export function validateRoomName(name: string): boolean {
  const valid = /^[a-zA-Z0-9_-]{3,20}$/.test(name);
  return valid;
}
