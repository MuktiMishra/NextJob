import { useSelector } from "react-redux"
import SideBar from "../../components/Recruiter/Sidebar.jsx"; 
import {useNavigate} from "react-router"

const RecruiterDashboard = () => {
    const { user } = useSelector((state) => state.auth); 
    const navigate = useNavigate(); 
    console.log(user); 
  return (
    <div className="flex w-full h-screen">
        <SideBar />
        <div className="flex flex-col grow bg-[#F6F7F8]">
            <div className="w-full h-24 flex justify-between items-center p-4 border-b border-gray-200">
                <p className="text-black text-xl">Recruitment Dashboard</p> 
                <div className="flex gap-2 items-center">
                    <button className="bg-gray-300 w-12 h-12 rounded-full text-gray-400">
                        {user.fullname[0]}
                    </button>
                    <p className="text-black text-lg">{user.fullname}</p>
                </div> 
            </div>       
            <div className="p-4 flex flex-col">
                <div className="flex justify-between">
                    <p className="text-4xl font-bold text-black">Good Morning, {user.fullname.split(" ")[0]} 👋</p> 
                    <button onClick={() => {
                        navigate('/postjob'); 
                    }} className="px-12 py-4 text-lg bg-blue-600 text-white rounded-xl">+ Post a Job</button>
                </div> 
            </div> 
        </div>
   </div>
  );
};

export default RecruiterDashboard;
