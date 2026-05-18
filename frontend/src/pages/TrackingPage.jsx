import {useEffect,useState,useContext} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import {toast} from 'react-toastify';
import {ShopContext} from '../context/ShopContext';

const TrackingPage = ()=>{
  const {orderId}=useParams();
  const {backendUrl,navigate,currency}= useContext(ShopContext);
  const [order,setOrder]=useState(null);
  const [loading,setLoading]=useState(true);

  useEffect(()=>{
    const token=localStorage.getItem('token');
    if (!token){
      navigate('/login');
      return;
    }

    const fetch=async ()=>{
      try {
        const response=await axios.post(backendUrl + '/api/order/track',{orderId},{headers:{token}});

        if (response.data.success) {
          setOrder(response.data.order);
        } 
        else{
          toast.error(response.data.message);
        }
      } 
      catch (error){
        console.log(error);
        toast.error(error.message);
      } 
      finally{
        setLoading(false);
      }
    };

    fetch();
  },[orderId,navigate,backendUrl]);

  // download user invoice
  const downloadInvoice = async ()=>{
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(backendUrl +`/api/order/user-invoice/${order._id}`,{headers:{token},responseType:'blob'});
    const url =window.URL.createObjectURL(new Blob([response.data]));
    const link =document.createElement('a');
    link.href = url;
    link.setAttribute('download', `invoice-${order._id}.pdf`);

    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  }
  catch (error){
    console.log(error);
    toast.error("Failed to download invoice");
  }
};

  // Status show
  const statusSteps=['Order Placed','Packing','Shipped','Out for delivery','Delivered'];

  const currentIndex=order ? Math.max(0,statusSteps.indexOf(order.status || 'Order Placed' ) ) : -1;

  if (loading){
    return (
      <div className="p-6">
        Loading...
      </div>
    );
  }

  if (!order){
    return (
      <div className="p-6">
        No order found.
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">
        Track Order
      </h2>

      {/* Order details */}
      <div className="max-w-md border p-4 rounded mb-6 bg-white shadow-sm">
        <p>
          <strong>Order ID:</strong> {order._id}
        </p>

        <p>
          <strong>Date:</strong>{" "}
          {new Date(order.date).toLocaleString()}
        </p>

        <p>
          <strong>Amount:</strong>{" "}
          {currency}{order.amount}
        </p>

        <p>
          <strong>Payment:</strong>{" "}
          {order.payment ? 'Done' : 'Pending'}
        </p>

        <p>
          <strong>Method:</strong>{" "}
          {order.paymentMethod}
        </p>

      </div>

      {/* Order items */}
      <h3 className="font-medium mb-3">
        Items
      </h3>

      <div className="mb-6">
        {order.items.map((it,i)=>(
          <div key={i} className="flex justify-between py-3 border-b" >
            <div>
              <p className="font-medium">
                {it.name}
              </p>

              <p className="text-sm text-gray-600">
                Size: {it.size || 'N/A'}
              </p>

            </div>
            <div>
              <p>
                Qty: {it.quantity}
              </p>

              <p>
                ₹{it.price}
              </p>

            </div>
          </div>
        ))}

      </div>

      {/* Order status*/}

      <h3 className="font-medium mb-3">
        Order Status
      </h3>

      <div className="relative w-full mt-10 mb-10">
        <div className="absolute top-2 left-0 right-0 border-t-2 border-dotted border-gray-300"/>
        <div className="absolute top-2 left-0 border-t-2 border-dotted border-green-600 transition-all duration-700"
          style={{width: `${(currentIndex / (statusSteps.length - 1)) * 100}%`}} />

        <div className="flex justify-between mt-4">
          {statusSteps.map((s,idx)=>(
            <div key={s} className="flex flex-col items-center text-center w-full">
              <div className={`w-5 h-5 rounded-full border-2 mb-2 ${
                  idx <= currentIndex
                    ? 'bg-green-600 border-green-600'
                    : 'bg-white border-gray-400'
                }`}
              />

              <span className="text-sm font-medium">
                {s}
              </span>
            </div>
          ))}

        </div>

      </div>

      {/* Delivery partner info */}
      {order.assignedPartner && (
        <div className="max-w-md border p-4 rounded bg-green-50 shadow-sm">
          <h3 className="font-medium mb-2 text-green-700">
            Delivery Partner Details
          </h3>

          <p>
            <strong>Company Name:</strong>{" "}
            {order.assignedPartner.companyName}
          </p>

          <p>
            <strong>Partner ID:</strong>{" "}
            {order.assignedPartner.partnerId}
          </p>

          <p>
            <strong>Phone:</strong>{" "}
            {order.assignedPartner.phone}
          </p>

        </div>
      )}

      {/* Download invoice */}
      {order.assignedPartner && (
        <button onClick={downloadInvoice}
          className="mt-5 bg-black text-white px-5 py-2 rounded hover:bg-gray-800 transition"
        >
          Download Invoice
        </button>
      )}
    </div>
  );
};

export default TrackingPage;