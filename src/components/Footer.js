import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <h2 className="text-2xl font-bold">Mailbox Stream</h2>
            <p className="text-sm">Your trusted service provider.</p>
          </div>
          <div className="flex flex-col md:flex-row items-center">
            <Link to="/about" className="text-white mx-2 my-1 md:my-0 hover:underline">
              About Us
            </Link>
            <Link to="/contact" className="text-white mx-2 my-1 md:my-0 hover:underline">
              Contact
            </Link>
          </div>
        </div>
        <div className="text-center mt-4 border-t border-gray-700 pt-4">
          <p className="text-sm">&copy; 2024 Mailbox Stream. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
