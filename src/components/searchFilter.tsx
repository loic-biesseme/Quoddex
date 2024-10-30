import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { IconButton, SxProps } from "@mui/material";

interface SearchFilterProps {
  addStyle?: SxProps;
}

export default function SearchFilter({ addStyle }: SearchFilterProps) {
  return (
    <>
      <IconButton sx={{ ...addStyle }}>
        <SearchOutlinedIcon sx={{ width: 23, height: 23 }} />
      </IconButton>
    </>
  );
}
