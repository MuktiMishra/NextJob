import React from 'react'; 
import {useLocation} from 'react-router-dom'
import {useSelector} from 'react-redux'
import axios from 'axios'

const Application = () => {
    const location = useLocation(); 
    const {user} = useSelector(state => state.auth)
    const [coverLetter, setCoverLetter] = React.useState("")
    const [portfolio, setPortfolio] = React.useState(""); 

    const {job} = location.state;
    console.log(job)

    const handleApply = async () => {
        if (!coverLetter) {
            return alert('Please write a cover letter')
        }

        try {

            const response = await axios.post(`http://localhost:8000/api/v1/application/apply/${job._id}`, {coverLetter, portfolio}, {
                withCredentials: true
            })

            if (response.status === 200 || response.status === 201) {
                return alert('Applied successfully!')
            }
        } catch (err) {

            return alert('Failed to apply')
        }
    }
    console.log(job)
    return (
        <div className="min-h-screen bg-[#F6F7F8]">
            <div className="max-w-7xl flex flex-col-reverse lg:flex-row gap-y-2 justify-center lg:gap-y-0 lg:gap-x-16 mx-auto px-4 lg:px-8 md:px-6">
                <div className="">
                    <p className="text-blue-600 tracking-wide">Job Application</p>    
                    <p className="mt-4 text-4xl font-bold text-black tracking-tight">Apply for {job.title}</p>
                    
                    <div className="mt-8 bg-white rounded-t-xl p-3 lg:p-8">
                        <p className="text-2xl text-black tracking-tight">Personal Information</p>
                        <div className="flex justify-between gap-x-2 lg:gap-x-0 mt-4 items-center">
                            <div className="flex flex-col gap-y-2">
                                <label className="text-black">Full Name</label>
                                <input disabled={true} value={user.fullname} className=" rounded-lg lg:pl-2 lg:pr-20 pl-1 py-2 cursor-not-allowed border-gray-300 border text-gray-500"/>
                            </div>
                            <div className="flex flex-col gap-y-2">
                                <label className="text-black">Email Address</label>
                                <input disabled={true} value={user.email} className=" pl-1 py-2 lg:pl-2 lg:pr-20 rounded-lg cursor-not-allowed  border-gray-300 border text-gray-500"/>
                            </div>
                        </div>
                        <p className="text-2xl text-black tracking-tight mt-8">Cover Letter</p>
                        <textarea value={coverLetter} onChange={(e) => setCoverLetter(e.target.value)} placeholder="Tell us why you're a great fit..." className="resize-y p-2 border-gray-300 border text-black w-full rounded-lg mt-4 min-h-48"/>
                        <p className="text-2xl text-black traking-tight mt-8">PortFolio or Previous Links (Optional)</p>
                        <input value={portfolio} onChange={(e) => setPortfolio(e.target.value)} placeholder="ex: mywebsite.com" className="p-2 mt-4 w-full rounded-lg border border-gray-300  text-black"/>
                    </div> 
                    <div className="h-24 p-4 flex items-center gap-x-2 justfiy-around bg-[#F9FAFC] rounded-b-xl ">
                        <p className="text-sm lg:text-lg text-gray-400">Application will be sent to the recruiter and status will be 'PENDING'</p>
                        <button onClick={handleApply} className="px-4 lg:px-8 lg:py-4 whitespace-nowrap py-2 hover:opacity-80 transition-opacity duration-150 ease-in bg-blue-600 text-white rounded-xl">Apply Job</button>
                    </div> 
                </div>
                <div className="w-full lg:w-72 h-fit py-7 px-4 rounded-xl bg-white mt-2">
                   <p className="text-black text-xl tracking-tighter">{job.company.name}</p> 
                   <div className="mt-4 ">
                        <p className="text-gray-500 font-bold uppercase tracking-wide text-md">Location</p> 
                        <p className="text-black tracking-tighter">{job.location}</p>
                   </div>  
                   <div className="mt-4 ">
                        <p className="text-gray-500 font-bold uppercase tracking-wide text-md">Salary</p> 
                        <p className="text-black tracking-tighter">{job.salary}</p>
                   </div>  
                   <div className="mt-4 ">
                        <p className="text-gray-500 font-bold uppercase tracking-wide text-md">Job Type</p> 
                        <p className="text-black tracking-tighter">{job.jobType}</p>
                   </div> 
                   <div className="p-4 h-24 mt-4 bg-[#F4F8FE] border rounded-xl border-blue-700/10">
                        <p className="text-blue-600">Key Skills</p>
                        <div className="flex gap-x-2 mt-2">
                            {job.requirements.map((item) => {
                                return <p key={item} className="text-black bg-white border-gray-300 p-1 px-2 border rounded-full">{item}</p>
                            })}
                        </div> 
                   </div> 
                </div> 
            </div>
            
        </div>
    )
}

export default Application;
