import { useEffect, useState } from "react";
import { WEBSOCKET_URL } from "../app/config";

export const useSocket = () => {
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(`${WEBSOCKET_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBlZTdhMGM5LWQwZWQtNGYzMi1iYmJlLTRmMzY1YTkzYjAwYSIsImlhdCI6MTc0MTA3Nzg5MSwiZXhwIjoxNzQxMDgxNDkxfQ.t8CyH3MHAh2AtVC9SmxkKsB92JesHTQfiPubASOn2zE`);
    ws.onopen = () => {
      setLoading(false);
      setSocket(ws);
    };
  }, []);

  return {
    loading,
    socket,
  };
};
