import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8080/api/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        setMessage(error.response.data.message || "An error occurred");
        if (error.response.status === 401) {
          navigate("/login");
        }
      }
    };

    fetchProfile();
  }, [navigate]);

  return (
    <div className="w-full max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      {user ? (
        <div>
          <h2 className="text-xl mb-4">Profile</h2>
          <p className="mb-2">
            <strong>Username:</strong> {user.username}
          </p>
          <p className="mb-2">
            <strong>Email:</strong> {user.email}
          </p>
        </div>
      ) : (
        <p>{message || "Loading..."}</p>
      )}
    </div>
  );
}

export default Profile;
