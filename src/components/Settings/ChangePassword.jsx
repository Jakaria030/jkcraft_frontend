import { useState } from "react";
import { changeUserPassword } from "../../services/userServices";
import ErrorCard from "../ErrorCard";

const ChangePassword = () => {
    const [password, setPassword] = useState({ oldPassword: "", newPassword: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handlePasswordChange = (e) => {
        setPassword({ ...password, [e.target.name]: e.target.value });
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError(null);
        try {
            await changeUserPassword(password);
            setPassword({ oldPassword: "", newPassword: "" });
        } catch (err) {
            setError(err?.response?.data?.message || "Change failed.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Change Password
            </h3>

            <form onSubmit={handlePasswordSubmit} className="space-y-4">

                <input
                    type="password"
                    name="oldPassword"
                    value={password.oldPassword}
                    onChange={handlePasswordChange}
                    placeholder="Current Password"
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary"
                />

                <input
                    type="password"
                    name="newPassword"
                    value={password.newPassword}
                    onChange={handlePasswordChange}
                    placeholder="New Password"
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary"
                />

                <button className="bg-primary text-white px-4 py-2 rounded-md hover:opacity-90 cursor-pointer">
                    Change Password
                </button>
            </form>

            {error && (
                <ErrorCard message={error} />
            )}
        </div>
    );
};

export default ChangePassword;