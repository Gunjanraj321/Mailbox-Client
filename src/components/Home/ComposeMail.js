import React, { useState } from "react";
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
    try {
      await axios.post(
        "http://localhost:3001/mail/send",
        details,
        {
          headers: {
            "Content-Type":"application/json",
            Authorization: token,
          },
        }
      );
      setSuccess(true);
      setTo("");
      setSubject("");
      setEditorState("");
      navigate('/inbox');
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
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Compose Email</h1>
      <div className="relative mb-4">
        <input
          type="email"
          placeholder="To"
          onChange={(e) => setTo(e.target.value)}
          value={to}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Subject"
          onChange={(e) => setSubject(e.target.value)}
          value={subject}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4 bg-white p-2 border border-gray-300 rounded h-64">
        <Editor
          editorState={editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName h-48"
          onEditorStateChange={setEditorState}
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
          onClick={handleSendBtn}
          disabled={sending}
        >
          {sending ? "Sending..." : "Send"}
        </button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">Email sent successfully</p>}
    </div>
  );
};

export default ComposeMail;
