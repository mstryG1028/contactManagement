import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [contacts, setContacts] = useState([]);
  const navigate = useNavigate();

  const fetchContacts = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/contacts`,
        payload
      );

      setContacts(res.data);
    } catch (err) {
      console.error("Failed to fetch contacts:", err.message);
    }
  };

  // Delete contact
  const deleteContact = async (id) => {
    if (!window.confirm("Are you sure you want to delete this contact?"))
      return;
    try {
      await axios.delete(`http://localhost:5000/contacts/${id}`);
      fetchContacts();
    } catch (err) {
      console.error("Failed to delete contact:", err.message);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
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
                className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition relative"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {c.name}
                </h3>

                <p className="text-gray-600 text-sm">
                  <span className="font-medium text-gray-700">Email:</span>{" "}
                  {c.email}
                </p>

                <p className="text-gray-600 text-sm mt-1">
                  <span className="font-medium text-gray-700">Phone:</span>{" "}
                  {c.phone}
                </p>

                {c.message && (
                  <p className="text-gray-600 text-sm mt-2">
                    <span className="font-medium text-gray-700">Message:</span>{" "}
                    {c.message}
                  </p>
                )}

                <button
                  onClick={() => deleteContact(c._id)}
                  className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
