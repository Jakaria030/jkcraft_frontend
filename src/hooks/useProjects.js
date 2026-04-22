import { useEffect, useState } from "react";
import { createProject, deleteProject, getProjects } from "../services/projectServices";

const useProjects = () => {
    const [projects, setProjects] = useState([]);
    const [projectsLoading, setProjectsLoading] = useState(false);

    // fetch projects
    const fetchProjects = async () => {
        setProjectsLoading(true);
        try {
            const res = await getProjects();
            setProjects(res?.data || []);
        } finally {
            setProjectsLoading(false);
        }
    };

    // create project
    const handleCreateProject = async (data) => {
        setProjectsLoading(true);
        try {
            const res = await createProject(data);

            setProjects((prev) => [res.data, ...prev]);

            return res;
        } finally {
            setProjectsLoading(false);
        }
    };

    const handleDeleteProject = async (id) => {
        try {
            const res = await deleteProject(id);

            setProjects(prev =>
                prev.filter(project => project._id !== id)
            );

            return res;
        } catch (err) {
            throw err;
        }
    }

    useEffect(() => {
        fetchProjects();
    }, []);

    return {
        projects,
        projectsLoading,
        createProject: handleCreateProject,
        deleteProject: handleDeleteProject,
    };
};

export default useProjects;