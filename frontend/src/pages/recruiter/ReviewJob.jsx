import React from 'react'; 
import {useLocation} from 'react-router-dom'
import axios from 'axios'

const ReviewJob = () => {
    const location = useLocation(); 
    const [job] = React.useState(location.state)
    const [applicants, setApplicants] = React.useState([])
    console.log(applicants)

    React.useEffect(() => {
        const getApplicants = async () => {
            try{
                const response = await axios.get(`http://localhost:8000/api/v1/application/${job._id}/applicants`, {withCredentials: true}) 
                console.log('response', response)

                if (response.status === 200 || response.status === 201) {
                    return setApplicants(response.data.job.applications)
                }
            } catch (err) {
                alert('failed to find applicants')
            }
        }

        getApplicants(); 
    }, [])

    return (
        <div className="min-h-screen bg-[#F6F7F8]">
            <div className="max-w-7xl mx-auto pt-20 px-4 md:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-y-2">
                    <p className="text-4xl text-black font-bold">Manage Applicants: {job.title}</p>
                    <p className="text-md text-gray-400">Manage and evaluate {job.applications.length || 0} for this job</p>
                </div>
                <div className="flex justify-center items-center mt-5">
                    <table className="grow outline outline-1 outline-gray-400 border-collapse rounded-t-xl overflow-hidden">
                       <thead className="text-gray-500 text-md bg-gray-200 tracking-tighter border-b border-gray-400">
                            <tr className="">
                                <th className="px-4 py-3 uppercase tracking-wide">Candidate</th>
                                <th className="px-4 py-3 uppercase tracking-wide">Status</th>
                                <th className="px-4 py-3 uppercase tracking-wide">Applied Date</th>
                                <th className="px-4 py-3 uppercase tracking-wide">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-black text-md"> 
                            {applicants.map((item, _) => {
                                return <tr>
                                        <td className="px-4 py-3">{item.applicant.fullname}</td>
                                        <td className="px-4 py-4">{item.status}</td>
                                        <td className="px-4 py-3">{item.createdAt.split('T')[0]}</td>
                                        <td className="px-4 py-3">Change Status</td>
                                    </tr>
                            })}
                        </tbody> 
                    </table> 
                </div>
            </div> 
            <div>
            </div>
        </div> 
    )
}

export default ReviewJob;
