import React, {useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../redux/userSlice";
import { IoEye, IoEyeOff } from "react-icons/io5"; 

const Login = () => {
    const [user, setUser] = useState({
        username: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:8080/api/v1/user/login", user, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });
            navigate("/");
            dispatch(setAuthUser(res.data));
        } catch (error) {
            console.error("Login error:", error.response ? error.response.data : error.message);
            toast.error("Login failed. Please try again.");
        }
        setUser({
            username: "",
            password: "",
        });
    };

    return (
        <div className="min-w-96 mx-auto">
            <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100">
                <h1 className="text-4xl font-bold text-center text-white">Login</h1>
                <form onSubmit={onSubmitHandler}>
                    <div>
                        <label className="label p-2">
                            <span className="text-base label-text text-white">Username</span>
                        </label>
                        <input
                            value={user.username}
                            onChange={(e) => setUser({ ...user, username: e.target.value })}
                            className="w-full input-bordered h-10 bg-blue-200 text-black hover:bg-blue-300 transition-colors duration-200"
                            type="text"
                            placeholder=""
                        />
                    </div>
                    <div>
                        <label className="label p-2">
                            <span className="text-base label-text text-white">Password</span>
                        </label>
                        <div className="relative">
                            <input
                                value={user.password}
                                onChange={(e) => setUser({ ...user, password: e.target.value })}
                                className="w-full input-bordered h-10 bg-blue-200 text-black hover:bg-blue-300 transition-colors duration-200 pr-10"
                                type={showPassword ? "text" : "password"}
                                placeholder=""
                            />
                            <span
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                            >
                                {showPassword ? <IoEyeOff className="text-gray-600" /> : <IoEye className="text-gray-600" />}
                            </span>
                        </div>
                    </div>

                    <p className="text-center my-2 text-white">
                        Don't have an account? <Link to="/register" className="text-blue-300 hover:underline">Sign Up</Link>
                    </p>

                    <div>
                        <button type="submit" className="btn btn-block btn-sm mt-2 border border-slate-700">Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
