import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const Message = ({ message }) => {
    const scroll = useRef();
    const { authUser, selectedUser } = useSelector((store) => store.user);
    
    useEffect(() => {
        scroll.current?.scrollIntoView({ behavior: "smooth" });
    }, [message]);

   
    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div ref={scroll} className={`chat ${authUser?._id === message?.senderId ? 'chat-end' : 'chat-start'}`}>
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img src={message?.senderId === authUser?._id ? authUser?.profilePhoto : selectedUser?.profilePhoto} alt="User Avatar" />
                </div>
            </div>
            <div className="chat-header">
                <time className="text-xs opacity-50 text-white">{formatTime(message?.createdAt)}</time>
            </div>
            <div className="chat-bubble">{message?.message}</div>
        </div>
    );
};

export default Message;
