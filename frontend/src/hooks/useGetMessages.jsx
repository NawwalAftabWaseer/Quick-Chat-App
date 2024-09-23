import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/messageSlice";

const useGetMessages = () => {
    const { selectedUser } = useSelector(store => store.user);
    const dispatch = useDispatch();
    
    useEffect(() => {
        const fetchMessages = async () => {
            if (!selectedUser?._id) return; 
            try {
                axios.defaults.withCredentials = true;
                const res = await axios.get(`http://localhost:8080/api/v1/message/${selectedUser._id}`);
                dispatch(setMessages(res.data));
            } catch (e) {
                console.error(e);
            }
        };
        
        fetchMessages();
    }, [selectedUser, dispatch]); 
};

export default useGetMessages;
