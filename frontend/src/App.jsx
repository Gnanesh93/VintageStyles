import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import {lazy,Suspense} from 'react';


const Collection = lazy(()=>import('./pages/Collection'));
const About=lazy(()=>import('./pages/About'));
const Contact=lazy(()=>('./pages/Contact'));
const Cart=lazy(()=>('./pages/Cart'));
const Login=lazy(()=>('./pages/Login'));
const PlaceOrder=lazy(()=>('./pages/PlaceOrder'));
const Orders=lazy(()=>('./pages/Orders'));
const Verify=lazy(()=>('./pages/Verify'));
const TrackingPage=lazy(()=>('./pages/TrackingPage'));
const ProductWrapper=lazy(()=>('./pages/ProductWrapper'));
const ForgotPassword=lazy(()=>('./pages/ForgotPassword'));
const ResetPassword=lazy(()=>('./pages/ResetPassword'));

const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <ToastContainer />
      <Navbar />
      <SearchBar />
      <Suspense fallback={
        <div><h3>loading...</h3></div>
      }>
        <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/collection" element={<Collection/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<Contact/>} />
        {/* <Route path="/product/:productId" element={<Product/>} /> */}
        <Route path="/product/:productId" element={<ProductWrapper />}/>
        <Route path="/cart" element={<Cart/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/place-order" element={<PlaceOrder/>} />
        <Route path="/orders" element={<Orders/>} />
        <Route path="/verify" element={<Verify/>}/>
        <Route path="/track/:orderId" element={<TrackingPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
      </Suspense>
      <Footer/>
    </div>
  )
}

export default App;

