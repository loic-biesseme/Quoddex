import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import ChatBubbleRoundedIcon from "@mui/icons-material/ChatBubbleRounded";
// import DownloadDoneRoundedIcon from "@mui/icons-material/DownloadDoneRounded";
import GetAppRoundedIcon from "@mui/icons-material/GetAppRounded";
import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { Link } from "react-router-dom";
import useRouteMatch from "./hooks/useRouteMatch";

export default function MainNav() {
  const pinnedRoutes: string[] = ["/studies", "/revisions", "/pinned"];
  const routeMatch = useRouteMatch(["/studies", "/revisions", "/pinned", "/downloads", "/chats"]);
  const currentTab = routeMatch?.pattern?.path;
  const items = [
    { label: "Etude", link: "/studies", icon: <SchoolOutlinedIcon />, iconActive: <SchoolRoundedIcon /> },
    { label: "Révision", link: "/revisions", icon: <HistoryRoundedIcon />, iconActive: <HistoryRoundedIcon /> },
    { label: "Favoris", link: "/pinned", icon: <StarOutlineRoundedIcon />, iconActive: <StarRoundedIcon /> },
    { label: "Téléch.", link: "/downloads", icon: <GetAppRoundedIcon />, iconActive: <GetAppRoundedIcon /> },
    { label: "Chat", link: "/chats", icon: <ChatBubbleOutlineRoundedIcon />, iconActive: <ChatBubbleRoundedIcon /> },
  ];
  const tabStyle = {
    textTransform: "capitalize",
    flex: 1,
    minWidth: "auto",
    textAlign: "center",
    borderRadius: "15px/15px",
  };

  return (
    <>
      {pinnedRoutes.length && (
        <Tabs value={currentTab} TabIndicatorProps={{ style: { display: "none" } }} sx={{ zIndex: 1200, position: "fixed", bottom: 0, left: 0, right: 0, px: 4, width: "auto", backgroundColor: "white", borderRadius: "20px 20px 0 0", boxShadow: "0 -.4px 4px rgba(0,0,0,0.1)" }}>
          {items.map((item, index) => pinnedRoutes.includes(item.link) && <Tab key={index} icon={currentTab == item.link ? item.iconActive : item.icon} label={item.label} value={item.link} to={item.link} component={Link} sx={tabStyle} />)}
        </Tabs>
      )}
    </>
  );
}
