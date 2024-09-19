import { Routes, Route } from "react-router-dom";
import Login from "../../scenes/login";
import ForgotPassword from "../../scenes/login/forgotPassword/ForgotPassword";

function LoginRoutes({ setToken }) {
  return (
    <Routes>
      <Route path="/" element={<Login setToken={setToken} />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
    </Routes>
  );
}

export default LoginRoutes;
