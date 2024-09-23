import React, { useEffect, useState } from "react"
import Sidebar from "./Sidebar";
import MessageContainer from "./MessageContainer";
import { useNavigate } from "react-router-dom";
import cookie from 'js-cookie'

const HomePage = () => {

    const [token, setToken] = useState(cookie.get('token'))
    const navigate = useNavigate();
    useEffect(() => {
        
        console.log("Token: ", token);

        if(!token) {
            navigate('/login');
        }

    }, [])
    return ( 
        <div className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-white bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
            <Sidebar/>
            <MessageContainer/>
        </div>
     );
}
 
export default HomePage;