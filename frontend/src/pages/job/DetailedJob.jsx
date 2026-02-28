import React from 'react'; 
import {useParams} from 'react-router'
import {Link} from 'react-router-dom'
import axios from 'axios'
import { CiLocationOn, CiClock1, CiDollar } from "react-icons/ci";
import {useSelector} from 'react-redux'
import { FaBriefcase } from "react-icons/fa";

const DetailedJob = () => {
    const [loading, setLoading] = React.useState(true); 
    const [job, setJob] = React.useState()
    const params = useParams(); 
    const {user} = useSelector((state) => state.auth)
    console.log(user)

    React.useEffect(() => {

        const getJobDetails = async () => {
            try{
                const response = await axios.get(`http://localhost:8000/api/v1/job/get/${params.jobid}`, {withCredentials: true})

                if (response.status === 200) {
                    console.log(response)
                    return setJob(response.data.job)
                }
            } catch (err) {
                alert("Error fetching job...")
            } finally {
                setLoading(false); 
            }
        }

        getJobDetails(); 
    }, [])

    if (loading) return <div className="bg-[#F6F7F8] w-full h-screen">Loading...</div>

    return (
        <div className="w-full h-screen bg-[#F6F7F8] text-black">
            <div className="max-w-7xl mx-auto flex flex-col gap-y-4 h-screen p-4">
               <div className="bg-white p-4 rounded-lg border border-gray-300 ">
                    <p className="font-extrabold tracking-tight text-4xl mb-2">{job.title}</p>
                    <p className="text-blue-500 text-md mb-2">{job.company.name}</p>
                    <p><CiLocationOn size={15} className="inline" /> {job.location} <CiClock1 size={16} className="inline"/> Posted {job.createdAt.split('T')[0]}</p>
                    <hr className="mt-4 h-2"/>
                    <div className="mt-2 mb-4 flex items-center gap-x-4">
                       <p className="bg-green-400/80 p-3 inline text-green-800 rounded-xl"><FaBriefcase className="inline mr-2"/>{job.jobType}</p> 
                       <p className="bg-blue-400/80 p-3 inline text-blue-800 rounded-xl"><CiDollar className="inline mr-2" />{job.salary}</p> 
                       <p className="bg-purple-400/80 p-3 inline text-purple-800 rounded-xl"><CiClock1 className="inline mr-2" />{job.experience} Year(s)</p> 
                    </div>
              </div>
              {user.role !== 'student' && <div className="flex justify-between items-center rounded-lg border border-gray-300 p-4 bg-white">
                  <div>
                    <p className="text-2xl tracking-tight">Ready to Apply?</p>
                  </div>
                  <div>
                    <Link to={`/apply/${params.jobid}`} state={{job}} className="px-4 py-2 bg-blue-600 text-white rounded-lg border border-gray-300">Apply Now</Link>
                  </div>
              </div>}
              <div className="p-4 border-gray-300 border rounded-lg bg-white">
                <p className="text-2xl tracking-tight font-bold">Description</p>
                <p className="text-md mt-4">{job.description}</p>
                
                <p className="text-2xl mt-4 tracking-tight font-bold">Requirements</p>
                <div className="flex mt-4 gap-x-2">{job.requirements.map((item) => {
                    return <p className="p-3 border-gray-300 border rounded-full">{item}</p>
                })}
                </div>
              </div>
            </div>
            
        </div>
    )
}

export default DetailedJob;

