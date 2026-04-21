const Dashboard = () => {
    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Your Projects</h2>

            <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3].map(i => (
                    <div key={i} className="bg-white p-4 rounded shadow">
                        Project {i}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;