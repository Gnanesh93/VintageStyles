import {Routes, Route} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import {lazy, Suspense} from "react";

const Collection = lazy(() => import("./pages/Collection"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Cart = lazy(() => import("./pages/Cart"));
const Login = lazy(() => import("./pages/Login"));
const PlaceOrder = lazy(() => import("./pages/PlaceOrder"));
const Orders = lazy(() => import("./pages/Orders"));
const Verify = lazy(() => import("./pages/Verify"));
const TrackingPage = lazy(() => import("./pages/TrackingPage"));
const ProductWrapper = lazy(() => import("./pages/ProductWrapper"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));

const App = () => {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} newestOnTop theme="light" />

      <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
        <Navbar />
        <SearchBar />
        <Suspense fallback={
            <div>
              <h3>loading...</h3>
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/product/:productId" element={<ProductWrapper />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/place-order" element={<PlaceOrder />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/track/:orderId" element={<TrackingPage />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Routes>
        </Suspense>
        <Footer />
      </div>
    </>
  );
};

export default App;
