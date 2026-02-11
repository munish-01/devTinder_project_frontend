import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { emailId, password },
        { withCredentials: true },
      );
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong!!!");
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true },
      );
      dispatch(addUser(res?.data?.data))
      return navigate("/profile")
    } catch (err) {
      setError(err?.response?.data || "Something went wrong!!!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-6">
        <legend className="fieldset-legend text-2xl">
          {isLoginForm ? "Login" : "Sign Up"}
        </legend>

        {!isLoginForm && (
          <>
            <label className="label">
              First Name<span className=""> *</span>
            </label>
            <input
              value={firstName}
              type="text"
              className="input"
              placeholder="John"
              onChange={(e) => setFirstName(e.target.value)}
            />

            <label className="label">Last Name</label>
            <input
              value={lastName}
              type="text"
              className="input"
              placeholder="cena"
              onChange={(e) => setLastName(e.target.value)}
            />
          </>
        )}

        <label className="label">
          Email<span className=""> *</span>
        </label>
        <input
          value={emailId}
          type="email"
          className="input"
          placeholder="Email"
          onChange={(e) => setEmailId(e.target.value)}
        />

        <label className="label">
          Password<span className=""> *</span>
        </label>
        <input
          value={password}
          type="password"
          className="input"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <p className="text-red-500">{error}</p>

        <button
          className="btn btn-neutral mt-4 w-full"
          onClick={isLoginForm ? handleLogin : handleSignUp}
        >
          {isLoginForm ? "Login" : "Sign Up"}
        </button>
        <p
          className="cursor-pointer m-auto py-2"
          onClick={() => setIsLoginForm((value) => !value)}
        >
          {isLoginForm ? "New User? SignUp Here" : "Existing User? Login Here"}
        </p>
      </fieldset>
    </div>
  );
};

export default Login;
