import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchMessages } from "../redux/messageSlice"; 

const usePollMessages = (userId, selectedUserId) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const interval = setInterval(() => {
            if (userId && selectedUserId) {
                dispatch(fetchMessages(userId, selectedUserId)); 
            }
        }, 3000); 

        return () => clearInterval(interval); 
    }, [userId, selectedUserId, dispatch]);
};

export default usePollMessages;
