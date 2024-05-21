import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const MailListComponent = () => {
  const [mails, setMails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = useSelector((state) => state.auth.isToken);

  useEffect(() => {
    const fetchMails = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/mail/fetch`, {
          headers: {
            Authorization: `${token}`,
          },
        });
        setMails(response.data.mails);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching mails:", error);
        setLoading(false);
        setError("Failed to fetch mails");
      }
    };

    fetchMails();
  }, [token]); 

  const handleDeleteMail = async (mailId) => {
    try {
      await axios.delete(`http://localhost:3001/mail/${mailId}`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      setMails(mails.filter(mail => mail.id !== mailId));
    } catch (error) {
      console.error("Error deleting mail:", error);
      setError("Failed to delete mail");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-4">Mails Received</h2>
      {loading ? (
        <p className="text-gray-700">Loading mails...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <ul className="space-y-4">
          {mails.map((mail) => (
            <li key={mail.id} className="bg-white p-4 rounded-lg shadow-md">
              <div className="mb-2">
                <strong>From: </strong> {mail.sender}
              </div>
              <div className="mb-2">
                <strong>Subject: </strong> {mail.subject}
              </div>
              <div className="mb-2">
                <strong>Message: </strong> {mail.message}
              </div>
              <div className="mb-2">
                <strong>Received At: </strong> {new Date(mail.createdAt).toLocaleString()}
              </div>
              <button
                onClick={() => handleDeleteMail(mail.id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MailListComponent;
