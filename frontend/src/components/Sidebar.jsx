import React, { useState, useEffect } from "react";
import { IoSearch } from "react-icons/io5";
import OtherUsers from "./OtherUsers";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setAuthUser, setOtherUsers, setFullUserList } from "../redux/userSlice";

const Sidebar = () => {
    const [search, setSearch] = useState("");
    const { otherUsers, fullUserList } = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        if (otherUsers && otherUsers.length > 0) {
            dispatch(setFullUserList(otherUsers));
        }
    }, [otherUsers, dispatch]);

    const logoutHandler = async () => {
        try {
            const res = await axios.get("http://localhost:8080/api/v1/user/logout");
            navigate("/login");
            toast.success(res.data.message);
            dispatch(setAuthUser(null));
        } catch (e) {
            console.log(e);
        }
    };

    const searchSubmitHandler = (e) => {
        e.preventDefault();
        const conversationUsers = fullUserList?.filter((user) =>
            user.fullName.toLowerCase().includes(search.toLowerCase())
        );
        if (conversationUsers.length > 0) {
            dispatch(setOtherUsers(conversationUsers));
            setIsSearching(true);
        } else {
            toast.error("User not found");
        }
    };

    const resetSearchHandler = () => {
        setSearch("");
        dispatch(setOtherUsers(fullUserList)); 
        setIsSearching(false);
    };

    return (
        <div className="border-r border-slate-500 p-4 flex flex-col">
            <form onSubmit={searchSubmitHandler} className="flex items-center gap-2">
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="input input-bordered rounded-md"
                    type="text"
                    placeholder="search..."
                />
                <button type="submit" className="btn btn-circle bg-slate-500 text-white">
                    <IoSearch className="w-6 h-6 outline-none" />
                </button>
            </form>
            <div className="divider p-3"></div>
            {isSearching && (
                <button onClick={resetSearchHandler} className="btn btn-sm bg-blue-500 text-white mb-2">
                    Back to All Users
                </button>
            )}
            <OtherUsers />
            <div className="mt-2">
                <button onClick={logoutHandler} className="btn btn-sm bg-slate-900">Logout</button>
            </div>
        </div>
    );
};

export default Sidebar;
