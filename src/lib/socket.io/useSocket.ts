// hooks/useSocket.ts
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io(process.env.backendUrl as string, {
      transports: ['websocket'],
    });
    setSocket(newSocket);

    // return () => {
    //   newSocket.disconnect();
    // };
  }, []);

  return socket;
};

export default useSocket;
