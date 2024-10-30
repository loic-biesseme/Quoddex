import { Global } from "@emotion/react";
import TabContext from "@mui/lab/TabContext";
import { Divider, Tabs } from "@mui/material";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Tab from "@mui/material/Tab";
import { grey } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import { SyntheticEvent, useState } from "react";
import Downloaders from "./downloaders";

interface Props {
  total_pinners: string;
  total_players_and_downloaders: string;
  children?: React.ReactNode;
  window?: () => Window;
}

const drawerBleeding = 64;
const Root = styled("div")(({ theme }) => ({ height: "100%", ...theme.applyStyles("dark", { backgroundColor: theme.palette.background.default }) }));
const StyledBox = styled("div")(({ theme }) => ({ backgroundColor: "#fff", ...theme.applyStyles("dark", { backgroundColor: grey[800] }) }));
const Puller = styled("div")(({ theme }) => ({ width: 30, height: 6, backgroundColor: grey[300], borderRadius: 3, position: "absolute", top: 8, left: "calc(50% - 15px)", ...theme.applyStyles("dark", { backgroundColor: grey[900] }) }));

export default function PinnesDownloaders(props: Props) {
  const { total_pinners, total_players_and_downloaders, window, children } = props;
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("downloaders");
  const container = window !== undefined ? () => window().document.body : undefined;

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const handleChange = (_event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Root>
      {/* <CssBaseline /> */}
      <Global styles={{ ".swiper-bottom-to-top-drawer > .MuiPaper-root": { maxHeight: `calc(47% - ${drawerBleeding}px)`, overflow: "visible" } }} />
      <span onClick={toggleDrawer(true)}>{children}</span>
      <SwipeableDrawer className="swiper-bottom-to-top-drawer" container={container} anchor="bottom" open={open} onClose={toggleDrawer(false)} onOpen={toggleDrawer(true)} swipeAreaWidth={drawerBleeding} disableSwipeToOpen={true} ModalProps={{ keepMounted: false }}>
        <StyledBox sx={{ position: "absolute", top: -drawerBleeding, borderTopLeftRadius: 30, borderTopRightRadius: 30, visibility: "visible", right: 0, left: 0 }}>
          <Puller />

          <TabContext value={value}>
            <Tabs value={value} onChange={handleChange} centered sx={{ display: "flex", pt: 2 }}>
              <Tab label={total_players_and_downloaders} value="downloaders" sx={{ flex: 1, textTransform: "none", fontWeight: 500, fontSize: ".9rem", borderRadius: "14px", "&:focus": { outline: "none" } }} />
              <Tab label={total_pinners} value="pienners" sx={{ flex: 1, textTransform: "none", fontWeight: 500, fontSize: ".9rem", borderRadius: "14px", "&:focus": { outline: "none" } }} />
            </Tabs>
          </TabContext>
          <Divider />
        </StyledBox>
        <StyledBox sx={{ height: "100%", overflow: "auto" }}>
          <Downloaders />
        </StyledBox>
      </SwipeableDrawer>
    </Root>
  );
}
