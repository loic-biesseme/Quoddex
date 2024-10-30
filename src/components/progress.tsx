import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

export default function Progress() {
  return (
    <Box sx={{ width: "100%", height: "65vh", display: "flex" }}>
      <svg width={0} height={0}>
        <defs>
          <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgb(76, 175, 80, 0.9)" />
            <stop offset="100%" stopColor="rgba(33, 150, 243, .9)" />
          </linearGradient>
        </defs>
      </svg>
      <CircularProgress sx={{ m: "auto", p: 1, boxShadow: 0, borderRadius: "50%", "svg circle": { stroke: "url(#my_gradient)" } }} />
    </Box>
  );
}
