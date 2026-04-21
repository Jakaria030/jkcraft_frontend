import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import Spinner from "../components/Spinner";

const ProtectedRoute = ({ children }) => {
    const { user, authLoading } = useAuth();

    if (authLoading) {
        return <Spinner />
    }

    if (!user) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;