import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const MailsBox = ({ mails, handleDelete }) => {
  const email = useSelector((store) => store.auth.email);

  const handleMailClick = async (mail) => {
    try {
      const dummyEmail = email
        .toLowerCase()
        .split("")
        .filter((x) => x.charCodeAt(0) >= 97 && x.charCodeAt(0) <= 122)
        .join("");
      const data = {
        content: mail.content,
        from: mail.from,
        subject: mail.subject,
        isRead: true,
      };
      const response = await fetch(
        `https://react-deployment-demo-f24d5-default-rtdb.asia-southeast1.firebasedatabase.app/${dummyEmail}/Inbox/${mail.key}.json`,
        {
          method: "PATCH",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const responseData = await response.json();
      console.log(responseData);
    } catch (err) {
      alert(err);
    }
  };

  const handleDeleteBtn = async (id) => {
    try {
      const dummyEmail = email
        .toLowerCase()
        .split("")
        .filter((x) => x.charCodeAt(0) >= 97 && x.charCodeAt(0) <= 122)
        .join("");
      const response = await fetch(
        `https://react-deployment-demo-f24d5-default-rtdb.asia-southeast1.firebasedatabase.app/${dummyEmail}/Inbox/${id}.json`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();
      handleDelete(id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="mt-10 mx-10 w-full">
      {mails?.map((mail) => {
        return (
          <div
            className={`flex items-center w-full px-4 py-2 rounded-lg mb-4 gap-28 ${
              !mail?.isRead ? "bg-gray-300" : "bg-white"
            }`}
            key={mail?.key}
          >
            <Link to={`/mail/${mail?.key}`}>
              <div
                onClick={() => handleMailClick(mail)}
                className={`flex gap-28 items-center  `}
              >
                {!mail?.isRead && (
                  <div className="w-[10px] h-[10px] bg-blue-500 rounded-full"></div>
                )}
                <p>{mail?.subject}</p>
                <p>{mail?.content?.map((info) => info.text).join("")}</p>
              </div>
            </Link>
            <button
              className="bg-red-600 px-2 py-1 rounded-lg"
              onClick={() => handleDeleteBtn(mail?.key)}
            >
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default MailsBox;
