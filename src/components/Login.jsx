import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../utils/constants.jsX";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { emailId, password },
        { withCredentials: true },
      );
      dispatch(addUser(res.data))
      return navigate("/")
    } catch (err) {
      setError(err?.response?.data || "Something went wrong!!!")
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-6">
        <legend className="fieldset-legend text-2xl">Login</legend>

        <label className="label">Email</label>
        <input
          value={emailId}
          type="email"
          className="input"
          placeholder="Email"
          onChange={(e) => setEmailId(e.target.value)}
        />

        <label className="label">Password</label>
        <input
          value={password}
          type="password"
          className="input"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <p className="text-red-500">{error}</p>

        <button className="btn btn-neutral mt-4 w-full" onClick={handleLogin}>
          Login
        </button>
      </fieldset>
    </div>
  );
};

export default Login;
