import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import ErrorCard from "./ErrorCard";
import { updateUserProfile } from "../services/userServices";

const UpdateProfile = () => {
    const { user, setUser } = useAuth();

    const [name, setName] = useState(user?.name || "");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleProfileUpdate = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError(null);
        try {
            const res = await updateUserProfile({ name });
            setUser(res?.data?.user);
        } catch (err) {
            setError(err?.response?.data?.message || "Update failed.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Update Profile
            </h3>

            <form onSubmit={handleProfileUpdate} className="space-y-4">

                {/* Name */}
                <div>
                    <label className="text-sm text-gray-600">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>

                {/* Email (readonly) */}
                <div>
                    <label className="text-sm text-gray-600">Email</label>
                    <input
                        type="email"
                        value={user?.email || ""}
                        disabled
                        className="w-full mt-1 px-4 py-2 border rounded-md bg-gray-100 cursor-not-allowed"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-primary text-white px-4 py-2 rounded-md hover:opacity-90 cursor-pointer"
                >
                    {loading ? "Updating..." : "Update Name"}
                </button>
            </form>

            {error && (
                <ErrorCard message={error} />
            )}
        </div>
    );
};

export default UpdateProfile;
