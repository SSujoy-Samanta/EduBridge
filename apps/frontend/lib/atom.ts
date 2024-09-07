
import { atom } from 'recoil';
//notification
export const notificationState = atom({
  key: 'notificationState',
  default: null as { msg?: string; type?: "success" | "error" } | null,
});
