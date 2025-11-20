import {useEffect,useState} from "react";
import axios from "axios";
import {backendUrl} from "../App";
import {useParams,useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

const AssignPartner=({adminToken})=>{
  const {orderId}=useParams();
  const navigate=useNavigate();
  const [partners,setPartners]=useState([]);
  const [selected,setSelected]=useState("");

  const fetchPartners=async ()=>{
    const res=await axios.get(backendUrl+"/api/partner/list",{headers:{token:adminToken}});
    if (res.data.success){
      setPartners(res.data.partners);
    }
  };

  const submit=async ()=>{
    const res=await axios.post(backendUrl+"/api/partner/assign",{orderId,partnerId:selected},{headers:{token:adminToken}});

    if (res.data.success){
      toast.success("Partner Assigned");
      navigate("/orders");
    } 
    else {
      toast.error(res.data.message);
    }
  };

  useEffect(()=>{
    if(adminToken){
      fetchPartners();
    }
  },[adminToken]);

  return (
    <div className="p-5">
      <h2 className="text-xl font-semibold mb-3">Assign Delivery Partner</h2>

      <select className="border p-2" onChange={(e)=>setSelected(e.target.value)} >
        <option>Select Partner</option>
          {partners.map((p)=>(
            <option value={p.partnerId} key={p.partnerId}>
              {p.companyName} - {p.partnerId}
            </option>
        ))}
      </select>

      <button className="bg-black text-white px-4 py-2 mt-3" onClick={submit}>Save</button>
    </div>
  );
};

export default AssignPartner;
