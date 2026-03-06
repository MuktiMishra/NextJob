import {useState, useEffect} from 'react'
import { MdExitToApp } from "react-icons/md";
import { FaBriefcase, FaCheckCircle, FaClock } from "react-icons/fa";
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const MyJobsStudent = () => {
    const [applications, setApplications] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getApplications = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/v1/application/get', {withCredentials: true})
                if (response.status === 200 || response.status === 201) {
                    console.log(response)
                    setApplications(response.data.application);
                    return console.log('Fetched successfully')
                }
            } catch (error) {
                return alert('Error getting applications')
            }
        }

        getApplications();
    }, [])

    const getStatusStyle = (status) => {
        switch (status?.toLowerCase()) {
            case 'accepted': return 'text-green-600 bg-green-100';
            case 'rejected': return 'text-red-600 bg-red-100';
            default: return 'text-yellow-600 bg-yellow-100';
        }
    }

    const acceptedCount = applications.filter(app => app.status?.toLowerCase() === 'accepted').length;
    const pendingCount = applications.filter(app => app.status?.toLowerCase() === 'pending').length;

    return (
        <div className="bg-[#F6F7F8] max-w-7xl mx-auto px-4 md:px-6 lg:px-8 h-full">
            <section className="w-full py-10 flex justify-between">
                <p className="text-black text-4xl font-extrabold tracking-tight">My Applications</p>
                <button onClick={() => navigate('/jobs')} className="px-3 py-2 bg-blue-600 text-white rounded-xl">Browse Jobs</button>
            </section>
            <section className="w-full flex justify-start">
                <table className="text-black w-full border-collapse outline outline-1 outline-gray-400 overflow-hidden rounded-t-lg">
                    <thead className="bg-[#F9FAFC] border-b border-gray-300">
                        <tr className="text-start">
                            <th className="text-lg px-6 py-4 text-start">Job Details</th>
                            <th className="text-lg px-6 py-4 text-start">Company</th>
                            <th className="text-lg px-6 py-4 text-start">Status</th>
                            <th className="text-lg px-6 py-4 text-start">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(applications) && applications.length > 0 ? applications.map(item => {
                            return (
                                <tr key={item._id} className="border-b border-gray-300">
                                    <td className="px-4 py-4">
                                        <h1 className="text-lg font-bold tracking-tight">{item.job?.title}</h1>
                                        <p className="text-md font-light text-gray-500">Applied {item.createdAt?.split('T')[0]}</p>
                                    </td>
                                    <td className="px-4 py-4 text-md text-gray-700">{item.job?.company?.name || 'N/A'}</td>
                                    <td className="px-4 py-4">
                                        <span className={`px-3 py-1 rounded-full text-sm font-semibold capitalize ${getStatusStyle(item.status)}`}>
                                            {item.status || 'Pending'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4">
                                        <button onClick={() => navigate(`/job/${item.job?._id}`, {state: item.job})} className="hover:text-blue-600">
                                            <MdExitToApp size={24}/>
                                        </button>
                                    </td>
                                </tr>
                            )
                        }) : (
                            <tr>
                                <td colSpan={4} className="px-4 py-8 text-center text-gray-500">No applications yet</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </section>
            <section className="flex gap-x-8 mt-10">
                <div className="pr-10 pl-2 rounded-2xl text-black flex gap-x-4 p-2 items-center h-20 bg-white border border-gray-300">
                    <p className="p-3 bg-[#DBEAFE] rounded-xl text-blue-600"><FaBriefcase size={24}/></p>
                    <div className="flex flex-col">
                        <p className="text-lg font-bold tracking-tighter">Total Applied</p>
                        <p>{applications.length}</p>
                    </div>
                </div>
                <div className="pr-10 pl-2 rounded-2xl text-black flex gap-x-4 p-2 items-center h-20 bg-white border border-gray-300">
                    <p className="p-3 bg-[#DCFCE7] rounded-xl text-green-600"><FaCheckCircle size={24}/></p>
                    <div className="flex flex-col">
                        <p className="text-lg font-bold tracking-tighter">Accepted</p>
                        <p>{acceptedCount}</p>
                    </div>
                </div>
                <div className="pr-10 pl-2 rounded-2xl text-black flex gap-x-4 p-2 items-center h-20 bg-white border border-gray-300">
                    <p className="p-3 bg-[#FEF9C3] rounded-xl text-yellow-600"><FaClock size={24}/></p>
                    <div className="flex flex-col">
                        <p className="text-lg font-bold tracking-tighter">Pending</p>
                        <p>{pendingCount}</p>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default MyJobsStudent;
