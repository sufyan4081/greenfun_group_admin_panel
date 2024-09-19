import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Dashboard from "./scenes/dashboard";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import "./index.css";
import PuffLoader from "react-spinners/PuffLoader";
import LoginRoutes from "./routes/Login/LoginRoutes";
import Aos from "aos";
import "aos/dist/aos.css";
import Navbar from "./scenes/global/Navbar";
import AddBlog from "./scenes/addBlog/AddBlog";
import AddVlog from "./scenes/addVlog/AddVlog";
import AddCertificate from "./scenes/addCertificate/AddCertificate";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [token, setToken] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // for animation of page
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace this with your actual logic to fetch the token
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Once the token is fetched, set it
        const storedToken = sessionStorage.getItem("token");

        if (storedToken) {
          let data = JSON.parse(storedToken);
          setToken(data);
        }
      } catch (error) {
        console.error("Error fetching token:", error);
      }
    };

    fetchData();
  }, []);

  const isAuthenticated = !!token;

  useEffect(() => {
    if (
      !isAuthenticated &&
      location.pathname !== "/" &&
      location.pathname !== "/forgot-password" &&
      location.pathname !==
        "/https://aci.campus365.io/backend/images/app__android@2x.png" &&
      location.pathname !==
        "https://aci.campus365.io/backend/images/app__ios@2x.png"
    ) {
      navigate("/");
    }
  }, [isAuthenticated, navigate, location]);

  const [theme, colorMode] = useMode();

  // const isErrorPage = useResolvedPath("").pathname;
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

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
              <main className="content" style={{ overflowY: "auto" }}>
                <Navbar />
                <Routes>
                  {/* Dashboard routes */}
                  <Route
                    path="/dashboard"
                    element={<Dashboard token={token} />}
                  />
                  {/* Login routes */}
                  <Route
                    path="/"
                    element={<LoginRoutes setToken={setToken} />}
                  />

                  {/* blog routes */}
                  <Route path="/add-blog" element={<AddBlog />} />

                  {/* vlog routes */}
                  <Route path="/add-vlog" element={<AddVlog />} />

                  {/* certificate routes */}
                  <Route path="/add-certificate" element={<AddCertificate />} />
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
