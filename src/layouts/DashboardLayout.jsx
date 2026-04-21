import { NavLink, Outlet, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import JKCRAFTLogo from "../assets/JKCRAFT-logo.png";

const DashboardLayout = () => {
    const { user, logout } = useAuth();

    const navigate = useNavigate();

    const firstLetter = user?.name?.charAt(0)?.toUpperCase() || "U";

    const handleLogout = async () => {
        await logout();
        navigate("/");
    };

    return (
        <div className="h-screen flex flex-col bg-gray-200">

            {/* Topbar */}
            <div className="w-full h-14 bg-white shadow flex items-center justify-between px-6 border-b border-gray-200">
                <div className="w-32 h-auto">
                    <img src={JKCRAFTLogo} alt="JKCRAFTLogo" />
                </div>

                <button
                    onClick={handleLogout}
                    className="bg-primary text-white px-4 py-1.5 rounded-md hover:opacity-90 cursor-pointer"
                >
                    Logout
                </button>
            </div>

            {/* Body */}
            <div className="flex flex-1 overflow-hidden ">

                {/* Sidebar */}
                <div className="w-64 bg-white p-4 flex flex-col border-r border-gray-200 space-y-4">

                    {/* Avatar Section */}
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary text-white font-bold uppercase">
                            {firstLetter}
                        </div>

                        <div>
                            <p className="text-sm font-semibold text-gray-800 uppercase">
                                {user?.name || "USER NAME"}
                            </p>
                            <p className="text-xs text-gray-500 uppercase">
                                {user?.role || "USER"}
                            </p>
                        </div>
                    </div>

                    <div className="h-[1px] bg-gray-200"></div>

                    {/* Menu */}
                    <div className="flex flex-col gap-2 text-sm">
                        <NavLink
                            to="/dashboard"
                            className={({ isActive }) =>
                                `text-left px-3 py-2 rounded-md transition uppercase ${isActive ? "bg-primary text-white" : "hover:bg-gray-100"
                                }`
                            }
                        >
                            Dashboard
                        </NavLink>

                        <NavLink
                            to="/settings"
                            className={({ isActive }) =>
                                `text-left px-3 py-2 rounded-md transition uppercase ${isActive ? "bg-primary text-white" : "hover:bg-gray-100"
                                }`
                            }
                        >
                            Settings
                        </NavLink>
                    </div>

                </div>

                {/* Main Content */}
                <div className="flex-1 bg-gray-100 p-6 overflow-y-auto">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;