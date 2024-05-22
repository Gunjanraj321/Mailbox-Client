import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Welcome from './components/Welcome';
import ComposeMail from './components/Home/ComposeMail';
import MailListComponent from './components/Home/MailListComponent';
import Contact from './components/Contact';
import About from './components/About';
import Header from './components/Header';
import PrivateRoute from './components/Home/PrivateRoute';
import SentMailComponent from './components/Home/SentMailComponent';

function App() {
  return (
    <div>
      <main>
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/welcome" />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/compose" element={<PrivateRoute element={ComposeMail} />} />
          <Route path="/inbox" element={<PrivateRoute element={MailListComponent} />} />
          <Route path="/sent" element={<PrivateRoute element={SentMailComponent} />} /> {/* Add the new route */}
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
