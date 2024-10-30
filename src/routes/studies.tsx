import CloseIcon from "@mui/icons-material/Close";
// import PlaylistAddCheckCircleRoundedIcon from "@mui/icons-material/PlaylistAddCheckCircleRounded";
import DownloadDoneRoundedIcon from "@mui/icons-material/DownloadDoneRounded";
import PlaylistAddCheckRoundedIcon from "@mui/icons-material/PlaylistAddCheckRounded";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import { Box, Button, Card, CardContent, Divider, Grow } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import IconButton from "@mui/material/IconButton";
import { useSnackbar, VariantType } from "notistack";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import AskQuestion from "../components/askQuestion";
import NeedFriends from "../components/friends";
import PinnesDownloaders from "../components/pinnersDownloaders";
import Progress from "../components/progress";
import Question from "../components/question";
import SearchFilter from "../components/searchFilter";
import SideBar from "../components/sideBar";
import { Text } from "../components/utils";
import { server } from "../constants/settings";
import { textTruncateStyle } from "../constants/style";

interface CardData {
  cards: [];
  id: string;
  title: string;
  created_on: string; // On converti en chaîne de caractères pour une meilleure gestion de la date
  corrected: number;
  items: number;
  type: string;
  keywords: string[];
  comment: string;
  user: {
    username: string;
    firstname: string;
    lastname: string;
  };
  level: {
    fullname: string;
  };
  subject: {
    _id: number;
    shortname: string;
    fullname: string;
  };
  complexity: {
    _id: number;
    value: string;
  };
  players_and_downloaders_info: {
    username: string;
  }[];
  total_players_and_downloaders: number;
  has_pinned: boolean;
  total_pinners: number;
}

const optionStyle = {
  // backgroundColor: "rgba(167, 167, 167, .12)",
  color: "black",
  borderRadius: "14px",
  p: 0.83,
  m: 0.31,
  border: "1px solid",
  borderColor: "grey.300",
  "&:focus": { outline: "none", borderColor: "grey.300" },
};

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
  color: "primary.main", //color: "text.secondary",
  mx: 2, //3,
  my: 0, //0.6,
  border: 0, //"1px solid",
  borderColor: "grey.300",
  backgroundColor: "initial", // "rgba(255, 255, 255, 0.5)",
};

export default function Studies() {
  const bookmarkMsg = ["Contenu épinglé avec succès !", "Ajouté à vos favoris.", "Épinglé ! Vous pouvez le retrouver facilement.", "Votre contenu est épinglé !", "Épinglé ! Vous ne le perdrez plus de vue."];
  // const [init, setInit] = useState(false);
  const [cards, setCards] = useState<CardData[]>([]);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const snackMsg = (msg: string, variant: VariantType) => {
    //. variant peut être success, error, warning, info, ou default
    enqueueSnackbar(msg, {
      variant,
      action: (key) => (
        <IconButton aria-label="close" color="inherit" sx={{ p: 0.5, "&:focus": { outline: "none" } }} onClick={() => closeSnackbar(key)}>
          <CloseIcon fontSize="small" />
        </IconButton>
      ),
    });
  };

  const handleBookmark = () => {
    const randomIndex = Math.floor(Math.random() * bookmarkMsg.length);
    snackMsg(bookmarkMsg[randomIndex], "info");
  };

  const handleDownload = async (fileName: string, fileUrl: string) => {
    try {
      const response = await fetch(fileUrl, {
        method: "GET",
        headers: { "Content-Type": "application/pdf" },
      });
      if (!response.ok) {
        snackMsg("Veuillez vérifier votre connexion réseau, puis réesayez.", "error");
        throw new Error("Network response was not ok");
      }
      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      snackMsg("Téléchargement terminé avec succès !", "success");
    } catch (error) {
      snackMsg("Erreur lors du téléchargement du fichier.", "error");
      console.error("Erreur lors du téléchargement du fichier: ", error);
    }
  };

  const cardManager = (data: CardData) => {
    setCards(data.cards);
    console.log(cards);
  };

  const fetchCards = async ({ param }: { param: string }) => {
    const response = await fetch(`${server}/get_cards`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ param }),
    });
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des cartes");
    }
    return response.json();
  };

  const { mutate, isLoading } = useMutation(fetchCards, {
    //, isSuccess, isError
    onError: (error: unknown) => {
      console.error(error);
    },
    onSuccess: (data: CardData) => {
      cardManager(data);
    },
  });

  useEffect(() => {
    mutate({ param: "param" });
    // setInit(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Box sx={{ position: "fixed", top: 0, zIndex: 11, display: "flex", alignItems: "center", width: "100%", justifyContent: "space-between", backdropFilter: "blur(10px)", backgroundColor: "rgba(255, 255, 255, 0.5)", boxShadow: "0 .6px 2px rgba(0,0,0,0.1)" }}>
        <SideBar addStyle={tabStyle} active={"/studies"} />
        <Text text="Quoddex" variant="h5" gutterBottom sx={{ fontWeight: "650", m: "auto", my: "auto", pt: 0 }} />
        <SearchFilter addStyle={tabStyle} />
      </Box>
      {/* <Grow in={true} {...{ timeout: 600 }}> */}
      <Box sx={{ mt: 7, mx: 3 }}>
        {/* <NeedFriends /> */}
        {isLoading ? null : <AskQuestion />}
        {isLoading ? (
          <Progress />
        ) : (
          cards &&
          cards.map((card, index) => (
            <Box key={card.id}>
              <Grow in={true} style={{}} {...{ timeout: 600 }}>
                <Card sx={{ boxShadow: 1, mb: 3, border: "1px solid rgba(0, 0, 0, 0.12)", borderRadius: "20px", overflow: "hidden", backgroundColor: "#fff", position: "relative" }}>
                  <CardContent sx={{ paddingTop: 1.3, paddingBottom: 0.3 }}>
                    {card.type === "file" ? <Text text={card.corrected ? "Corrigé" : "non corrigé"} color={card.corrected ? "success.main" : "text.disabled"} gutterBottom sx={{ mb: 1.2, fontWeight: "550", fontSize: "0.88rem" }} /> : <Text text={card.complexity.value} color="primary.main" gutterBottom sx={{ mb: 1.2, fontWeight: "550", fontSize: "0.88rem" }} />}
                    <Text text={card.title} gutterBottom sx={{ ...textTruncateStyle, fontSize: "1.18rem", fontWeight: "500", color: "black" }} />
                    <Text text={card.comment} variant="body1" color="text.secondary" sx={textTruncateStyle} />
                    <Box sx={{ display: "flex", justifyContent: "space-between", my: 0.8 }}>
                      <Button sx={{ display: "flex", m: 0, p: 0, py: 0.2, borderRadius: "12px", minWidth: "auto", "&:focus": { outline: "none" } }}>
                        <Avatar sx={{ width: 16, height: 16, fontSize: 8, mr: 0.5 }} alt={(card.user.firstname || "") + (card.user.lastname || "")} src={`/static/images/avatar/${card.user.username}.jpg`} />
                        <Text text={(card.user.firstname || "") + " " + (card.user.lastname || "")} variant="body2" color="text.secondary" sx={{ ...textTruncateStyle, textTransform: "capitalize" }} />
                      </Button>
                      <PinnesDownloaders total_pinners={`${card.total_pinners} Favori${card.total_pinners > 1 ? "s" : ""}`} total_players_and_downloaders={card.type === "file" ? `${card.total_players_and_downloaders} Téléchargement${card.total_players_and_downloaders > 1 ? "s" : ""}` : `${card.total_players_and_downloaders} Participant${card.total_players_and_downloaders > 1 ? "s" : ""}`}>
                        <Button sx={{ display: "flex", m: 0, p: 0, py: 0.2, borderRadius: "12px", minWidth: "auto", "&:focus": { outline: "none" } }}>
                          {/* <Text text="100" variant="body2" color="primary.main" /> */}
                          <AvatarGroup
                            sx={{ gap: 0.25, "& .MuiAvatar-root": { width: 15, height: 15, fontSize: 8 } }}
                            renderSurplus={(surplus) => {
                              const formattedSurplus = surplus > 1000 ? `+${(surplus / 1000).toFixed(1)}k` : `+${surplus}`;
                              return <span>{formattedSurplus}</span>;
                            }}
                            total={card.total_players_and_downloaders}
                          >
                            {card.players_and_downloaders_info.map((pers, index) => (
                              <Avatar key={index} alt={pers.username.slice(1)} src={`/static/images/avatar/${pers.username}.jpg`} sx={{ bgcolor: card.type === "file" ? "rgb(76, 175, 80, 0.9)" : "rgba(33, 150, 243, .9)" }} />
                            ))}
                          </AvatarGroup>
                          {card.total_players_and_downloaders ? card.type === "file" ? <DownloadDoneRoundedIcon sx={{ fontSize: "1.5rem", color: "rgb(76, 175, 80, 0.9)" }} /> : <PlaylistAddCheckRoundedIcon sx={{ fontSize: "1.5rem", color: "rgba(33, 150, 243, .8)" }} /> : null}
                        </Button>
                      </PinnesDownloaders>
                    </Box>
                    <Divider sx={{ my: 0.2 }} />

                    <Box sx={{ display: "flex", justifyContent: "space-between", mx: 0, my: 1 }}>
                      <Button sx={{ ...optionStyle, flex: 1 }} onClick={() => handleBookmark()}>
                        <StarRoundedIcon sx={{ fontSize: "1.6rem", mx: 0.5, color: card.has_pinned ? "rgba(251,82,0,1)" : "text.disabled" }} />
                        {/* rgb(255, 150, 10) */}
                      </Button>
                      {/* <Button sx={{ ...optionStyle, border: "none", flex: 5, background: card.type === "file" ? "linear-gradient(25deg, #4caf50 30%, #81c784 90%)" : "linear-gradient(25deg, #2196f3 30%, #64b5f6 90% 90%)" }} onClick={() => handleDownload("administrez vos bases de donnees avec mysql.pdf", "/pdf/administrez vos bases de donnees avec mysql.pdf")}>
                        <Text text={card.type === "file" ? "Telecharger" : "S'exercer"} variant="body1" color="white" />
                      </Button> */}
                      <Button sx={{ ...optionStyle, flex: 5, background: card.type === "file" ? "linear-gradient(25deg, rgb(76, 175, 80, .15) 30%, rgb(129, 199, 132, .1) 90% 90%)" : "linear-gradient(25deg, rgb(33, 150, 243, .15) 30%, rgb(100, 181, 246,.1) 90% 90%)" }} onClick={() => handleDownload("administrez vos bases de donnees avec mysql.pdf", "/pdf/administrez vos bases de donnees avec mysql.pdf")}>
                        {card.type === "file" ? <Text text="Telecharger" variant="body1" color="success.main" /> : <Text text="S'exercer" variant="body1" color="primary.main" />}
                      </Button>
                      <Button sx={{ ...optionStyle, flex: 1 }}>
                        <ShareRoundedIcon sx={{ fontSize: "1.6rem", mx: 0.5, color: "text.disabled" }} />
                      </Button>
                    </Box>
                  </CardContent>

                  <Box sx={{ display: "flex", position: "absolute", minWidth: 100, textAlign: "center", top: 0, right: 0, background: card.type === "file" ? "linear-gradient(25deg, rgb(76, 175, 80, .15) 30%, rgb(129, 199, 132, .1) 90% 90%)" : "linear-gradient(25deg, rgb(33, 150, 243, .15) 30%, rgb(100, 181, 246,.1) 90% 90%)", padding: "6px 12px 6px 20px", borderRadius: "2px 0 3px 0", clipPath: "polygon(100% 0, 100% 100%, 10% 100%, 0 0)" }}>
                    <Text text={card.subject.fullname} sx={{ ...textTruncateStyle, maxWidth: 160, fontSize: "0.8rem", fontWeight: "bold", color: "black" }} />
                    <Text text="-" sx={{ mx: 0.2, fontSize: "0.8rem", fontWeight: "bold", color: "black" }} />
                    <Text text={card.level.fullname} sx={{ ...textTruncateStyle, maxWidth: 80, fontSize: "0.8rem", fontWeight: "bold", color: "black" }} />
                  </Box>
                </Card>
              </Grow>
              {index % 3 === 0 && <Question />}
              {isLoading ? null : <NeedFriends />}
            </Box>
          ))
        )}
        {/* <ArticleSuggested /> */}
        {/* <KeywordsSuggested /> */}
        {/* <NeedFriends /> */}
        {/* <Question /> */}
      </Box>
      {/* </Grow> */}
    </>
  );
}
