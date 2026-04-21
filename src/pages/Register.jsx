import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router";

const Register = () => {
    const { register } = useAuth();
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await register(form);
        if (res.success) {
            navigate("/dashboard");
        }

    };

    return (
        <div className="h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-12">

                <div className="space-y-2 mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 text-center">Create Account</h2>
                    <p className="text-md text-gray-600 text-center">Explore the Possibilities of JKCRAFT.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Name */}
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Enter your name"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00cd92]"
                        />
                    </div>

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
                        type="submit"
                        className="w-full py-2 rounded-lg text-white font-semibold bg-[#00cd92] hover:opacity-90 transition cursor-pointer"
                    >
                        Register
                    </button>

                </form>

                <p className="text-sm text-gray-500 text-center mt-4">
                    Already have an account?{" "}
                    <Link to={"/"} className="text-[#00cd92] font-medium">
                        Login
                    </Link>
                </p>

            </div>
        </div>
    );
};

export default Register;