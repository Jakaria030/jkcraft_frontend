import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import Spinner from "../components/Spinner";

const ProtectedRoute = ({ children }) => {
    const { user, authLoading } = useAuth();

    if (authLoading) {
        return <div className="h-screen flex items-center justify-center"><Spinner /></div>
    }

    if (!user) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;