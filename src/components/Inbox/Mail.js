import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Mail = () => {
  const { mailId } = useParams();
  const email = useSelector((store) => store.auth.email);
  const [info, setInfo] = useState({});

  const mailInfo = async () => {
    try {
      const dummyEmail = email
        .toLowerCase()
        .split("")
        .filter((x) => x.charCodeAt(0) >= 97 && x.charCodeAt(0) <= 122)
        .join("");
      const response = await fetch(
        `https://react-deployment-demo-f24d5-default-rtdb.asia-southeast1.firebasedatabase.app/${dummyEmail}/Inbox/${mailId}.json`
      );
      const data = await response.json();
      setInfo(data);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    mailInfo();
  }, []);
  return (
    <div className="m-8">
      {/* <p className="mb-4">From: {info.from || info.to}</p>  */}
      <p className="mb-4">Subject: {info.subject}</p>
      <p>{info?.content?.map((info) => info.text).join("")}</p>
    </div>
  );
};

export default Mail;
