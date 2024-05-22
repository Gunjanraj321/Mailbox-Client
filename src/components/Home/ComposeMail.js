import React, { useState, useEffect } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ComposeMail = () => {
  const [editorState, setEditorState] = useState("");
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const email = useSelector((state) => state.auth.isEmail);

  const token = useSelector((state) => state.auth.isToken);
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const handleSendBtn = async () => {
    setSending(true);
    setError(null);
    setSuccess(false);

    const details = {
      from: email,
      to: to,
      subject: subject,
      content: editorState.getCurrentContent().getPlainText(),
    };
    console.log(details);
    try {
      const response = await axios.post(
        "http://localhost:3001/mail/send",
        details,
        {
          headers: {
            "Content-Type":"application/json",
            Authorization: token,
          },
        }
      );
      console.log(response);
      setSuccess(true);
      setTo("");
      setSubject("");
      setEditorState("");
    } catch (error) {
        console.error(error);
      setError(
        "An error occurred while sending the email. Please try again later."
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <div>
      <h1>Welcome to your mailbox</h1>
      <div>
        <p>To:</p>
        <input
          type="email"
          placeholder="Receiver Email"
          onChange={(e) => setTo(e.target.value)}
          value={to}
        />
      </div>
      <div>
        <p>Subject:</p>
        <input
          type="text"
          placeholder="Subject"
          onChange={(e) => setSubject(e.target.value)}
          value={subject}
        />
      </div>
      <div>
        <Editor
          editorState={editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={setEditorState}
        />
        ;
      </div>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">Email sent successfully</p>}
      <button
        className="bg-blue-400 px-2 py-1 my-4"
        onClick={handleSendBtn}
        disabled={sending}
      >
        {sending ? "Sending..." : "Send"}
      </button>
    </div>
  );
};

export default ComposeMail;
