import React from 'react'; 
import {useLocation} from 'react-router-dom'

const ReviewJob = () => {
    const location = useLocation(); 
    console.log(location.state)
    const [job, setJob] = React.useState()
    return (
        <div>
        </div> 
    )
}

export default ReviewJob;
