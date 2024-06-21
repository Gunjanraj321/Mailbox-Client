import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import Welcome from "./components/Welcome";
import ComposeMail from "./components/Home/ComposeMail";
import MailListComponent from "./components/Home/Inbox";
import Contact from "./components/Contact";
import About from "./components/About";
import Header from "./components/Header";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute"; 
import SentMailComponent from "./components/Home/SentMailComponent";
import ResetForm from "./components/Auth/ResetForm";
import ResetPage from "./components/Auth/ResetPage";

function App() {
  return (
    <div>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/signup" element={<PublicRoute element={Signup} />} />
          <Route path="/login" element={<PublicRoute element={Login} />} />
          <Route path="/reset" element={<PublicRoute element={ResetForm} />} />
          <Route
            path="/resetForm/:uuid"
            element={<PublicRoute element={ResetPage} />}
          />
          <Route
            path="/compose"
            element={<PrivateRoute element={ComposeMail} />}
          />
          <Route
            path="/inbox"
            element={<PrivateRoute element={MailListComponent} />}
          />
          <Route
            path="/sent"
            element={<PrivateRoute element={SentMailComponent} />}
          />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
