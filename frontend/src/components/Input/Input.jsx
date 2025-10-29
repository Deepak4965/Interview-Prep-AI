import React, { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6"

const Input = ({ value, onChange, label, placeholder, type }) => {
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return <div className="mb-4">
        <label className="text-[13px] text-slate-800 mb-1 block">{label}</label>

        <div className="input-box relative">
            <input
                type={
                    type === "password" ? (showPassword ? "text" : "password") : type
                }
                placeholder={placeholder}
                className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 pr-10 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={value || ""}
                onChange={(e) => onChange(e)}
            />

            {type === "password" && (
                <>
                    {showPassword ? (
                        <FaRegEye
                            size={22}
                            className="text-blue-200 cursor-pointer absolute right-3 top-1/2 transform -translate-y-1/2"
                            onClick={() => toggleShowPassword()}
                        />
                    ) : (
                        <FaRegEyeSlash
                            size={22}
                            className="text-slate-400 cursor-pointer absolute right-3 top-1/2 transform -translate-y-1/2"
                            onClick={() => toggleShowPassword()}
                        />
                    )}
                </>
            )}
        </div>
    </div>
}

export default Input
