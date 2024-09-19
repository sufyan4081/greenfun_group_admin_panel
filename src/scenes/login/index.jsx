import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import loginImg from "../../assets/loginImg.jpeg";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { supabase } from "../../client";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

const Login = ({ setToken }) => {
  const [session, setSession] = useState(null);
  const navigate = useNavigate();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleRedirection = (session) => {
    if (session) {
      sessionStorage.setItem("token", JSON.stringify(session));
      navigate("/dashboard");
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      handleRedirection(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setToken && setToken(session);
      handleRedirection(session);
    });

    return () => subscription.unsubscribe();
  }, [handleRedirection, setToken]);

  if (!session) {
    return (
      <>
        <ToastContainer position="top-right" autoClose={5000} />

        {/* Background image with blur */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundImage: `url(${loginImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            filter: "blur(4px)", // Apply a slight blur only to the background
            zIndex: -1, // Behind the login box
          }}
        ></Box>

        {/* Login Box */}
        <Box
          sx={{
            height: "100vh",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: 350,
              padding: "20px",
              backgroundColor: "rgba(0, 0, 0, 0.6)", // Transparent dark color for the box
              borderRadius: "8px",
              boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.5)", // Subtle shadow for depth
              color: "#fff", // White text inside the box
              backdropFilter: "blur(5px)", // Adds soft blur inside the box for a smooth effect
            }}
          >
            <p
              className="divider-text"
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                marginBottom: "20px",
                textAlign: "center",
                color: "white",
              }}
            >
              SIGN IN
            </p>

            <Auth
              supabaseClient={supabase}
              appearance={{ theme: ThemeSupa }}
              className="custom-auth"
              providers={[]}
              localization={{
                variables: {
                  sign_in: {
                    email_label: "Email",
                    password_label: "Password",
                    button_label: "SIGN IN",
                    loading_button_label: "Loading...",
                  },
                  link_text: "",
                },
              }}
            />

            {/* Forgot Password Link */}
            <Link
              to="/forgot-password"
              style={{
                textDecoration: "none",
                fontSize: "14px",
                color: "white",
                display: "block",
                textAlign: "center",
                marginTop: "10px",
              }}
            >
              Forgot Password?
            </Link>
          </Box>
        </Box>
      </>
    );
  } else {
    navigate("/dashboard");
  }
};

export default Login;
