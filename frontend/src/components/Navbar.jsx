import {assets} from '../assets/assets'
import {Link,NavLink} from 'react-router-dom';
import {useContext, useState} from 'react';
import {ShopContext} from '../context/ShopContext';

const Navbar = () => {
    const[visible,setVisible]=useState(false);
    const{setShowSearch,getCartCount,navigate,token,setToken,setCartItems}=useContext(ShopContext);

    const logout=()=>{
        navigate('/login')
        localStorage.removeItem('token')
        setToken("")
        setCartItems({})
    }

  return (
    <div className="sticky top-0 z-[9999] bg-white shadow-sm">
      <div className='flex items-center justify-between py-5 font-medium bg-white'>
          <Link to="/"><img src={assets.logo} alt="logo2" className="w-16 sm:w-20 md:w-24 lg:w-28 border-3 border-transparent hover:border-yellow-700 rounded-lg transition-all duration-300"/></Link>
          <ul className="hidden sm:flex gap-5 text-sm text-gray-700 ">
              <NavLink to="/" className="flex flex-col items-center gap-1">
                  <p>HOME</p>
                  <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden"></hr>
              </NavLink>
              <NavLink to="/collection" className="flex flex-col items-center gap-1">
                  <p>COLLECTION</p>
                  <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden"></hr>
              </NavLink>
              <NavLink to="/about" className="flex flex-col items-center gap-1">
                  <p>ABOUT</p>
                  <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden"></hr>
              </NavLink>
              <NavLink to="/contact" className="flex flex-col items-center gap-1">
                  <p>CONTACT</p>
                  <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden"></hr>
              </NavLink>
          </ul>
          <div className="flex items-center gap-6">
              <img onClick={()=>setShowSearch(true)} src={assets.search_icon} className="w-5 cursor-pointer" alt="search-icon"/>
              <div className="group relative">
                  <img onClick={()=>{if(!token) navigate('/login');}} src={assets.profile_icon} 
                  className="w-8 h-8 cursor-pointer rounded-full border-2 border-gray-300 p-1 hover:border-green-500" alt="profile-icon"/>
                  {token && 
                  <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4 ">
                      <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded border-2 border-green-500">
                          <p className="cursor-pointer hover:text-black">My Profile</p>
                          <p onClick={()=>navigate('/orders')} className="cursor-pointer hover:text-black">Orders</p>
                          <p onClick={logout} className="cursor-pointer hover:text-black">Logout</p>
                      </div>
                  </div> }
              </div>
              <div onClick={() => token ? navigate('/cart') : navigate('/login')} className="relative cursor-pointer">
                  <img src={assets.cart_icon} className="w-5 min-w-5" alt="cart-icon"/>
                  <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
                      {getCartCount()}
                  </p>
              </div>
              <img onClick={()=>setVisible(true)} src={assets.menu_icon} className="w-5 cursor-pointer sm:hidden"/>
          </div>
          


          <div className={`fixed top-0 right-0 bottom-0 bg-white transition-all duration-300 ${visible ? 'w-full z-50' : 'w-0'}`}>
              <div className="flex flex-col text-gray-600">
                  <div onClick={()=>setVisible(false)}className="flex items-center gap-4 p-3">
                      <img src={assets.dropdown_icon} className="h-4 rotate-180" alt=""/>
                      <p>Back</p>
                  </div>
                  <NavLink onClick={()=>setVisible(false)} to="/" className="py-2 pl-6 border">HOME</NavLink>
                  <NavLink onClick={()=>setVisible(false)} to="/collection" className="py-2 pl-6 border">COLLECTION</NavLink>
                  <NavLink onClick={()=>setVisible(false)} to="/about" className="py-2 pl-6 border">ABOUT</NavLink>
                  <NavLink onClick={()=>setVisible(false)} to="/contact" className="py-2 pl-6 border">CONTACT</NavLink>
              </div>
          </div>
      </div>
    </div>
  )
}

export default Navbar;
