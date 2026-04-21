import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router";
import Spinner from "../components/Spinner";

const Login = () => {
    const { login } = useAuth();
    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();


    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError(null);
        try {
            const res = await login(form);
            if (res.success) {
                navigate("/dashboard");
            }
        } catch (err) {
            console.log(err)
            setError(err?.response?.data?.message || "Login failed. Please try again.");
        } finally {
            setLoading(false);
        }

    };

    const disableButton = !form.email || !form.password;

    return (
        <div className="h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">

                <div className="space-y-2 mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 text-center">Sign In</h2>
                    <p className="text-md text-gray-600 text-center">Welcome back! Please enter your details.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Email */}
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00cd92]"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00cd92]"
                        />
                    </div>

                    {/* Button */}
                    <button
                        disabled={disableButton}
                        type="submit"
                        className={`w-full py-2 rounded-lg text-white font-semibold hover:opacity-90 transition ${!disableButton ? "bg-[#00cd92] cursor-pointer" : "cursor-not-allowed bg-gray-400"}`}
                    >
                        {loading ? "Login..." : "Login"}
                    </button>

                </form>

                {error && (
                    <p className="text-sm text-red-500 text-center bg-red-50 py-2 rounded-lg">
                        {error}
                    </p>
                )}

                <p className="text-sm text-gray-500 text-center mt-4">
                    Don’t have an account?{" "}
                    <Link to={"/register"} className="text-[#00cd92] font-medium">
                        Register
                    </Link>
                </p>

            </div>
        </div>
    );
};

export default Login;