import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import { CircularProgress } from "@mui/material";
import { userLoginPost, graphqlPost } from "../../service/api";

const LoginPage = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await userLoginPost({ email, password });
      const token = response.data.access_token;
      if (token) {
        enqueueSnackbar("Welcome 😀 ", { variant: "success" });
        localStorage.setItem("token", token);
        window.dispatchEvent(new Event("storage"));
        navigate("/");
      }
    } catch (error) {
      enqueueSnackbar("Bad email or password. Please try again.", {
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    setLoading(true);
    if (password !== confirmPassword) {
      enqueueSnackbar("Passwords do not match!", { variant: "warning" });
      // alert('Passwords do not match!');
      setLoading(false);
      return;
    }

    try {
      const response = await graphqlPost(
        `
                    mutation {
                        createUser(email: "${email}", password: "${password}") {
                            user {
                                id
                                email
                            }
                        }
                    }
                `
      );

      if (response.data.errors) {
        enqueueSnackbar(response.data.errors[0].message, { variant: "error" });
        // alert(response.data.errors[0].message);
      } else {
        enqueueSnackbar("Registration successful! Please log in ", {
          variant: "success",
        });
        // alert('Registration successful! Please log in.');
        setIsLoginMode(true); // Switch back to login mode
      }
    } catch (error) {
      enqueueSnackbar("Registration failed. Please try again.", {
        variant: "warning",
      });
      // alert('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        {/* Tab Headers */}
        <div className="flex justify-center mb-8">
          <button
            onClick={() => setIsLoginMode(true)}
            className={`text-lg font-bold py-2 px-4 border-b-2 focus:outline-none ${
              isLoginMode ? "border-black" : "text-gray-500"
            }`}
          >
            SIGN IN
          </button>
          <button
            onClick={() => setIsLoginMode(false)}
            className={`text-lg font-bold py-2 px-4 focus:outline-none ${
              !isLoginMode ? "bg-gray-300 text-gray-700" : "text-gray-500"
            }`}
          >
            REGISTER
          </button>
        </div>

        {/* Form Fields */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block w-full p-3 mb-4 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              if (isLoginMode) {
                handleLogin();
              } else {
                handleRegister();
              }
            }
          }}
          className="block w-full p-3 mb-4 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
        />

        {!isLoginMode && (
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (isLoginMode) {
                  handleLogin();
                } else {
                  handleRegister();
                }
              }
            }}
            className="block w-full p-3 mb-6 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
          />
        )}
        <div style={{ position: "relative" }}>
          <button
            disabled={loading}
            onClick={isLoginMode ? handleLogin : handleRegister}
            className={`w-full ${
              loading ? "bg-gray-300" : "bg-black hover:bg-gray-800"
            } text-white px-4 py-3 rounded-lg transition-colors duration-200`}
          >
            {isLoginMode ? "SIGN IN" : "REGISTER"}
          </button>
          {loading && (
            <CircularProgress
              size={24}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                marginTop: "-12px",
                marginLeft: "-12px",
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
