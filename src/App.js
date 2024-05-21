import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Welcome from './components/Welcome';
import Home from './components/Home/Home';
import MailListComponent from './components/Inbox/MailListComponent';
import Contact from './components/Contact';
import About from './components/About';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';

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
          <Route path="/home" element={<PrivateRoute element={Home} />} />
          <Route path="/inbox" element={<PrivateRoute element={MailListComponent} />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
