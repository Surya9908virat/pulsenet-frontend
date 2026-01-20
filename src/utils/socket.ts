import {io } from 'socket.io-client'
<<<<<<< HEAD
export const socket = io(
  "https://pulsenet-backend.onrender.com/",
  {
    transports: ["polling", "websocket"],
    autoConnect: true,
  }
);
=======
import { baseUrl } from '../baseUrl'


export const socket = io(`${baseUrl}`,{
    autoConnect:false
})
>>>>>>> 0b919480b05c5b272f28997687059e2bf77909b6
