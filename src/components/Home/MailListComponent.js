import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const MailListComponent = () => {
  const [mails, setMails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMail, setSelectedMail] = useState(null); // State for selected mail

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

  const handleMailClick = (mail) => {
    setSelectedMail(mail);
  };

  const handleBackToList = () => {
    setSelectedMail(null);
  };
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
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Mails Received</h2>
      {loading ? (
        <p>Loading mails...</p>
      ) : error ? (
        <p>{error}</p>
      ) : selectedMail ? (
        <div>
          <button
            onClick={handleBackToList}
            className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Back to Inbox
          </button>
          <div className="bg-white p-4 rounded shadow">
            <div>
              <strong>From: </strong> {selectedMail.sender}
            </div>
            <div>
              <strong>Subject: </strong> {selectedMail.subject}
            </div>
            <div>
              <strong>Message: </strong> {selectedMail.message}
            </div>
            <div>
              <strong>Received At: </strong>{" "}
              {new Date(selectedMail.createdAt).toLocaleString()}
            </div>
            <button
                onClick={() => handleDeleteMail(selectedMail.id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300"
              >
                Delete
              </button>
          </div>
        </div>
      ) : (
        <ul>
          {mails.map((mail) => (
            <li
              key={mail.id}
              className="mb-4 p-4 bg-white rounded shadow cursor-pointer"
              onClick={() => handleMailClick(mail)}
            >
              <div>
                <strong>From: </strong> {mail.sender}
              </div>
              <div>
                <strong>Subject: </strong> {mail.subject}
              </div>
              <div>
                <strong>Received At: </strong>{" "}
                {new Date(mail.createdAt).toLocaleString()}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MailListComponent;
