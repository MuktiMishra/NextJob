import MyJobsRecruiter from '../../components/MyJobsRecruiter.jsx'
import MyJobsStudent from '../../components/MyJobsStudent.jsx'
import {useSelector} from 'react-redux'

const MyJobs = () => {

    const {user} = useSelector(state => state.auth); 

    return (
        <div className="h-screen bg-[#F6F7F8]">
            {user.role === 'student' && <MyJobsStudent />}
            {user.role === 'recruiter' && <MyJobsRecruiter />}
        </div> 
    )
}

export default MyJobs;
