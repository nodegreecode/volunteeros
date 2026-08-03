import {useMyProjects} from "@/features/volunteer/volHooks.ts";
import Loading from "@/components/common/Loading.tsx";
import {Grid} from "@mui/material";
import ApprovedProjectCard from "@/features/volunteer/components/ApprovedProjectCard";

export default function ApprovedProjectList() {
    const {data: projects, isLoading} = useMyProjects();

    if (isLoading) {
        return <Loading/>;
    }

    return (
        <Grid container spacing={3}>
            {projects?.map((project) => (
                <Grid
                    size={{
                        sx: 12,
                        md: 4,
                    }}
                    key={project.id}
                >
                    <ApprovedProjectCard project={project}/>
                </Grid>
            ))}
        </Grid>
    );
}
