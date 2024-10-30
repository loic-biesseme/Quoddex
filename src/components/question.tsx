import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import Timeline from "@mui/lab/Timeline";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import { Avatar, Box, Button, Card, CardMedia, Divider, Grow, IconButton } from "@mui/material";
// import { useEffect, useState } from "react";
import { textTruncate3lineStyle } from "../constants/style";
import { Text } from "./utils";

export default function Question() {
  // const [init, setInit] = useState(false);

  // useEffect(() => {
  //   setInit(true);
  // }, []);

  return (
    <Grow in={true} style={{}} {...{ timeout: 600 }}>
      <Box>
        <Text text={"Une minute pour aider ?"} variant="subtitle1" color="text.secondary" sx={{ mx: 1, my: 0.5 }} />
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
                  <IconButton sx={{ m: 0, p: 0.3, "&:focus": { outline: "none" } }}>
                    <MoreHorizRoundedIcon />
                  </IconButton>
                </Box>
                <Box sx={{ mt: 0.6, mx: 0.3, fontSize: ".96rem", fontFamily: "Georgia, serif", ...textTruncate3lineStyle }}>Ma Question est la suivante, elle est êtremement pertinente, je vous prévient. Voulez-vous vraiment que je continue, dois-je réelement continuer ?</Box>
                <Card sx={{ mt: 1, textAlign: "start", backgroundColor: "#fff", border: "1px solid", borderColor: "grey.300", boxShadow: 0, borderRadius: "16px" }}>
                  {/* <Box sx={{ py: 0.5, px: 2, height: "auto", ...textTruncate3lineStyle }}>Ma Question est la suivante, elle est êtremement pertinente, je vous prévient. Voulez-vous vraiment que je continue, dois-je réelement continuer ?</Box> */}
                  <CardMedia sx={{ height: 130 }} image="/static/images/wallpaper/outriders.jpg" />
                </Card>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem sx={{ height: "auto", minHeight: "10px" }}>
              <TimelineSeparator>
                <Avatar sx={{ width: 15, height: 15, fontSize: 8, m: 1, backgroundColor: "#2196f3" }} alt="Loic Biesseme" src={`/static/images/avatar/@username1.jpg`} />
              </TimelineSeparator>
              <TimelineContent sx={{ display: "flex", height: 20, justifyContent: "space-between", fontSize: ".9rem" }}>
                <Button sx={{ borderRadius: "14px", textTransform: "capitalize", fontWeight: "bold", "&:focus": { outline: "none" } }}>répondre</Button>
                <Divider orientation="vertical" flexItem />
                <Button sx={{ borderRadius: "14px", textTransform: "capitalize", fontWeight: "bold", "&:focus": { outline: "none" } }}>Suivre</Button>
                <Divider orientation="vertical" flexItem />
                <Button sx={{ borderRadius: "14px", textTransform: "capitalize", fontWeight: "bold", "&:focus": { outline: "none" } }}>Partager</Button>
              </TimelineContent>
            </TimelineItem>
          </Timeline>
        </Card>
      </Box>
    </Grow>
  );
}
