import {useEffect,useState} from 'react';
import axios from 'axios';
import {backendUrl,currency} from '../App';
import {toast} from 'react-toastify';
import {assets} from '../assets/assets';
import {useNavigate} from 'react-router-dom';


const Orders = ({adminToken})=>{
  const [orders,setOrders]=useState([]);
  const navigate=useNavigate();

  const fetchAllOrders=async ()=>{
    if (!adminToken) return;
    try {
      const response=await axios.post(backendUrl + '/api/order/list',{},{headers:{token:adminToken}});

      if (response.data.success) {
        setOrders(response.data.orders.reverse()
      );
      } 
      else {
        toast.error(response.data.message);
      }
    } 
    catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const statusHandler=async (event,orderId)=>{
    try {
      const response=await axios.post(backendUrl+'/api/order/status',{orderId,status:event.target.value},{headers:{token:adminToken}})
      if(response.data.success){
        await fetchAllOrders()
      }
    } 
    catch (error) {
      console.log(error)
      toast.error(response.data.message)
    }

  }
  useEffect(() => {
    fetchAllOrders();
  },[adminToken]);

  return (
    <div>
      <h3>Order Page</h3>
      <div>
        {
          orders.map((order,index)=>(
            <div key={index} className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700 '>
              <img className='w-12' src={assets.parcel_icon} alt=""/>
              <div>
                <div>
                  {order.items.map((item,idx)=>{
                    if(idx===order.items.length-1){
                      return <p className='py-0.5' key={idx}>{item.name} X {item.quantity}<span>{item.size}</span></p>
                     }
                    else{
                      return <p className='py-0.5' key={idx}>{item.name} X {item.quantity}<span>{item.size}</span>,</p>
                    }
                })}
                </div>
                <p className='mt-3 mb-2 font-medium'>Name:{order.address.firstName +" "+ order.address.lastName}</p>
                <div>
                  <p>{order.address.street+","}</p>
                  <p>{order.address.city +","+order.address.state +","+ order.address.country}</p>
                  <p>Zipcode: {order.address.zipcode}</p>
                </div>
                <p>{order.address.phone}</p>
            </div>
            <div>
              <p className='text-sm sm:text-[15px]'>Items: {order.items.length}</p>
              <p className='mt-3'>Method: {order.paymentMethod}</p>
              <p>payment: {order.payment ? "Done" :"Pending"}</p>
              <p>Date: {new Date(order.date).toLocaleString()}</p>
            </div>
            <p className='text-sm sm:text-[15px]'>Total:{currency}{order.amount}</p>
           
            {order.assignedPartner ? (
              <div className="mt-2">
                <p className="text-green-600 font-semibold">Assigned Partner:</p>
                <p>{order.assignedPartner.companyName}</p>
                <p>{order.assignedPartner.phone}</p>
                <button onClick={()=>navigate(`/assign/${order._id}`)} className="mt-2 bg-blue-600 text-white px-2 py-1 rounded" >Change Partner</button>
              </div>  
              ) : (
                <button onClick={()=>navigate(`/assign/${order._id}`)} className="mt-2 bg-black text-white px-2 py-1 rounded" >Assign Partner</button> 
              )}

                <select onChange={(event)=>statusHandler(event,order._id)} value={order.status}className='p-2 font:semi-bold'>
                  <option value="Order Placed">Order Placed</option>
                  <option value="Packing">Packing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out for delivery">Out for delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default Orders;
