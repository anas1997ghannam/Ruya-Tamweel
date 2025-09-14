import { Grid, Paper, Typography } from "@mui/material";

interface Props {
  label: string;
  value: number;
}

export default function UserStatsCard({ label, value }: Props) {
  return (
    <Grid sx={{ xs: 12, sm: 6, md: 3 }}>
      <Paper sx={{ p: 2, textAlign: "center", backgroundColor: "#1e1e1e" }}>
        <Typography variant="subtitle1" color="text.secondary">
          {label}
        </Typography>
        <Typography variant="h5" fontWeight="bold">
          {value}
        </Typography>
      </Paper>
    </Grid>
  );
}
