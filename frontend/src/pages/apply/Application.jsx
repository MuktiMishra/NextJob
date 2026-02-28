import React from 'react'; 
import {useLocation, useParams} from 'react-router-dom'

const Application = () => {
    const params = useParams(); 
    const location = useLocation(); 

    const {job} = location.state;
    console.log(job)
    return (
        <div className="min-h-screen bg-[#F6F7F8]">
            <div className="max-w-7xl mx-auto p-6">
                <p className="text-blue-600 tracking-wide">Job Application</p>    
                <p className="mt-4 text-4xl font-bold text-black tracking-tight">Apply for {job.title}</p>
            </div>
        </div>
    )
}

export default Application;
