import { Box } from "@mui/material";
import SearchFilter from "../components/searchFilter";
import SideBar from "../components/sideBar";
import { Text } from "../components/utils";

export default function Revisions() {
  // const [value, setValue] = useState("files");
  const tabStyle = {
    width: 42,
    height: 42,
    minWidth: "auto",
    "&:focus": { outline: "none", borderColor: "grey.300" },
    "&:active": { outline: "none", borderColor: "primary.main" },
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "14px",
    color: "text.secondary",
    mx: 3,
    my: 0.6,
    border: "1px solid",
    borderColor: "grey.300",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  };

  // const handleChange = (_event: SyntheticEvent, newValue: string) => {
  //   setValue(newValue);
  // };

  return (
    <>
      <Box sx={{ position: "fixed", top: 0, zIndex: 11, display: "flex", alignItems: "center", width: "100%", justifyContent: "space-between", backdropFilter: "blur(10px)", backgroundColor: "rgba(255, 255, 255, 0.5)", boxShadow: "0 .6px 2px rgba(0,0,0,0.1)" }}>
        <SideBar addStyle={tabStyle} active={"/studies"} />
        <Text text="Quoddex" variant="h5" gutterBottom sx={{ fontWeight: "450", mr: "auto", my: "auto", pt: 1 }} />
        <SearchFilter addStyle={tabStyle} />
      </Box>

      <Box sx={{ mt: 5 }}>Revisions</Box>
    </>
  );
}
