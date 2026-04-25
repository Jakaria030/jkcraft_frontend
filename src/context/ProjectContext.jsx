import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { getCurrentVersionProject, updateCurrentVersionProject } from "../services/versionServices";
import { debounce } from "../utils/debounce";

const ProjectContext = createContext(null);

export const ProjectProvider = ({ projectId, children }) => {
    const [project, setProject] = useState({});
    const [projectLoading, setProjectLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    // Fetch current verison project
    const fetchProject = async () => {
        setProjectLoading(true);
        try {
            const res = await getCurrentVersionProject(projectId);

            setProject(res.data);

            return res;
        } finally {
            setProjectLoading(false);
        }
    };

    // Handle save project
    const handeSave = useCallback(
        debounce(async (data) => {
            setIsSaving(true);
            try {
                const res = await updateCurrentVersionProject(projectId, data);
                setProject(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setIsSaving(false);
            }
        }), []);

    useEffect(() => {
        fetchProject();
    }, [projectId]);

    return (
        <ProjectContext.Provider value={{
            project,
            projectLoading,
            saveProject: handeSave,
            isSaving,
        }}>
            {children}
        </ProjectContext.Provider>
    );
};

export const useProject = () => useContext(ProjectContext);