import AddIcon from "@mui/icons-material/Add";
import ChatBubbleRoundedIcon from "@mui/icons-material/ChatBubbleRounded";
import DownloadDoneRoundedIcon from "@mui/icons-material/DownloadDoneRounded";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import HelpOutlineRoundedIcon from "@mui/icons-material/HelpOutlineRounded";
import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import PersonAddRoundedIcon from "@mui/icons-material/PersonAddRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { Avatar, Box, IconButton, SxProps } from "@mui/material";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { KeyboardEvent, MouseEvent, useState } from "react";

import { Link } from "react-router-dom";

interface ToggleDrawerProps {
  addStyle?: SxProps;
  active?: string;
}

export default function SideBar({ addStyle, active }: ToggleDrawerProps) {
  const [state, setState] = useState({ left: false });
  const pinnedRoutes = ["/studies", "/revisions", "/bookmarks", "/downloads", "/chats"];
  const icoStyle = {
    backgroundColor: "rgba(167, 167, 167, .18)",
    color: "black",
    borderRadius: "14px",
    p: 1,
  };

  const toggleDrawer = (open: boolean) => (event: KeyboardEvent | MouseEvent) => {
    if (event && event.type === "keydown" && ((event as KeyboardEvent).key === "Tab" || (event as KeyboardEvent).key === "Shift")) {
      return;
    }

    setState({ ["left"]: open });
  };

  const routeItems = [
    { text: "Etude", link: "/studies", icon: <SchoolRoundedIcon sx={icoStyle} /> },
    { text: "Révision", link: "/revisions", icon: <HistoryRoundedIcon sx={icoStyle} /> },
    { text: "Favoris", link: "/bookmarks", icon: <StarRoundedIcon sx={icoStyle} /> },
    { text: "Téléchargements", link: "/downloads", icon: <DownloadDoneRoundedIcon sx={icoStyle} /> },
    { text: "Chat", link: "/chats", icon: <ChatBubbleRoundedIcon sx={icoStyle} /> },
  ];
  const options = [
    { text: "Filtrer ma selection", icon: <FilterListOutlinedIcon sx={icoStyle} /> },
    { text: "Proposer un exercice", icon: <AddIcon sx={icoStyle} /> },
    { text: "Uploader une épreuve", icon: <UploadFileIcon sx={icoStyle} /> },
  ];
  const more = [
    { text: "Inviter un ami", link: "/share", icon: <PersonAddRoundedIcon sx={icoStyle} /> },
    { text: "Besoin d'aide", link: "/help", icon: <HelpOutlineRoundedIcon sx={icoStyle} /> },
  ];
  const list = () => (
    <Box sx={{ width: 333 }} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
      <List>
        <ListItem disablePadding>
          <ListItemButton sx={{ m: 1, borderRadius: "10px" }}>
            <ListItemIcon>
              <Avatar sx={{ width: 35, height: 35, fontSize: 18 }} alt="Loic Biesseme" src={`/static/images/avatar/@username.jpg`} />
            </ListItemIcon>
            <ListItemText primary={"Loic Biesseme"} />
            <ListItemIcon sx={{ display: "flex", justifyContent: "end" }}>
              <SettingsRoundedIcon />
            </ListItemIcon>
          </ListItemButton>
        </ListItem>
      </List>
      {routeItems.length > pinnedRoutes.length && <Divider />}
      <List>
        {routeItems.map(
          (item, index) =>
            !pinnedRoutes.includes(item.link) && (
              <ListItem key={index} disablePadding>
                <ListItemButton sx={{ mx: 1, borderRadius: "16px", backgroundColor: active === item.link ? "rgba(167, 167, 167, .2)" : "transparent", my: 0.25 }}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} sx={{ color: "initial" }} />
                </ListItemButton>
              </ListItem>
            )
        )}
      </List>
      <Divider />
      <List>
        {options.map((option, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton sx={{ mx: 1, borderRadius: "16px" }}>
              <ListItemIcon>{option.icon}</ListItemIcon>
              <ListItemText primary={option.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {more.map((elt, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton sx={{ mx: 1, borderRadius: "16px", color: "inherit" }} to={elt.link} component={Link}>
              <ListItemIcon>{elt.icon}</ListItemIcon>
              <ListItemText primary={elt.text} sx={{ color: "initial" }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <IconButton onClick={toggleDrawer(true)} sx={{ ...addStyle }}>
        <MenuRoundedIcon sx={{ width: 23, height: 23 }} />
      </IconButton>
      <SwipeableDrawer
        anchor={"left"}
        open={state["left"]}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        sx={{
          "& .MuiDrawer-paper": {
            transition: "transform 4.3s ease-in-out",
          },
        }}
      >
        {list()}
      </SwipeableDrawer>
    </>
  );
}
