import { useEffect, useState } from "react";
import { createProject, getProjects } from "../services/projectServices";

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

    useEffect(() => {
        fetchProjects();
    }, []);

    return {
        projects,
        projectsLoading,
        createProject: handleCreateProject,
        refetch: fetchProjects,
    };
};

export default useProjects;