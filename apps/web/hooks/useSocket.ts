import { useEffect, useState } from "react";
import { WEBSOCKET_URL } from "../app/config";

export const useSocket = () => {
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(
      `${WEBSOCKET_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBlZTdhMGM5LWQwZWQtNGYzMi1iYmJlLTRmMzY1YTkzYjAwYSIsImlhdCI6MTc0MTA5NjgxOSwiZXhwIjoxNzQxMTAwNDE5fQ.SZkXOC6nV1R9FSOJShiohatMQzWPcXpr7YKkAVC-N2s`
    );
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
