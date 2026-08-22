import {type ProjectResponseDto, useNextProjects, useSearchProjectsByTitle} from "@/features/volunteer/volHooks.ts";
import {
    Box,
    Container,
    Grid,
    Stack,
    Typography,
    Button,
    CircularProgress
} from "@mui/material";
import ProjectCard from "@/features/volunteer/components/ProjectCard.tsx";
import {useState} from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import * as React from "react";

const PAGE_SIZE = 5;

export default function Projects() {

    const [search, setSearch] = useState("");
    const [submittedSearch, setSubmittedSearch] = useState("");

    const [direction, setDirection] = useState<"NEXT" | "PREVIOUS">("NEXT");
    const [cursor, setCursor] = useState(null);


    const nextProjectsQuery = useNextProjects({
        direction,
        cursor,
        limit: PAGE_SIZE
    });

    const searchProjectsQuery = useSearchProjectsByTitle({
        title: submittedSearch,
        cursor,
        limit: PAGE_SIZE,
        direction: direction === "NEXT" ? "NEXT" : "PREVIOUS",
        enabled: !!submittedSearch
    });

    const activeQuery = submittedSearch ? searchProjectsQuery : nextProjectsQuery;

    const {
        data: cursorPage,
        isLoading: isLoadingProjects
    } = activeQuery;

    if (isLoadingProjects) {
        return (<Box sx={{display: "flex", justifyContent: "center"}}>
            <CircularProgress/>;
        </Box>)
    }

    const {
        projects = [],
        nextCursor,
        previousCursor
    } = cursorPage ?? {};

    function handleSearch(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key !== "Enter") return;

        setSubmittedSearch(search);
        setCursor(null);
        setDirection("NEXT");

    }

    function handleNext() {
        if (!nextCursor) return;
        setDirection("NEXT");
        setCursor(nextCursor);
    }

    function handlePrevious() {
        if (!previousCursor) return;
        setDirection("PREVIOUS");
        setCursor(previousCursor);
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
                    }}
                    onKeyUp={handleSearch}
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
                    {projects.map((project: ProjectResponseDto) => (
                        <Grid size={12} key={project.id}>
                            <ProjectCard project={project}/>
                        </Grid>
                    ))}
                </Grid>

                <Stack
                    direction="row"
                    spacing={2}
                    sx={{justifyContent: "flex-end"}}
                >
                    <Button
                        variant="outlined"
                        disabled={
                            !previousCursor ||
                            isLoadingProjects
                        }
                        onClick={handlePrevious}
                    >
                        Previous
                    </Button>

                    <Button
                        variant="contained"
                        disabled={
                            !nextCursor ||
                            isLoadingProjects
                        }
                        onClick={handleNext}
                    >
                        {isLoadingProjects ? <CircularProgress size={20}/> : "Next"}
                    </Button>
                </Stack>
            </Stack>
        </Container>
    );
}