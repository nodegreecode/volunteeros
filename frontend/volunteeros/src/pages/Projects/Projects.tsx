import {type ProjectResponseDto, useAllActiveProjects, useNextProjects} from "@/features/volunteer/volHooks.ts";
import {Box, Container, Grid, Pagination, Stack, Typography, Button} from "@mui/material";
import ProjectCard from "@/features/volunteer/components/ProjectCard.tsx";
import {data} from "framer-motion/m";
import {useState} from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import Loading from "@/components/common/Loading.tsx";


export default function Projects() {

    const [page, setPage] = useState(0);
    const [search, setSearch] = useState("");

    const [cursor, setCursor] = useState(null);

    const limit = 5;

    const {data: nextProjects, isLoading} = useNextProjects({cursor, limit});

    if (isLoading) {
        return <Loading/>;
    }

    const projects = nextProjects.projects;

    function handleNext() {
        if (nextProjects.nextCursor) {
            setCursor(nextProjects.nextCursor);
        }
    }

    function handlePrevious() {
        if (nextProjects.previousCursor) {
            setCursor(nextProjects.previousCursor);
        }
    }

    return (
        <Container maxWidth="xl">
            <Stack spacing={3}>
                <Box>
                    <Typography color="text.secondary">
                        Find volunteering opportunities
                    </Typography>
                </Box>

                <TextField
                    fullWidth
                    placeholder="Seacrch projects by title"
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setPage(0);
                    }}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon/>
                                </InputAdornment>
                            )
                        }
                    }}
                />

                <Grid container spacing={3}>
                    {projects?.map((project: ProjectResponseDto) => (
                        <Grid
                            size={12}

                            key={project.id}
                        >
                            <ProjectCard project={project}/>
                        </Grid>
                    ))}
                </Grid>
                <Pagination
                    count={projects?.totalPages ?? 0}
                    page={page + 1}
                    onChange={(_, value) => setPage(value - 1)}
                />

                <Stack
                    direction="row"
                    sx={{justifyContent: "space-between"}}
                >
                    <Button
                        variant="outlined"
                        disabled={
                            !data?.previousCursor ||
                            isFetching
                        }
                        onClick={handlePrevious}
                    >
                        Previous
                    </Button>

                    <Button
                        variant="contained"
                        disabled={
                            !nextProjects?.nextCursor ||
                            isLoading
                        }
                        onClick={handleNext}
                    >
                        Next
                    </Button>
                </Stack>
            </Stack>
        </Container>
    );
}