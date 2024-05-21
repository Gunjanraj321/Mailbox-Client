import React from "react";
import { Link } from "react-router-dom";
// import { MailIcon } from "@heroicons/react/outline"; // You can use any icon library

const Header = () => {
  return (
    <header className="bg-blue-600 p-4 flex items-center justify-between shadow-md">
      <div className="flex items-center">
        {/* <MailIcon className="h-8 w-8 text-white mr-2" /> */}
        <h1 className="text-white text-2xl font-bold">Mailbox Stream</h1>
      </div>
      <nav className="flex space-x-4">
        <Link to="/inbox" className="text-white hover:text-gray-200">
          Inbox
        </Link>
        <Link to="#" className="text-white hover:text-gray-200">
          Sentbox
        </Link>
        <Link to="/contact" className="text-white hover:text-gray-200">
          Contact
        </Link>
        <Link to="/about" className="text-white hover:text-gray-200">
          About Us
        </Link>
      </nav>
    </header>
  );
};

export default Header;
