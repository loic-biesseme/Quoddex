import { Box, Card, CardMedia, Grow } from "@mui/material";
import { useState } from "react";
import { useQuery } from "react-query";
import { server } from "../constants/settings";
import { textTruncateStyle } from "../constants/style";
import { Text } from "./utils";

interface Advert {
  wallpaper: string;
  type: string;
  content: string;
}

export default function Advertisement() {
  const [advert, setAdvert] = useState<Advert[]>([]);

  // Fonction pour traiter la réponse des annonces
  const handleAdvertResponse = (data: { advert: Advert[] }) => {
    setAdvert(data.advert);
  };

  const fetchAdvert = async (): Promise<Advert[]> => {
    const response = await fetch(`${server}/get_advert`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ uid: "@username" }),
    });
    const data = await response.json();
    handleAdvertResponse(data);
    return data.advert;
  };

  const { isLoading } = useQuery<Advert[], Error>("friends", fetchAdvert);

  // Styles pour la carte
  const cardStyle = {
    borderRadius: "20px",
    boxShadow: 0,
    mb: 3,
    border: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  };

  const cardMediaStyle = {
    height: 165,
    borderRadius: "20px",
  };

  // Rendu du composant
  return (
    <>
      {!isLoading && advert.length > 0
        ? advert.map((ad, index) => (
            <Grow in={true} key={index} style={{}} {...{ timeout: 600 }}>
              <Card sx={cardStyle}>
                <CardMedia sx={cardMediaStyle} image={`/static/images/wallpaper/${ad.wallpaper}.jpg`} />
                <Box sx={{ my: 0.81, mx: 1.2, display: "flex", gap: 0.8 }}>
                  <Text
                    text={ad.type}
                    sx={{
                      color: "primary.main",
                      fontSize: "1rem",
                      fontWeight: "bold",
                      textAlign: "start",
                    }}
                  />
                  <Text
                    text={ad.content}
                    sx={{
                      ...textTruncateStyle,
                      color: "black",
                      fontSize: "1rem",
                      textAlign: "start",
                    }}
                  />
                </Box>
              </Card>
            </Grow>
          ))
        : null}
    </>
  );
}
