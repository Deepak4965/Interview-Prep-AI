import React, { useState, useContext } from "react";
import Input from "../../components/Input/Input";
import ProfilePhotoSelector from "../../components/Input/ProfilePhotoSelector";
import { validateEmail } from "../../utils/helper";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { UserContext } from "../../context/userContext";
import uploadImage from "../../utils/uploadImage";


const SignUp = ({ setCurrentPage }) => {
  const [profilePic, setProfilePic] = useState(null);
  const [preview, setPreview] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate()

  // Handle Signup Form Submit
  const handleSignUp = async (e) => {
    e.preventDefault();

    let profileImageUrl=""

    setError(null);

    // Input validation
    if (!fullName.trim()) {
      setError("Full name is required");
      return;
    }
    if (!email.trim()) {
      setError("Email is required");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    if (!password || password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    try {

      if(profilePic){
        const imgUploadRes=await uploadImage(profilePic)
        profileImageUrl=imgUploadRes.imageUrl || ""
      }

      const response = await axios.post("https://interview-prep-r1rf.onrender.com/api/auth/user/register", {
        name: fullName,
        email,
        password,
        profileImageUrl
      }, {
        withCredentials: true
      });

      console.log(response.data);

      // Store token in localStorage
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }

      updateUser(response.data.user);
      navigate("/dashboard");
    } catch (error) {
      console.error("There was an error registering!", error);
      const errorMessage = error.response?.data?.message || "Registration failed. Please try again.";
      setError(errorMessage);
    }
  };

  return <div className="w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center">
    <h3 className="text-lg font-semibold text-black">Create an Account</h3>
    <p className="text-xs text-slate-700 mt-[5px] mb-6">
      Join us today by entering your details below.
    </p>

    <form onSubmit={handleSignUp}>

      <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} preview={preview} setPreview={setPreview} />

      <div className="grid grid-cols-1 md:grid-cols-1 gap-2">
        <Input
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          label="Full Name"
          placeholder="John"
          type="text"
        />

        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Email Address"
          placeholder="john@example.com"
          type="text"
        />

        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
          placeholder="Min 8 Characters"
          type="password"
        />
      </div>

      {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

      <button type="submit" className="btn-primary">
        SIGN UP
      </button>

      <p className="text-[13px] text-slate-800 mt-3">
        Already an account?{" "}
        <button
          className="font-medium text-blue-200 underline cursor-pointer"
          onClick={() => {
            setCurrentPage("login");
          }}
        >
          Login
        </button>
      </p>
    </form>
  </div>
};
export default SignUp;