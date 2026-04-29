import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { getCurrentVersionProject, updateCurrentVersionProject, updateFont, updateTheme } from "../services/versionServices";
import { debounce } from "../utils/debounce";
import { redoProjectState, undoProjectState } from "../services/stateServices";

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
                console.error(err?.response?.data?.message);
            } finally {
                setIsSaving(false);
            }
        }), []);

    // Update Theme
    const handleUpdateTheme = async (data) => {
        try {
            await updateTheme(projectId, data);
        } catch (err) {
            console.error(err?.response?.data?.message);
        }
    };

    // Update fonts
    const handleUpdateFont = async (data) => {
        try {
            await updateFont(projectId, data);
        } catch (err) {
            console.error(err?.response?.data?.message);
        }
    };

    // Handle undo 
    const handleUndo = async () => {
        try {
            const res = await undoProjectState(projectId);
            setProject(res.data);
        } catch (err) {
            console.log(err?.response?.data?.message);
        }
    };

    // Handle redo 
    const handleRedo = async () => {
        try {
            const res = await redoProjectState(projectId);

            setProject(res.data);
        } catch (err) {
            console.error(err?.response?.data?.message);
        }
    };

    useEffect(() => {
        fetchProject();
    }, [projectId]);

    return (
        <ProjectContext.Provider value={{
            project,
            projectLoading,
            saveProject: handeSave,
            updateTheme: handleUpdateTheme,
            isSaving,
            handleUndo,
            handleRedo,
            updateFont: handleUpdateFont,
        }}>
            {children}
        </ProjectContext.Provider>
    );
};

export const useProject = () => useContext(ProjectContext);