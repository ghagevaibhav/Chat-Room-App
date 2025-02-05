import axios from "axios";
import { BACKEND_URL } from "../../config";
import ChatRoom from "../../../components/ChatRoom";

async function getRoomId(slug: string) {
  const response = await axios.get(`${BACKEND_URL}/room/${slug}`);
  const roomId = await response.data.room;
  console.log( 'response data: ' + response.data.room);
  return roomId;
}

export default async function ChatRoomPage({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const slug = (await params).slug;
  // fetch room data using slug and render it here.
  const roomId = await getRoomId(slug);
  console.log('room id: ' + roomId);

  return <ChatRoom id={roomId} />;
}
