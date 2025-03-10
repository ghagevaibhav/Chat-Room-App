"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [roomId, setRoomId] = useState<string>("");
  const router = useRouter();

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100vw",
        }}
      >
        <input
          style={{
            padding: 10,
          }}
          value={roomId}
          onChange={(e) => {
            setRoomId(e.target.value);
          }} 
          type="text"
          placeholder="Room Slug"
        />

        <button
          style={{ padding: 10 }}
          onClick={() => {
            router.push(`/room/${roomId}`);
          }}
        >
          Join Room
        </button>
      </div>
    </>
  );
}
