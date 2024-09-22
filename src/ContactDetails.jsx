import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function ContactDetails() {
  const { id } = useParams();
  const [contact, setContact] = useState(null);
  const api=import.meta.env.VITE_API;

  useEffect(() => {
    axios
      .get(`${api}/contacts/${id}`)
      .then((response) => setContact(response.data))
      .catch((error) =>
        console.error("Error fetching contact details:", error)
      );
  }, [id]);



  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        {contact && (
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              {contact.firstName} {contact.lastName}
            </h2>
            <p className="text-gray-700 text-lg mb-4">
              <strong>Phone:</strong> {contact.phone}
            </p>
            <div className="text-center">
              <Link
                to={`/send-message/${contact.id}`}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
              >
                Send Message
              </Link>
              {/* <button onClick={()=>onClickHandle()} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition-all">
                Send Message
              </button> */}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ContactDetails;
