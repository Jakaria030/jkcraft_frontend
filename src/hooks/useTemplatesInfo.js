import { useEffect, useState } from "react";
import { getTemplatesInfo } from "../services/templateServices";

const useTemplatesInfo = () => {
    const [templatesInfo, setTemplatesInfo] = useState([]);
    const [loadingTemplatesInfo, setLoadingTemplatesInfo] = useState(false);

    const fetchTemplatesInfo = async () => {
        setLoadingTemplatesInfo(true);

        try {
            const res = await getTemplatesInfo();
            setTemplatesInfo(res?.data);
            return res;
        } finally {
            setLoadingTemplatesInfo(false);
        }
    }


    useEffect(() => {
        fetchTemplatesInfo();
    }, []);

    return {
        templatesInfo,
        loadingTemplatesInfo
    };
};

export default useTemplatesInfo;