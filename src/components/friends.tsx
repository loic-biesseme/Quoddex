import CloseIcon from "@mui/icons-material/Close";
import { Avatar, Box, Button, Card, Grow } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import { useQuery } from "react-query";
import { server } from "../constants/settings";
import { textTruncateStyle } from "../constants/style";
import { Text } from "./utils";

interface FriendCard {
  friends: [];
  username: string;
  firstname: string;
  lastname: string;
}

const style = {
  minWidth: "125px",
  height: "185px",
  // background: "linear-gradient(165deg, rgba(100, 181, 246, .6) 0%, rgba(33,150,243,.61) 25%,  rgba(129, 199, 132, .6) 75%,  rgba(76,175,80, .61) 100%)",
  background: "linear-gradient(165deg, rgba(33,150,243,.61) 0%, rgba(100, 181, 246, .6) 25%,  rgba(129, 199, 132, .6) 75%,  rgba(76,175,80, .61) 100%)",
  // background: "linear-gradient(25deg, rgb(33, 150, 243, .15) 30%, rgb(100, 181, 246,.1) 90% 90%)",
  // background: "linear-gradient(25deg, rgba(76,175,80, .61) 30%, rgba(129, 199, 132, .6) 90% 90%)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "20px",
  position: "relative",
  px: 2,
  py: 1,
  boxShadow: 0,
};

export default function Friends() {
  // const [init, setInit] = useState(false);
  const [cfriends, setCfriends] = useState<FriendCard[]>([]);

  const blackList = (username: string) => {
    return username;
  };

  const fetchFriends = async (): Promise<FriendCard[]> => {
    const response = await fetch(`${server}/get_friends`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ uid: "@username" }),
    });
    const data = await response.json();
    setCfriends(data.friends);
    return data.friends;
  };

  const { isLoading } = useQuery<FriendCard[], Error>("friends", fetchFriends);

  // useEffect(() => {
  //   setInit(true);
  // }, []);

  return (
    <>
      {isLoading ? null : (
        <>
          <Text {...{ timeout: 600 }} text={"Suggestion pour vous"} variant="subtitle1" color="text.secondary" sx={{ m: 1 }} />
          <Box sx={{ display: "flex", overflowX: "auto", borderRadius: "20px", gap: 1, mb: 3, position: "relative", "&::-webkit-scrollbar": { display: "none" }, scrollbarWidth: "none" }}>
            {cfriends.map((friend, index) => (
              <Grow key={index} in={true} style={{}} {...{ timeout: 600 }}>
                <Card sx={style}>
                  <Avatar sx={{ width: 90, height: 90, fontSize: 18, mt: 0.4 }} alt="Loic Biesseme" src={`/static/images/avatar/@username.jpg`} />
                  <Box sx={{ my: "auto" }}>
                    <Text text={friend.firstname} variant="subtitle1" sx={{ ...textTruncateStyle, lineHeight: 1.4, m: 0, p: 0, fontWeight: "450", textAlign: "center" }} />
                    <Text text={friend.username} color="text.secondary" sx={{ ...textTruncateStyle, m: 0, p: 0, textAlign: "center", fontSize: ".88rem", fontFamily: "Georgia, serif" }} />
                  </Box>
                  <Button sx={{ width: "100%", background: "linear-gradient(25deg, #2196f3 30%, #64b5f6 90% 90%)", color: "white", fontWeight: "bold", p: 0.8, borderRadius: "11px", textTransform: "capitalize", "&:focus": { outline: "none" }, "&:active": {} }}>Suivre</Button>
                  <IconButton aria-label="close" color="inherit" sx={{ p: 0.5, position: "absolute", top: 6, right: 6, color: "text.disabled", "&:focus": { outline: "none" } }} onClick={() => blackList(friend.username)}>
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </Card>
              </Grow>
            ))}
          </Box>
        </>
      )}
    </>
  );
}

// export function Loader() {
//   return (
//     <Box sx={{ display: "flex", overflowX: "auto", borderRadius: "20px", gap: 1, mb: 3, position: "relative", "&::-webkit-scrollbar": { display: "none" }, scrollbarWidth: "none" }}>
//       {Array.from({ length: 6 }).map((_, index) => (
//         <Card key={index} sx={style}>
//           <Avatar sx={{ width: 90, height: 90, fontSize: 18, mt: 0.4 }} alt="Loic Biesseme" />
//           <Box sx={{ my: "auto" }}>
//             <Text text="" variant="subtitle1" sx={{ ...textTruncateStyle, lineHeight: 1.4, m: 0, p: 0, fontWeight: "450", textAlign: "center" }} />
//             <Text text="" color="text.secondary" sx={{ ...textTruncateStyle, m: 0, p: 0, textAlign: "center", fontSize: ".88rem", fontFamily: "Georgia, serif" }} />
//           </Box>
//           {/* <Button sx={{ width: "100%", background: "linear-gradient(25deg, rgb(205, 232, 255) 30%, rgb(205, 255, 255) 90% 90%)", color: "white", fontWeight: "bold", p: 2, borderRadius: "11px", textTransform: "capitalize", "&:focus": { outline: "none" }, "&:active": {} }}></Button> */}
//           <IconButton aria-label="close" color="inherit" sx={{ p: 0.5, position: "absolute", top: 6, right: 6, color: "text.disabled", "&:focus": { outline: "none" } }}>
//             <CloseIcon fontSize="small" />
//           </IconButton>
//         </Card>
//       ))}
//     </Box>
//   );
// }
