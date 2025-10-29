// import React, { createContext, useContext, useState, useEffect } from "react"; 

// import axios from 'axios'

// export const UserContext = createContext(); 

// export const useUser = () => useContext(UserContext); 

// const UserProvider = ({ children }) => { 
//   const [user, setUser] = useState(null); 
//   const [loading, setLoading] = useState(true); // New state to track loading 

//   useEffect(() => { 
//     // If user is already loaded, skip the initial fetch on mount 
//     if (user) return;  

//     const accessToken = localStorage.getItem("token"); 
//     if (!accessToken) { 
//       setLoading(false); 
//       return; 
//     } 

//     const fetchUser = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await axios.get("http://localhost:8001/api/auth/user/profile",{
//             withCredentials:true,
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//         });
//         setUser(response.data);
//       } catch (error) {
//         // Clear user/token if fetching profile fails (e.g., token expired)
//         console.error("User not authenticated", error);
//         clearUser();
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUser(); 

//   }, []); // Run only on initial mount 

//   const updateUser = (userData) => {
//     setUser(userData);
//     // Token is set via cookies by backend, so we don't need to store it in localStorage
//     setLoading(false);
//   };

//   const clearUser = () => { 
//     setUser(null); 
//     localStorage.removeItem("token"); // Remove token 
//   }; 

//   return ( 
//     <UserContext.Provider value={{ user, loading, updateUser, clearUser }}> 
//       {children} 
//     </UserContext.Provider> 
//   ); 
// }; 

// export default UserProvider;
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Create context
export const UserContext = createContext();
export const useUser = () => useContext(UserContext);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch user profile on mount
  useEffect(() => {
    const token = localStorage.getItem("token");

    // If no token, stop loading immediately
    if (!token) {
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "https://interview-prep-r1rf.onrender.com/api/auth/user/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              withCredentials: true,
            },
          }
        );
        setUser(response.data);
      } catch (error) {
        console.error("User not authenticated:", error);
        clearUser();
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // ✅ Update user after login
  const updateUser = (userData, token) => {
    if (token) {
      localStorage.setItem("token", token);
    }
    setUser(userData);
    setLoading(false);
  };

  // ✅ Clear user (logout)
  const clearUser = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <UserContext.Provider value={{ user, loading, updateUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};
export default UserProvider;