import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Welcome = () => {
  const token = useSelector((state) => state.auth.isToken);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          Welcome to Mailbox Stream
        </h1>
        <p className="text-gray-700 mb-8">
          Your one-stop solution for managing your emails efficiently and
          effectively.
        </p>
        <div className="flex justify-center space-x-4">
          {token ? (
            <>
              <Link to="/compose" className="text-sky-600 font-bold hover:text-gray-200">
                Compose
              </Link>
              <Link to="/inbox" className="text-sky-600 font-bold hover:text-gray-200">
                Inbox
              </Link>
              <Link to="/sent" className="text-sky-600 font-bold hover:text-gray-200">
                Sentbox
              </Link>{" "}
            </>
          ) : (
            <>
              <Link
                to="/signup"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Sign Up
              </Link>
              <Link
                to="/login"
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
              >
                Log In
              </Link>{" "}
            </>
          )}
        </div>
      </div>
      <div className="mt-8 text-center">
        <Link to="/about" className="text-blue-600 hover:underline">
          Learn more about us
        </Link>
        <br />
        <Link to="/contact" className="text-blue-600 hover:underline">
          Contact us
        </Link>
      </div>
    </div>
  );
};

export default Welcome;