import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { baseUrl, getRequest } from "../utils/services";

export const useFetchLatestMessage = (chat) => {
  const { newMessage, notifications } = useContext(ChatContext);
  const [latestMessage, setLatestMessage] = useState(null);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const response = await getRequest(`${baseUrl}/messages/${chat?._id}`);

        if (response.error) {
          console.log("Error getting messages...", response.error);
          return;
        }

        const lastMessage = response[response?.length - 1];
        setLatestMessage(lastMessage);
      } catch (error) {
        console.log("Error fetching messages:", error);
      }
    };

    if (chat?._id) {
      getMessages();
    }
  }, [chat, newMessage, notifications]);

  return { latestMessage };
};
