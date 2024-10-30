import { Typography, TypographyProps } from "@mui/material";

export function Text({ text, ...props }: TypographyProps & { text: string }) {
  return <Typography {...props}>{text}</Typography>;
}
