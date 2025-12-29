import { io, Socket } from "socket.io-client"

let socket: Socket | null = null
export const getSocket = () => {
    console.log(
        "SOCKET SERVER URL:",
        process.env.NEXT_PUBLIC_SOCKET_SERVER
    )
    if (!socket) {
        socket = io(process.env.NEXT_PUBLIC_SOCKET_SERVER)
    }
    return socket

}
