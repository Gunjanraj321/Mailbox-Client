import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Route, Router, Routes, useNavigate } from "react-router-dom";
import MailsBox from "./MailsBox";
import Mail from "./Mail";

const Inbox = () => {
  const tokenId = useSelector((store) => store.auth.tokenId);
  const email = useSelector((store) => store.auth.email);
  const [mails, setMails] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!tokenId) {
      navigate("/auth");
    }
  }, [tokenId]);

  const handleCompose = () => {
    navigate("/");
  };

  const hanldeSent = async () => {
    try {
      const dummyEmail = email
        .toLowerCase()
        .split("")
        .filter((x) => x.charCodeAt(0) >= 97 && x.charCodeAt(0) <= 122)
        .join("");
      const response = await fetch(
        `https://react-deployment-demo-f24d5-default-rtdb.asia-southeast1.firebasedatabase.app/${dummyEmail}/sentMails.json`
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }
      let newArray = [];
      if (data) {
        for (let [key, value] of Object.entries(data)) {
          const newObj = {
            key: key,
            content: value.content,
            from: value.from,
            subject: value.subject,
            isRead: value.isRead,
          };
          newArray.push(newObj);
        }
      }
      setMails(newArray);
    } catch (err) {
      alert(err);
    }
  };

  const handleDelete = (id) => {
    setMails((prev) => prev.filter((mail) => mail.key !== id));
  };

  const gettingMails = async () => {
    try {
      const dummyEmail = email
        .toLowerCase()
        .split("")
        .filter((x) => x.charCodeAt(0) >= 97 && x.charCodeAt(0) <= 122)
        .join("");
      const response = await fetch(
        `https://react-deployment-demo-f24d5-default-rtdb.asia-southeast1.firebasedatabase.app/${dummyEmail}/Inbox.json`
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }
      let newArray = [];
      if (data) {
        for (let [key, value] of Object.entries(data)) {
          const newObj = {
            key: key,
            content: value.content,
            from: value.from,
            subject: value.subject,
            isRead: value.isRead,
          };
          newArray.push(newObj);
        }
      }
      setMails(newArray);
    } catch (err) {
      alert(err);
    }
  };
  useEffect(() => {
    const callingData = setInterval(() => {
      gettingMails();
    }, 2000);

    return () => {
      clearInterval(callingData);
    };
  }, []);
  const unreadMails = mails.filter((mail) => mail.isRead === false);
  return (
    <div className="m-4 flex ">
      <div className="border-r pr-2">
        <button className="bg-blue-500 py-2 px-6 mb-6" onClick={handleCompose}>
          Compose
        </button>
        <p>Inbox {unreadMails.length}</p>
        <p className="cursor-pointer" onClick={hanldeSent}>
          Sent
        </p>
      </div>
      <MailsBox mails={mails} handleDelete={handleDelete} />
    </div>
  );
};

export default Inbox;
