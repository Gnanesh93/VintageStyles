import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Route, Routes } from "react-router-dom";
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders";
import Login from "./components/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Partners from "./pages/Partners";
import AssignPartner from "./pages/AssignPartner";
import { isTokenExpired } from "./utils/isTokenExpired";

export const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
export const currency = "₹";

const App = () => {
  const [adminToken, setAdminToken] = useState(localStorage.getItem("adminToken") || "");

  useEffect(() => {
    if (adminToken && isTokenExpired(adminToken)) {
      localStorage.removeItem("adminToken");
      setAdminToken("");
    }
  }, []);

  useEffect(() => {
    if (adminToken) {
      localStorage.setItem("adminToken", adminToken);
    } else {
      localStorage.removeItem("adminToken");
    }
  }, [adminToken]);

  const isValidAdmin = adminToken && !isTokenExpired(adminToken);

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer />

      {!isValidAdmin ? (
        <Login setAdminToken={setAdminToken} />
      ) : (
        <>
          <Navbar setAdminToken={setAdminToken} />
          <hr />
          <div className="flex w-full">
            <Sidebar />
            <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">
              <Routes>
                <Route path="/add" element={<Add adminToken={adminToken} />} />
                <Route path="/list"element={<List adminToken={adminToken} />} />
                <Route path="/orders" element={<Orders adminToken={adminToken} />} />
                <Route path="/partners" element={<Partners adminToken={adminToken} />} />
                <Route path="/assign/:orderId" element={<AssignPartner adminToken={adminToken} />} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
