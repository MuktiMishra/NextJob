import axios from "axios"
import { Navigate } from 'react-router-dom'
import { useState, useEffect } from "react"; 
import {useDispatch} from 'react-redux'
import {setUserData} from '../features/auth/authSlice.jsx';

const ProtectedRoute = ({ children, allowedRole }) => {

  const [isVerified, setIsVerified] = useState(null);
    const dispatch = useDispatch();


    useEffect(() => {

        const verifyUser = async () => {
            const response = await axios.post('http://localhost:8000/api/v1/user/validate',{},            {
                withCredentials: true
            }); 

            if (response.status === 200) {
                dispatch(setUserData(response.data.data))
                return setIsVerified(true); 
            } else {
                return setIsVerified(false)
            }
        }

        verifyUser(); 

    }, [])

    if (isVerified === null) return <div>Loading...</div>; 

    if (isVerified) return children;
    else return <Navigate to='/login' />
};

export default ProtectedRoute;
