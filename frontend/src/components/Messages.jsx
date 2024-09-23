import React, { useEffect } from "react";
import Message from "./Message";
import useGetMessages from "../hooks/useGetMessages";
import { useSelector, useDispatch } from "react-redux";
import { addMessage } from "../redux/messageSlice"; 

const Messages = ({ socket }) => {
    const dispatch = useDispatch();
    const { messages } = useSelector((store) => store.message);
    const { authUser } = useSelector((store) => store.user);

    useGetMessages();

    useEffect(() => {
        if (socket) {
            socket.on("receive_message", (message) => {
                if (message?.senderId !== authUser?._id) {
                    dispatch(addMessage(message)); 
                }
            });
        }

        return () => {
            if (socket) {
                socket.off("receive_message");
            }
        };
    }, [socket, dispatch, authUser]);

    if (!messages || messages.length === 0) {
        return <div className="text-center text-gray-500">No messages available.</div>;
    }

    return (
        <div className="px-4 flex-1 overflow-auto">
            {messages.map((message) => (
                <Message key={message._id} message={message} />
            ))}
        </div>
    );
};

export default Messages;




