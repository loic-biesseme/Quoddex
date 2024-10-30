import AddPhotoAlternateRoundedIcon from "@mui/icons-material/AddPhotoAlternateRounded";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import Timeline from "@mui/lab/Timeline";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import { Avatar, Box, Card, IconButton } from "@mui/material";
import { textTruncate3lineStyle } from "../constants/style";

export default function AskQuestion() {
  return (
    <>
      <Card sx={{ boxShadow: 0, border: 0, background: "linear-gradient(25deg, rgb(33, 150, 243, .15) 30%, rgb(100, 181, 246,.1) 90% 90%)", mb: 3, py: 1, borderRadius: "20px", overflow: "hidden", position: "relative" }}>
        <Timeline sx={{ [`& .${timelineItemClasses.root}:before`]: { flex: 0, padding: 0, margin: 0 }, m: 0 }}>
          <TimelineItem>
            <TimelineSeparator>
              <Avatar sx={{ width: 30, height: 30, fontSize: 18, mb: 1 }} alt="Loic Biesseme" src={`/static/images/avatar/@username.jpg`} />
              <TimelineConnector sx={{ visibility: "hid den" }} />
            </TimelineSeparator>
            <TimelineContent sx={{ display: "flex", flexDirection: "column" }}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box>Loic Biesseme</Box>
                <Box>
                  <IconButton sx={{ m: 0, mr: 1.5, p: 0.3, "&:focus": { outline: "none" } }}>
                    <AddPhotoAlternateRoundedIcon />
                  </IconButton>
                  <IconButton sx={{ m: 0, mr: 1.5, p: 0.3, "&:focus": { outline: "none" } }}>
                    <PersonOffIcon />
                  </IconButton>
                  <IconButton sx={{ m: 0, p: 0.3, "&:focus": { outline: "none" } }}>
                    <SendRoundedIcon sx={{}} /> {/* color: "rgba(33, 150, 243, .9)" */}
                  </IconButton>
                </Box>
              </Box>
              <Card sx={{ mt: 1, textAlign: "start", backgroundColor: "#fff", border: "1px solid", borderColor: "grey.300", boxShadow: 0, borderRadius: "16px" }}>
                <Box sx={{ py: 0.5, px: 2, height: "auto", ...textTruncate3lineStyle }}>Posez une question...</Box>
              </Card>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      </Card>
    </>
  );
}
