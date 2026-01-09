import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [contacts, setContacts] = useState([]);
  const navigate = useNavigate();

  const fetchContacts = async () => {
    const res = await axios.get("http://localhost:5000/contacts");
    setContacts(res.data);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">
          📞 Contact Management
        </h1>

        <button
          onClick={() => navigate("/create")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          + Create Contact
        </button>
      </nav>

      {/* Content */}
      <div className="max-w-7xl mx-auto p-6">
        {contacts.length === 0 ? (
          <p className="text-center text-gray-500 mt-20">
            No contacts created yet.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {contacts.map((c) => (
              <div
                key={c._id}
                className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition"
              >
                {/* Name */}
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {c.name}
                </h3>

                {/* Email */}
                <p className="text-gray-600 text-sm">
                  <span className="font-medium text-gray-700">Email:</span>{" "}
                  {c.email}
                </p>

                {/* Phone */}
                <p className="text-gray-600 text-sm mt-1">
                  <span className="font-medium text-gray-700">Phone:</span>{" "}
                  {c.phone}
                </p>

                {/* Message */}
                {c.message && (
                  <p className="text-gray-600 text-sm mt-2">
                    <span className="font-medium text-gray-700">Message:</span>{" "}
                    {c.message}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
