import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import { useState } from "react";

export default function NestedDrawers() {
  const [openFirstDrawer, setOpenFirstDrawer] = useState(false);
  const [openSecondDrawer, setOpenSecondDrawer] = useState(false);

  const toggleFirstDrawer = () => {
    setOpenFirstDrawer(!openFirstDrawer);
  };

  const toggleSecondDrawer = () => {
    setOpenSecondDrawer(!openSecondDrawer);
  };

  return (
    <div>
      <Button onClick={toggleFirstDrawer}>Open First Drawer</Button>

      {/* First Drawer */}
      <Drawer anchor="left" open={openFirstDrawer} onClose={toggleFirstDrawer}>
        <Box sx={{ width: 250, p: 2 }}>
          <h2>First Drawer</h2>
          <Button onClick={toggleSecondDrawer}>Open Second Drawer</Button>
        </Box>
      </Drawer>

      {/* Second Drawer */}
      <Drawer
        anchor="right"
        open={openSecondDrawer}
        onClose={toggleSecondDrawer}
        // Utiliser PaperProps pour ajuster la largeur pour ne pas recouvrir le premier Drawer
        PaperProps={{
          sx: { width: 250, position: "absolute", top: 0, right: 0 },
        }}
      >
        <Box sx={{ width: 250, p: 2 }}>
          <h2>Second Drawer</h2>
          <p>This is the second drawer.</p>
        </Box>
      </Drawer>
    </div>
  );
}
