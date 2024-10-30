import { Avatar, Box, Button, Divider } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

export default function Downloaders() {
  return (
    <List sx={{ mt: 0, pt: 0 }}>
      {/* {items.map((item, index) => ( */}
      <Box sx={{ display: "flex", justifyContent: "flex-start", ml: 1 }}>
        <Divider variant="inset" component="li" sx={{ width: "76%", maxWidth: 360, mr: 5 }} />
      </Box>
      <ListItem disablePadding>
        <ListItem sx={{ m: 1, borderRadius: "18px" }}>
          <ListItemIcon sx={{ mr: 1.5, minWidth: "auto" }}>
            <Avatar sx={{ width: 45, height: 45, fontSize: 18 }} alt="Loic Biesseme" src="/static/images/avatar/1.jpg" />
          </ListItemIcon>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0, mr: "auto" }}>
            <ListItemText primary={"Loic Biesseme"} sx={{ m: 0, p: 0 }} />
            <ListItemText primary={"@" + "Elon Musk".replace(/\s+/g, "")} sx={{ m: 0, p: 0 }} primaryTypographyProps={{ fontSize: "0.8rem", m: 0, p: 0, textTransform: "lowercase", color: "text.secondary" }} />
          </Box>
          <ListItemIcon sx={{ display: "flex", justifyContent: "end" }}>
            <Button sx={{ border: "1px solid", borderColor: "grey.300", p: 0.8, borderRadius: 3, textTransform: "capitalize", "&:focus": { outline: "none", borderColor: "grey.300" }, "&:active": { outline: "none", borderColor: "primary.main" } }}>Suivre</Button>
          </ListItemIcon>
        </ListItem>
      </ListItem>
      {/* <ListItem disablePadding>
        <ListItem sx={{ m: 1, borderRadius: "18px" }}>
          <ListItemIcon sx={{ mr: 1.5, minWidth: "auto" }}>
            <Avatar sx={{ width: 35, height: 35, fontSize: 18 }} alt="Loic Biesseme" src="/static/images/avatar/1.jpg" />
          </ListItemIcon>
          <Box sx={{ display: "flex", flexDirection: "", gap: 0, mr: "auto" }}>
            <ListItemText primary={"Loic Biesseme"} sx={{ m: 0, p: 0 }} />
            <ListItemText primary={"@" + "Elon Musk".replace(/\s+/g, "")} sx={{ m: 0, p: 0 }} primaryTypographyProps={{ mx: 0.5, p: 0, textTransform: "lowercase", color: "text.secondary" }} />
          </Box>
          <ListItemIcon sx={{ display: "flex", justifyContent: "end" }}>
            <Button sx={{ border: "1px solid", borderColor: "grey.300", p: 0.4, borderRadius: 3, textTransform: "capitalize", "&:focus": { outline: "none" } }}>Suivre</Button>
          </ListItemIcon>
        </ListItem>
      </ListItem> */}
      {/* ))} */}
    </List>
  );
}
