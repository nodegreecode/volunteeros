import { Box, Button, MenuItem, Stack, TextField } from "@mui/material";
import { useState } from "react";

export default function ParticipationFilters() {
  const [project, setProject] = useState("");
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");

  const handleReset = () => {
    setProject("");
    setStatus("");
    setSearch("");
  };

  return (
    <Box>
      <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
        <TextField
          select
          label="Project"
          value={project}
          onChange={(e) => setProject(e.target.value)}
          sx={{ minWidth: 220 }}
        >
          <MenuItem value="">All projects</MenuItem>

          <MenuItem value="1">Beach Cleanup</MenuItem>

          <MenuItem value="2">Food Drive</MenuItem>
        </TextField>

        <TextField
          select
          label="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          sx={{ minWidth: 180 }}
        >
          <MenuItem value="">All statuses</MenuItem>

          <MenuItem value="PENDING">Pending</MenuItem>

          <MenuItem value="APPROVED">Approved</MenuItem>

          <MenuItem value="REJECTED">Rejected</MenuItem>
        </TextField>

        <TextField
          label="Search volunteer"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Name or email"
          sx={{ flex: 1 }}
        />

        <Button variant="outlined" onClick={handleReset}>
          Reset
        </Button>
      </Stack>
    </Box>
  );
}
