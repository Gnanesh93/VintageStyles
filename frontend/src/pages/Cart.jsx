import {useContext,useEffect,useState} from 'react'
import {ShopContext} from '../context/ShopContext'
import Title from '../components/Title';
import {assets} from '../assets/assets'
import CartTotal from '../components/CartTotal';

const Cart=()=>{
  const {products,currency,cartItems,updateQuantity,navigate,token}=useContext(ShopContext);
  const [cartData,setCartdata]=useState([]);

  useEffect(()=>{
    if(!token){
      navigate('/login');
    } 
  },[token]);

  useEffect(()=>{
    if(products.length > 0){
      const tempData=[]
      for(const items in cartItems){
        for(const item in cartItems[items]){
          if(cartItems[items][item] > 0){
            tempData.push({_id: items,size: item,quantity: cartItems[items][item]})
          }
        }
      }
      setCartdata(tempData);
    }
  },[cartItems, products])

  // If cart is empty redirect user to home page
  if(cartData.length === 0){
    return(
      <div className='p-10 text-center'>
        <h2 className='text-2xl font-semibold mb-4'>Your Cart is Empty</h2>
        <p className='mb-6'>Looks like you haven't added any products yet.</p>
        <button onClick={() => navigate('/')} className='bg-black text-white px-6 py-3 text-sm rounded' >SHOP NOW</button>
      </div>
    )
  }
  // else display cart Items.
  return (
    <div className='border-t pt-14'>
      <div className='text-2xl mb-3 '>
        <Title text1={'YOUR'} text2={'CART'} />
      </div>
      <div>
        {
          cartData.map((item,index)=>{
            const productData=products.find((product)=>product._id === item._id);
            return(
              <div key={index} className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'>
                <div className='flex items-start gap-4'>
                  <img src={productData.image[0]} alt="" className='w-16 sm:w-20' />
                  <div>
                    <p className='text-xs sm:text-lg font-medium'>{productData.name}</p>
                    <div className='flex items-center gap-5 mt-2'>
                      <p>{currency} {productData.price}</p>
                      <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50'>{item.size}</p>
                    </div>
                  </div>
                </div>
                <input 
                  onChange={(e)=>e.target.value === '' || e.target.value === 0 ? null : updateQuantity(item._id,item.size,Number(e.target.value))} 
                  className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1' type="number" min={1} max={100} defaultValue={item.quantity} />
                <img onClick={()=>updateQuantity(item._id,item.size,0)} className='cursor-pointer w-4 mr-4 sm:w-5' src={assets.bin_icon} />
              </div>
            )
          })
        }
      </div>
      <div className='flex justify-end my-20'>
        <div className='w-full sm:w-[450px]'>
          <CartTotal />
          <div className='w-full text-end'>
            <button onClick={() => navigate('/place-order')} className='bg-black text-white text-sm my-8 px-8 py-3'>PROCEED TO CHECKOUT</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart;
