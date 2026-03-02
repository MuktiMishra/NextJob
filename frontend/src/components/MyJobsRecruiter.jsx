import {useState, useEffect} from 'react'
import { MdExitToApp } from "react-icons/md";
import { FaBriefcase } from "react-icons/fa";
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const MyJobsRecruiter = () => {
    const [jobs, setJobs] = useState([]); 
    const navigate = useNavigate(); 

    useEffect(() => {
       const getJobs = async () => {

           try {
               const response = await axios.post('http://localhost:8000/api/v1/job/getadminjobs', {}, {withCredentials: true})

               if (response.status === 200 || response.status === 201) {
                   setJobs(response.data.jobs); 
                   return console.log('Fetched successfully')
               }
           } catch (error) {
               return alert('error getting jobs')
           }
       } 

       getJobs(); 
    }, [])
    return (
        <div className="bg-[#F6F7F8] max-w-7xl mx-auto px-4 md:px-6 lg:px-8 h-full ">
            <section className="w-full py-10 flex justify-between">
                <p className="text-black text-4xl font-extrabold tracking-tight">Manage my Jobs</p>
                <button onClick={() => navigate('/postjob')} className="px-3 py-2 bg-blue-600 text-white rounded-xl">Post a job</button>
            </section>
            <section className="w-full flex justify-start">
                <table className="text-black w-full border-collapse outline outline-1 outline-gray-400 overflow-hidden rounded-t-lg">
                    <thead className="bg-[#F9FAFC] border-b border-gray-300">
                        <tr className="text-start">
                            <th className="text-lg px-6 py-4 text-start">Job Details</th>
                            <th className="text-lg px-6 py-4 text-start">Applicants</th>
                            <th className="text-lg px-6 py-4 text-start">Actions</th>
                        </tr> 
                    </thead>
                    <tbody> 
                        {Array.isArray(jobs) && jobs.length > 0 ? jobs.map(item => {
                            return <tr className="border-b border-gray-300 ">
                                    <td className="px-4 py-4">
                                        <h1 className="text-lg font-bold tracking-tight">{item.title}</h1>
                                        <p className="text-md font-light text-gray-500">Posted {item.createdAt.split('T')[0]}</p>
                                    </td>
                                    <td className="px-4 py-4 font-bold text-lg text-start">{item.applications.length !== 0 ? item.applications.length : 'N/A'}</td>
                                    <td className="px-4 py-4"><button onClick={() => {
                                        navigate(`/reviewjob/${item._id}`, {state: item})
                                    }} className="hover:text-blue-600"><MdExitToApp size={24}/></button></td>
                                </tr> 
                        }) : <div>Sorry no jobs</div>}                                
                    </tbody> 
                </table>
            </section>
            <section className="flex gap-x-8 mt-10">
                <div className="pr-10 pl-2 rounded-2xl text-black flex gap-x-4 p-2 items-center h-20 bg-white border border-gray-300">
                    <p className=" p-3 bg-[#DBEAFE] rounded-xl text-blue-600"><FaBriefcase size={24} /></p>
                    <div className="flex flex-col">
                        <p className="text-lg font-bold tracking-tighter">Total Jobs Posted</p>
                        <p>{jobs.length}</p>
                    </div>
                </div>
                <div className="pr-10 pl-2 rounded-2xl text-black flex gap-x-4 p-2 items-center h-20 bg-white border border-gray-300">
                    <p className=" p-3 bg-[#DBEAFE] rounded-xl text-blue-600"><FaBriefcase size={24} /></p>
                    <div className="flex flex-col">
                        <p className="text-lg font-bold tracking-tighter">Total Applicants</p>
                        <p>{jobs.reduce((acc, curr) => acc += curr.applications.length || 0, 0)}</p>
                    </div>
                </div>
                </section> 
        </div> 
    )
}

export default MyJobsRecruiter;
