import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import useFetchMail from "../hooks/useFetchMail";
import { getSocket } from "../Socket";
import { setInboxMails } from "../Redux/mailSlice";

const Inbox = () => {
  const dispatch = useDispatch();
  const { inboxMails } = useFetchMail();
  const [selectedMail, setSelectedMail] = useState(null);

  const token = useSelector((state) => state.auth.isToken);
  const mails = useSelector((state) => state.mail.inboxMails);

  useEffect(() => {
    const socket = getSocket();
    socket.on("inbox",(newmail)=>{
      dispatch(setInboxMails([...mails,newmail]))
    })
    inboxMails();
  });

  const handleMailClick = async (mail) => {
    setSelectedMail(mail);
    console.log(mail);

    if (!mail.read) {
      const mailId = mail.id;
      console.log(mailId);
      try {
        await axios.patch(
          `http://localhost:3001/mail/read/${mailId}`,
          {},
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        await inboxMails();
      } catch (error) {
        console.error("Error marking mail as read:", error);
      }
    }
  };

  const handleBackToList = () => {
    setSelectedMail(null);
  };

  const handleDeleteMail = async (mailId) => {
    try {
      const res = await axios.delete(`http://localhost:3001/mail/${mailId}`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      alert(res.data.message);
      setSelectedMail(null);
      inboxMails();
      // setMails(mails.filter((mail) => mail.id !== mailId));
    } catch (error) {
      console.error("Error deleting mail:", error);
      // setError("Failed to delete mail");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Mails Received</h2>
      {selectedMail ? (
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
              className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition duration-300"
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
              className={`mb-4 p-4 rounded cursor-pointer ${
                mail.read ? "bg-white shadow" : "bg-blue-200 shadow-lg"
              }`}
              onClick={() => handleMailClick(mail)}
            >
              <div>
                <strong>From: </strong> {mail.sender}
              </div>
              <div>
                <strong>Subject: </strong> {mail.subject}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Inbox;
