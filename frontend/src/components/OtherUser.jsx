import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/userSlice";

const OtherUser = ({ user }) => {
    const dispatch = useDispatch();
    const { selectedUser, onlineUsers } = useSelector((store) => store.user);
    const isOnline = onlineUsers.includes(user._id);

    const selectedUserHandler = (user) => {
        dispatch(setSelectedUser(user));
    };

    const capitalizeFirstLetter = (name) => {
        return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    };

    return (
        <>
            <div
                onClick={() => selectedUserHandler(user)}
                className={`flex gap-2 items-center text-slate-900 font-bold hover:text-zinc-900 hover:bg-blue-300 rounded p-2 cursor-pointer ${selectedUser?._id === user?._id ? 'bg-blue-300' : ''}`}
            >
                <div className="w-12 rounded-full">
                    <img src={user?.profilePhoto} alt="user-profile" />
                </div>
                <div className="flex flex-col flex-1">
                    <div className="flex justify-between gap-2">
                        <p>{capitalizeFirstLetter(user?.fullName)}</p>
                    </div>
                </div>
            </div>
            <div className="divider my-0 py-0 h-1"></div>
        </>
    );
};

export default OtherUser;
