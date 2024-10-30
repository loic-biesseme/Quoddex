export const textTruncateStyle = {
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};
export const textTruncate2lineStyle = {
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  WebkitLineClamp: 2, //. Nombre de lignes à afficher
  textOverflow: "ellipsis", //. Pour les points de suspension
};
export const textTruncate3lineStyle = {
  ...textTruncate2lineStyle,
  WebkitLineClamp: 3,
};
