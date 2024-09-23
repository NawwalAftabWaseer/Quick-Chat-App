import React, { useEffect, useState } from "react";
import SendInput from "./SendInput";
import Messages from "./Messages";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/userSlice";
import { io } from "socket.io-client"; 
import { GiQuickMan } from "react-icons/gi";

const MessageContainer = () => {
    const { selectedUser, authUser } = useSelector((store) => store.user);
    const [socket, setSocket] = useState(null);
    const dispatch = useDispatch();
    
   
    useEffect(() => {
        const newSocket = io("http://localhost:8080"); 
        setSocket(newSocket);
        return () => newSocket.close(); 
    }, []);

    useEffect(() => {
        return () => dispatch(setSelectedUser(null));
    }, [authUser, dispatch]);

    const capitalizeFirstLetter = (name) => {
        if (!name) return "";
        return name.charAt(0).toUpperCase() + name.slice(1);
    };

    return (
        <>
            {selectedUser ? (
                <div className="md:min-w-[550px] flex flex-col h-full">
                    <div className="flex gap-2 items-center bg-zinc-800 text-white px-4 py-2 mb-2">
                        <div className="avatar online">
                            <div className="w-12 rounded-full">
                                <img src={selectedUser?.profilePhoto} alt="user-profile" />
                            </div>
                        </div>

                        <div className="flex flex-col flex-1">
                            <p className="font-bold">{capitalizeFirstLetter(selectedUser?.fullName)}</p>
                        </div>
                        <div className="flex justify-end items-center p-4">
                            <GiQuickMan className="text-3xl text-blue-300" /> 
                        </div>
                    </div>

                    <div className="flex-1 overflow-auto">
                        <Messages socket={socket} />
                    </div>

                    <div className="px-4 my-3">
                        <SendInput socket={socket} />
                    </div>
                </div>
            ) : (
                <div className="md:min-w-[550px] flex flex-col justify-center items-center">
                    <h1 className="text-4xl text-white font-bold"> Welcome to Quick Chat!</h1>
                </div>
            )}
        </>
    );
};

export default MessageContainer;
