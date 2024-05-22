import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const SentMailComponent = () => {
  const [mails, setMails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMail, setSelectedMail] = useState(null); // State for selected mail

  const token = useSelector((state) => state.auth.isToken);
  const fetchMails = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/mail/sent`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      setMails(response.data.mails);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching sent mails:", error);
      setLoading(false);
      setError("Failed to fetch sent mails");
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchMails();
    }, 2000);
    return () => clearInterval(interval);
  },[]);

  const handleMailClick = (mail) => {
    setSelectedMail(mail);
  };

  const handleBackToList = () => {
    setSelectedMail(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Sent Mails</h2>
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
            Back to Sent Mails
          </button>
          <div className="bg-white p-4 rounded shadow">
            <div>
              <strong>To: </strong> {selectedMail.recipient}
            </div>
            <div>
              <strong>Subject: </strong> {selectedMail.subject}
            </div>
            <div>
              <strong>Message: </strong> {selectedMail.message}
            </div>
            <div>
              <strong>Sent At: </strong>{" "}
              {new Date(selectedMail.createdAt).toLocaleString()}
            </div>
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
                <strong>To: </strong> {mail.recipient}
              </div>
              <div>
                <strong>Subject: </strong> {mail.subject}
              </div>
              <div>
                <strong>Sent At: </strong>{" "}
                {new Date(mail.createdAt).toLocaleString()}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SentMailComponent;
