import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Dashboard from "./scenes/dashboard";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import "./index.css";
import PuffLoader from "react-spinners/PuffLoader";
import Aos from "aos";
import "aos/dist/aos.css";
import Navbar from "./scenes/global/Navbar";
import AddBlog from "./scenes/addBlog/AddBlog";
import AddVlog from "./scenes/addVlog/AddVlog";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./scenes/login/Login";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import UserProfile from "./scenes/global/UserProfile/UserProfile";
import SideBarBox from "./scenes/global/Sidebar/SideBarBox";
import Topbar from "./scenes/global/TopBar/Topbar";

function App() {
  const [isSidebar, setIsSidebar] = useState(true);
  const location = useLocation();
  const [theme, colorMode] = useMode();

  // for animation of page
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  // Check current routes and hide topBar
  const isLoginPage = location.pathname === "/";
  const forgotPage = location.pathname === "/forgot-password";

  // Conditionally render the header based on the route
  if (forgotPage || isLoginPage) {
    return null; // Return null to hide the header
  }

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {loading ? (
            <PuffLoader
              color={"#4236d6"}
              loading={loading}
              size={70}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          ) : (
            <>
              <SideBarBox isSidebar={isSidebar} />
              <main className="content" style={{ overflowY: "auto" }}>
                <Topbar setIsSidebar={setIsSidebar} />
                <Routes>
                  <Route path="/" element={<Login />} />
                  <Route element={<ProtectedRoutes />}>
                    {/* Dashboard routes */}
                    <Route path="/dashboard" element={<Dashboard />} />

                    {/* profile */}
                    <Route path="/profile" element={<UserProfile />} />

                    {/* blog routes */}
                    <Route path="/add-blog" element={<AddBlog />} />

                    {/* vlog routes */}
                    <Route path="/add-vlog" element={<AddVlog />} />
                  </Route>
                </Routes>
              </main>
            </>
          )}
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
