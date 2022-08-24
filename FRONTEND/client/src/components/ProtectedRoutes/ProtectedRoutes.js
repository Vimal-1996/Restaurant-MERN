import { Outlet,Navigate } from "react-router-dom";
import { isAuthenticated } from "../../helpers/auth";

const ProtectedRoutes = ()=>{
    return(
        isAuthenticated() ? <Outlet/> : <Navigate to="/signin"/>
    )
}

export default ProtectedRoutes