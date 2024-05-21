import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const MailListComponent = () => {
  const [mails, setMails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // const email = useSelector((state) => state.auth.isEmail);
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
  }, [token]); // Ensure useEffect is triggered when token changes

  return (
    <div>
      <h2>Mails Received</h2>
      {loading ? (
        <p>Loading mails...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {mails.map((mail) => (
            <li key={mail.id}>
              <div>
                <strong>From: </strong> {mail.sender}
              </div>
              <div>
                <strong>Subject: </strong> {mail.subject}
              </div>
              <div>
                <strong>Message: </strong> {mail.message}
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
