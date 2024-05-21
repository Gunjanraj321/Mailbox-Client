import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuthenticated, setEmail, setToken } from "../Redux/AuthSlice";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/sign/login",
        formData
      );
      const token = response.data.token;
      const email = response.data.email;
      // console.log(token, email);
      dispatch(setAuthenticated(true));
      dispatch(setToken(token));
      dispatch(setEmail(email));
      navigate("/");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("User not found or Please check your Password."); // Alert specific error message from backend
      } else {
        alert("An error occurred. Please try again later."); // Alert for other errors
      }
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-6 mx-auto ">
      <h2 className="text-xl font-bold text-gray-900 my-2 px-4 md:text-2xl">
        Login
      </h2>
      <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <button
          className="w-full font-bold text-black bg-yellow-100 hover:bg-red-200 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg text-sm px-5 py-2.5 text-center"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
