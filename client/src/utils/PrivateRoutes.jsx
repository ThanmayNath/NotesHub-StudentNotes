import { useContext } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { authContext } from '../contexts/auth'


const PrivateRoutes = () => {
   const {user} = useContext(authContext);

    return(

        user != null ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default PrivateRoutes