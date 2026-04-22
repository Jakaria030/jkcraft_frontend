import Header from "../components/Dashboard/Header";
import Projects from "../components/Dashboard/Projects";

const Dashboard = () => {
    return (
        <div className="space-y-6">
            {/* Header */}
            <Header />

            {/* Projects */}
            <Projects />
        </div>
    );
};

export default Dashboard;