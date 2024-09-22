import axios from "axios";
import { useEffect, useState } from "react";

const MessagesList = () => {
  const [messages, setMessages]=useState([]);

  const api=import.meta.env.VITE_API;
  useEffect(() => {
    axios.get(`${api}/messages`)
      .then(response => setMessages(response.data))
      .catch(error => console.error('Error fetching contacts:', error));
  }, []);

  // Sort messages by date in descending order
  const sortedMessages = messages.sort((a, b) => b.time - a.time);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Messages Sent</h2>
      <ul className="space-y-4">
        {sortedMessages.map((message, index) => (
          <li key={index} className="bg-white shadow-lg rounded-lg p-4 border">
            <div className="flex justify-between">
              <h3 className="text-lg font-semibold">{message.contact}</h3>
              <span className="text-sm text-gray-500">
                {message.time.toLocaleString()}
              </span>
            </div>
            <p className="text-sm text-gray-700">
              Message: {message.message}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MessagesList;
