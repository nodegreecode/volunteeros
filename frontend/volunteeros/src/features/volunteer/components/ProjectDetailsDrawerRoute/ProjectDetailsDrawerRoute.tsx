import {
    ProjectDetailsDrawer
} from "@/features/volunteer/components/ProjectDetailsDrawer/ProjectDetailsDrawer.tsx";
import {useNavigate, useParams} from "react-router-dom";


export default function ProjectDetailsDrawerRoute() {

    const navigate = useNavigate();
    const {projectId} = useParams();

    const drawerOpen = Boolean(projectId);

    const handleClose = () => {
        navigate("..");
    };

    return (<ProjectDetailsDrawer
        open
        projectId={projectId}
        onClose={handleClose}/>)
}