import {assets} from '../assets/assets'

const Navbar=({setAdminToken})=>{
  return(
    <div className='flex items-center py-2 px-[4%] justify-between '>
      <img src={assets.logo} className="w-25" alt="logo"/>
      <button onClick={()=>setAdminToken("")}
        className='bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs cursor-pointer'>Logout
      </button>
    </div>
  )
}

export default Navbar;
