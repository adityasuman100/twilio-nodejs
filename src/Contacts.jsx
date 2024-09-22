import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Contacts() {
  const [contacts, setContacts] = useState([]);
  const navigator=useNavigate();

  const api = import.meta.env.VITE_API;
  useEffect(() => {
    axios
      .get(`${api}/contacts`)
      .then((response) => setContacts(response.data))
      .catch((error) => console.error("Error fetching contacts:", error));
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <button className="bg-green-500 hover:bg-green-700 text-white font-bold mb-5 py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
      onClick={()=>navigator('/message-list')}
      >
        All messages
      </button>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Contacts List
        </h2>
        <ul className="space-y-4">
          {contacts.map((contact) => (
            <li key={contact.id} className="text-gray-700 text-lg">
              <Link
                to={`/contact/${contact.id}`}
                className="block hover:bg-gray-200 p-3 rounded-lg transition-all"
              >
                {contact.firstName} {contact.lastName}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Contacts;
