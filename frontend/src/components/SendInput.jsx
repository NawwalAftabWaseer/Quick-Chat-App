import React, { useState } from "react";
import { LuSendHorizonal } from "react-icons/lu";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/messageSlice"; 


const SendInput = ({ socket }) => {
    const [message, setMessage] = useState("");
    
    const dispatch = useDispatch();
    const { selectedUser } = useSelector(store => store.user);
    const { messages } = useSelector(store => store.message); 

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        if (!message.trim()) return; 

        try {
            const res = await axios.post(
                `http://localhost:8080/api/v1/message/send/${selectedUser?._id}`,
                { message },
                {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true
                }
            );

            const newMessage = res?.data?.newMessage;

            dispatch(setMessages([...messages, newMessage])); 

            socket.emit("send_message", newMessage);

            setMessage("");
            
        } catch (error) {
            console.error("Error sending message:", error); 
        }
    };


    return (
        <form onSubmit={onSubmitHandler} className="px-4 my-3">
            <div className="w-full relative">
                <input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    type="text"
                    placeholder="Send a message..."
                    className="border text-sm rounded-lg block w-full p-3 border-zinc-500 bg-gray-600 text-white"
                />

                <button type="submit" className="absolute flex inset-y-0 end-0 items-center pr-4">
                    <LuSendHorizonal />
                </button>

                
            </div>
            
        </form>
    );
};

export default SendInput;
