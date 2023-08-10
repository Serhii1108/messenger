export const DEBOUNCE_TIME = 300;
export const CHECK_STATUS_INTERVAL = 15000;

export enum socketEvents {
  JOIN_ROOM = 'join_room',
  SEND_MESSAGE = 'send_message',
  SHARE_MESSAGE = 'share_message',
  CHAT_ONLINE = 'chat_online',
  CHAT_OFFLINE = 'chat_offline',
  CHECK_ONLINE = 'check_online',
}
