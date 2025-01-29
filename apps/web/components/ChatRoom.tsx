/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import { BACKEND_URL } from "../app/config";
import { ChatRoomClient } from "./ChatRoomClient";

async function getChats(roomId: string) {
  const response = await axios.get(`${BACKEND_URL}/room/chats/${roomId}`);
  return response.data.messages;
}

export const ChatRoom = async ({ id }: { id: string }) => {
  const messages = await getChats(id);

  return <ChatRoomClient messages={messages} id={id} />;
};
