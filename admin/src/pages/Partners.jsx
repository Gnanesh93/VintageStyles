import {useState,useEffect} from "react";
import axios from "axios";
import {backendUrl} from "../App";
import {toast} from "react-toastify";

const Partners = ({adminToken})=>{
  const [partners,setPartners]=useState([]);
  const [formData,setFormData]=useState({
    companyName: "",
    partnerId: "",
    address: "",
    customerRatings: "",
    phone: "",
    connections: [],
    charges: ""
  });

  const cities=[
  "Hyderabad","Visakhapatnam","Vijayawada","Guntur","Nellore",
  "Tirupati","Kurnool","Anantapur","Rajahmundry","Kakinada",
  "Mumbai","Delhi","Bengaluru","Chennai","Kolkata",
  "Pune","Ahmedabad","Jaipur","Surat","Lucknow"
];

  const [showCities,setShowCities]=useState(false);

  const fetchPartners=async ()=>{
    if (!adminToken) return;
    try {
      const res=await axios.get(`${backendUrl}/api/partner/list`,{headers:{ token:adminToken}});
      if (res.data.success){
        setPartners(res.data.partners);
      }
    } 
    catch (err) {
      toast.error(err.message);
    }
  };

  const submitHandler=async (e)=>{
    e.preventDefault();
    const payload={ ...formData};
    const res=await axios.post(`${backendUrl}/api/partner/add`,payload,{headers:{token:adminToken}});
    if (res.data.success){
      toast.success("Partner Added");
      setFormData({
        companyName: "",
        partnerId: "",
        address: "",
        customerRatings: "",
        phone: "",
        connections: [],
        charges: ""
      });
      fetchPartners();
    } 
    else toast.error(res.data.message);
  };

  const toggleCity=(city)=>{
    setFormData((prev)=>{
      const connections = prev.connections.includes(city) ? prev.connections.filter((c) => c !== city) : [...prev.connections, city];
      return { ...prev, connections };
    });
  };

  useEffect(()=>{
    if (adminToken){
      fetchPartners();
    }
  },[adminToken]);

  return (
    <div className="p-5" style={{ maxWidth: "500px", marginLeft: "20px" }}>
      <h2 className="text-2xl font-semibold mb-4">Add Delivery Partner</h2>

      <form onSubmit={submitHandler} className="flex flex-col gap-3 border p-5 rounded shadow-lg">
        <input placeholder="Company Name" value={formData.companyName} onChange={(e)=>setFormData({ ...formData, companyName: e.target.value })} className="p-3 border rounded w-full" required />
        <input placeholder="Partner ID" value={formData.partnerId} onChange={(e)=>setFormData({ ...formData, partnerId: e.target.value })} className="p-3 border rounded w-full" required />
        <input placeholder="Address" value={formData.address} onChange={(e) =>setFormData({ ...formData, address: e.target.value })} className="p-3 border rounded w-full" />
        <input placeholder="Customer Ratings" value={formData.customerRatings} onChange={(e) => setFormData({ ...formData, customerRatings: e.target.value })} className="p-3 border rounded w-full"/>
        <input placeholder="Phone" value={formData.phone} onChange={(e)=>setFormData({ ...formData, phone: e.target.value })} className="p-3 border rounded w-full"/>
        <input placeholder="Charges" value={formData.charges} onChange={(e)=>setFormData({ ...formData, charges: e.target.value })} className="p-3 border rounded w-full"/>

        <div className="relative">
          <div className="p-3 border rounded w-full cursor-pointer bg-white" onClick={()=>setShowCities(!showCities)} >
            {formData.connections.length > 0 ? formData.connections.join(", ") : "Select Cities"}
          </div>
          {showCities && (
            <div className="absolute z-10 bg-white border mt-1 w-full max-h-60 overflow-y-auto p-2 rounded shadow-lg">
              {cities.map((city, i) => (
                <label key={i} className="flex items-center gap-2 p-1 hover:bg-gray-100 rounded">
                  <input type="checkbox" checked={formData.connections.includes(city)} onChange={()=>toggleCity(city)} />
                  {city}
                </label>
              ))}
            </div>
          )}
        </div>

        <button type="submit" className="bg-black text-white p-3 mt-3 rounded">Add Partner</button>
      </form>

      <h3 className="text-xl font-semibold mt-10 mb-2">Available Partners</h3>
      <ul className="border rounded p-3 max-h-64 overflow-y-auto">
        {partners.map((p, i) => (
          <li key={i} className="border-b p-2">
            <p className="font-semibold">{p.companyName}</p>
            <p>ID: {p.partnerId}</p>
            <p>Phone: {p.phone}</p>
            <p>Charges: {p.charges}</p>
            <p>Cities: {p.connections.join(",")}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Partners;
