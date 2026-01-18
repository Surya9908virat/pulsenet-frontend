import {io } from 'socket.io-client'
export const socket = io(
  "https://pulsenet-backend.onrender.com/",
  {
    transports: ["polling", "websocket"],
    autoConnect: true,
  }
);