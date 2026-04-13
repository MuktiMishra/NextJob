import React from "react"; 
import axios from 'axios'
import { IoMdClose } from "react-icons/io";

const PostJob = () => {

    const [companies, setCompanies] = React.useState([]);
    const [basicDetails, setBasicDetails] = React.useState({
        experience: '', title: '', companyId: '', location: '', jobType: '', salary: '', position: ''
    })

    const [detailsAndContent, setDetailsAndContent] = React.useState({
        description: '', requirements: ['Next.js', 'React']
    }); 

    const basicDetailsConfig = [
        {label: 'Job Title', value: 'title'}, 
        {label: 'Company Name', value: 'companyId'}, 
        {label: 'Location', value: 'location'}, 
        {label: 'Job Type', value: 'jobType'}, 
        {label: 'Salary', value: 'salary'}, 
        {label: 'Position', value: 'position'},
        {label: 'Experience', value: 'experience'}
    ]

    React.useEffect(() => {
        const getCompanies = async () => {
            const response = await axios.get('https://next-job-rho.vercel.app/api/v1/company/get', {withCredentials: true}); 

            if (response.status === 200) {
                console.log(response)
                setCompanies(response.data.companies)
            }
        }

        getCompanies(); 
    }, [])

    const handleBasicInfoChange = (e, propToUpdate) => {
        return setBasicDetails(prev => {
            return {...prev, [propToUpdate]: e.target.value}
        })
    }

    const handleSubmit = async () => {
        let isEmpty = Object.values(basicDetails).some(value => value.trim() === '');
        isEmpty = Object.values(detailsAndContent).some(value => Array.isArray(value) ? value.length === 0 : value === ''); 
        if (isEmpty) {
            return alert('data is empty')
        }
        const dataToSend = {...detailsAndContent, ...basicDetails}

        try {
            const response = await axios.post('https://next-job-rho.vercel.app/api/v1/job/post', dataToSend, {withCredentials: true})

            if (response.status === 201) {
                return alert('job posted successfully')
            }

        } catch(err) {

            return alert('Some error occured')
        }
    }

    return (
        <div className="min-h-screen p-4 bg-[#F6F7F8]"> 
           <div className="max-w-4xl h-full mx-auto ">
              <div className="">
                <p className="text-black text-5xl">Post a Job</p> 
                <p className="text-black tracking-wider mt-2.5">Fill in the details below to find your next best hire</p> 
              </div> 
              <div className="rounded-xl p-5 flex flex-col gap-2 border border-gray-200 bg-white w-full">
                <p className="text-black mb-8 tracking-tighter text-3xl">Basic Information</p>
                <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-2">
                    {basicDetailsConfig.map((item, _) => {
                        return <div key={item.label} className="text-black gap-y-2 py-0 flex flex-col">
                                {item.label}
                        {item.value !== 'companyId' ? <input value={basicDetails[item.value]} onChange={(e) => handleBasicInfoChange(e, item.value)} className="py-2 px-2 border border-gray-300 active:outline-none focus:outline-purple-600 rounded-lg text-black" placeholder={`${item.label}...`}/>:          <select onChange={(e) => handleBasicInfoChange(e, item.value)} className="py-2 px-2 border border-gray-300 active:outline-none focus:outline-purple-600 rounded-lg text-black">
                                    <option value='' defaultChecked={true}>Select a Option</option>
                                    {companies.map((item) => {
                                        return <option value={item._id}>{item.name}</option>
                                    })}

                                </select>}
                            </div>
                    })}  
                </div> 
                <div>
                    <p className="text-black tracking-tighter text-3xl mb-8">Details & Content</p> 
                    <div className="w-full">
                        <div className="flex flex-col gap-y-2 text-black">
                            Job Description
                            <textarea onChange={(e) => setDetailsAndContent(prev => {return {...prev, ['description']: e.target.value}})} placeholder="Describe the role, the team and what a typical day looks like..." className="text-black h-24 p-2 resize-none border border-gray-300 active:outline-none focus:outline-purple-600 rounded-lg"/>
                        </div>
                        <div className="mt-4 text-black flex flex-col gap-y-2">
                             Key Requirements (NOTE: Press ENTER: to add skills)
                             <input onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    setDetailsAndContent(prev => {
                                        return {...prev, ['requirements']: [...prev.requirements, e.target.value]}
                                    })
                                    setTimeout(() => e.target.value = '', 0)
                                }
                             }} className="p-2 border border-gray-300 active:outline-purple-600 focus:outline-purple-600 rounded-lg"/>
                            {detailsAndContent.requirements.length !== 0 && <div className="flex gap-x-2">
                                {detailsAndContent.requirements.map((item, _) => {
                                   return <div className="flex border gap-x-2 border-gray-300 rounded-full p-2 tracking-tighter">
                                            <p>{item}</p>
                                            <button onClick={() => {
                                                const requirementsNew = detailsAndContent.requirements.filter(req => req !== item)
                                                return setDetailsAndContent(prev => {
                                                    return {...prev, ['requirements']: requirementsNew}
                                                })
                                            }}><IoMdClose /></button>
                                        </div>
                               })} 
                            </div>} 
                        </div> 
                        <div className="mt-12 flex gap-x-4 items-center justify-end">
                            <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:opacity-80 transition-opacity duration-150 ease-linear">Submit</button>
                            <button onClick={() => {
                                return setBasicDetails({jobTitle: '', company: '', location: '', jobType: '', salary: '', position: ''})
                            }} className="px-4 py-2 bg-red-600 text-white rounded-xl hover:opacity-80 transition-opacity duration-150 ease-linear">Clear</button>
                        </div>
                    </div> 
                </div> 
              </div> 
           </div> 
        </div> 
    )
}

export default PostJob;
