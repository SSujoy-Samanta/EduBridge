
import { atom } from 'recoil';
//notification
export const notificationState = atom({
  key: 'notificationState',
  default: null as { msg?: string; type?: "success" | "error" } | null,
});
export const videoMutedState = atom({
  key: 'videoMutedState',
  default: false,
});
export const audioMutedState = atom({
  key: 'audioMutedState',
  default: false,
});
