import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function SendMessage() {
  const { id } = useParams();
  const [message, setMessage] = useState("Hi. Your OTP is: 123456");
  const [phone, setPhone]=useState("+919999999999");
  const api=import.meta.env.VITE_API;

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${api}/send-message`, { id, message, phone })
      .then((response) => {
        console.log("🚀 ~ handleSubmit ~ response:", response);
        alert("Message sent successfully");
      })
      .catch((error) => {
        console.error("Error sending message:", error);
        alert("Failed to send message", error);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Compose Message
        </h2>
        <p className="text-gray-700 text-lg mb-4">
              <strong>Phone:</strong> <input className="border-2"
              value={phone}
              onChange={(e)=>setPhone(e?.target?.value)}
              />
            </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="message"
            >
              Message
            </label>
            <textarea
              id="message"
              className="w-full h-32 px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition-all"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SendMessage;
