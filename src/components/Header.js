import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearAuthState } from "./Redux/AuthSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.isToken);

  const handleLogout = () => {
    dispatch(clearAuthState());
    navigate("/login");
  };

  return (
    <header className="bg-blue-600 p-4 flex items-center justify-between shadow-md">
      <div className="flex items-center">
        <Link to="/">
          <h1 className="text-white text-2xl font-bold">Mailbox Stream</h1>
        </Link>{" "}
      </div>
      <nav className="flex space-x-4">
        {token ? (
          <>
            <Link to="/compose" className="text-white hover:text-gray-200">
              Compose
            </Link>
            <Link to="/inbox" className="text-white hover:text-gray-200">
              Inbox
            </Link>
            <Link to="/sent" className="text-white hover:text-gray-200">
              Sentbox
            </Link>{" "}
          </>
        ) : (
          <>
            <Link to="/login" className="text-white hover:text-gray-200">
              Login
            </Link>
            <Link to="/signup" className="text-white hover:text-gray-200">
              Signup
            </Link>
          </>
        )}
       
        {token ?<button
          onClick={handleLogout}
          className="text-white hover:text-gray-200"
        >
          Logout
        </button>:null}
      </nav>
    </header>
  );
};

export default Header;
