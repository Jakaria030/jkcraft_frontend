import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { changeUserPassword, updateUserProfile } from "../services/userServices";
import ErrorCard from "../components/ErrorCard";
import UpdateProfile from "../components/UpdateProfile";
import ChangePassword from "../components/ChangePassword";

const Settings = () => {
    const { user } = useAuth();

    const firstLetter = user?.name?.charAt(0)?.toUpperCase() || "U";

    return (
        <div className="max-w-3xl mx-auto space-y-6">

            {/* Profile Card */}
            <div className="bg-white p-6 rounded-lg shadow text-center">

                {/* Avatar */}
                <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-primary text-white text-xl font-bold uppercase">
                    {firstLetter}
                </div>

                {/* Name */}
                <h2 className="mt-3 text-xl font-semibold text-gray-800 uppercase">
                    {user?.name}
                </h2>

                {/* Role */}
                <p className="text-sm text-gray-500 uppercase">
                    {user?.role}
                </p>

            </div>

            {/* Update Profile Card */}
            <UpdateProfile />

            {/* Password Card */}
            <ChangePassword />

        </div>
    );
};

export default Settings;