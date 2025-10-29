  import React, { useState } from "react";
  import Input from "../../components/Input/Input";

  import axios from 'axios'
  import { useNavigate } from "react-router-dom";
  import { useUser } from "../../context/userContext";

  const Login = ({ setCurrentPage }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const navigate = useNavigate()
    const { updateUser } = useUser();

    // Handle Login Form Submit
    const handleLogin = async (e) => {
      e.preventDefault();

    
      try {
        const response = await axios.post("http://localhost:8001/api/auth/user/login", {
          email: email.trim(),
          password
        }, {
          withCredentials: true
        })
        console.log(response.data);

        // Store token in localStorage
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
        }

        // Update user context with user data from response
        if (response.data.user) {
          updateUser(response.data.user);
        }

        navigate('/dashboard')
      } catch (error) {
        setError(error.response?.data?.message || "Login failed");
      }

    };

    return <div className="w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center">
      <h3 className="text-lg font-semibold text-black">Welcome Back</h3>
      <p className="text-xs text-slate-700 mt-[5px] mb-6">
        Please enter your details to log in
      </p>

      <form onSubmit={handleLogin}>
        <Input value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Email Address"
          placeholder="john@example.com"
          type="text" />

        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
          placeholder="Min 8 Characters"
          type="password"
        />

        {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

        <button type="submit" className="btn-primary">
          LOGIN
        </button>

        <p className="text-[13px] text-slate-800 mt-3">
          Don't have an account?{" "}
          <button
            className="font-medium text-blue-200 underline cursor-pointer"
            onClick={() => {
              setCurrentPage("signup");

            }}
          >
            Sign Up
          </button>
        </p>
      </form>
    </div >;

  };

  export default Login;
