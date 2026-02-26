import React from "react"; 
import { FaRocket, FaRegUserCircle } from "react-icons/fa";
import { MdOutlineDashboard } from "react-icons/md";
import { IoMdBriefcase } from "react-icons/io";
import { CiCirclePlus } from "react-icons/ci";

const SideBar = () => {

    const elements = [
        { title: "Dashboard", href: "/dashboard", icon: <MdOutlineDashboard />}, {
        title: "My Jobs", href: "/myjobs", icon: <IoMdBriefcase />}, {
        title: "Post a job", href: "/post", icon: <CiCirclePlus />}, {
        title: "Candidates", href: "/candidates", icon: <FaRegUserCircle />},
    ];

    return (
        <div className="w-80 border-r border-gray-200 flex flex-col p-2 h-full"> 
            <div className="h-20 flex gap-5 justify-center items-center whitespace-nowrap ">
                <p className="bg-blue-600 rounded-lg p-2">
                   <FaRocket size={24} className="text-white"/>  
                </p>
                <div>
                <p className="text-black text-lg">Recruitment Dashboard</p> 
                <p className="text-gray-400">Hiring Manager</p> 
                </div>
            </div>
            
            <div className="flex p-2 gap-2 px-5 flex-col grow">
                {elements.map((item) => (
                    <button className="text-black flex items-center hover:text-blue-600 cursor-pointer gap-4 hover:bg-blue-200 p-2 "> 
                        <span className="text-xl">{item.icon}</span> 
                        {item.title}
                    </button> 
                ))}
            </div> 
        </div> 
    )
}

export default SideBar; 
