import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { IoEye, IoEyeOff } from "react-icons/io5"; 

const Signup = () => {
    const [user, setUser] = useState({
        fullName: "",
        username: "",
        password: "",
        confirmPassword: "",
        gender: ""
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        if (user.password !== user.confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        try {
            const res = await axios.post("http://localhost:8080/api/v1/user/register", user, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });

            if (res.data) {
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.error("Signup error:", error.response ? error.response.data : error.message);
            toast.error("Signup failed. Please try again.");
        }

        setUser({
            fullName: "",
            username: "",
            password: "",
            confirmPassword: "",
            gender: ""
        });
    };

    const handleGenderChange = (e) => {
        setUser({ ...user, gender: e.target.value });
    };

    return (
        <div className="min-w-96 mx-auto">
            <div className="w-full p-6 rounded-lg shadow-md bg-gray-500 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100">
                <h1 className="text-3xl font-bold text-center text-white">Signup</h1>
                <form onSubmit={onSubmitHandler}>
                    <div>
                        <label className="label p-2">
                            <span className="text-base label-text text-white">Full Name</span>
                        </label>
                        <input
                            value={user.fullName}
                            onChange={(e) => setUser({ ...user, fullName: e.target.value })}
                            className="w-full input-bordered h-10 bg-blue-200 text-black hover:bg-blue-300 transition-colors duration-200"
                            type="text"
                            placeholder=""
                        />
                    </div>
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
                    <div>
                        <label className="label p-2">
                            <span className="text-base label-text text-white">Confirm Password</span>
                        </label>
                        <div className="relative">
                            <input
                                value={user.confirmPassword}
                                onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
                                className="w-full input-bordered h-10 bg-blue-200 text-black hover:bg-blue-300 transition-colors duration-200 pr-10"
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder=""
                            />
                            <span
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                            >
                                {showConfirmPassword ? <IoEyeOff className="text-gray-600" /> : <IoEye className="text-gray-600" />}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center my-4">
                        <div className="flex items-center">
                            <p className="text-white">Male:</p>
                            <input
                                type="radio"
                                value="male"
                                checked={user.gender === "male"}
                                onChange={handleGenderChange}
                                className="radio mx-2 accent-blue-200"
                            />
                        </div>
                        <div className="flex items-center">
                            <p className="text-white">Female:</p>
                            <input
                                type="radio"
                                value="female"
                                checked={user.gender === "female"}
                                onChange={handleGenderChange}
                                className="radio mx-2 accent-blue-200"
                            />
                        </div>
                    </div>

                    <p className="text-center my-2 text-white">
                        Already have an account? 
                        <Link to="/" className="text-blue-200 hover:text-blue-300"> Login</Link>
                    </p>

                    <div>
                        <button type="submit" className="btn btn-block btn-sm mt-2 border border-slate-700">Signup</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;
