// components/ProfileCard.styles.ts
import { SxProps, Theme } from "@mui/material";

export const profileCardStyles: { [key: string]: SxProps<Theme> } = {
  container: {
    minWidth: 300,
    maxWidth: 600,
    margin: "auto",
    padding: 2,
    backgroundColor: "#F2EFE9",
  },
  card: {
    borderRadius: 4,
    backgroundColor: "#FFFFFF",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)",
    padding: 2,
  },
  header: {
    display: "flex",
    alignItems: "center",
    marginBottom: 2,
  },
  avatar: {
    bgcolor: "#023859",
    color: "#F2EFE9",
    marginRight: 2,
    width: 56,
    height: 56,
    fontSize: 20,
    fontWeight: "bold",
  },
  info: {
    flexGrow: 1,
  },
  iconButton: {
    color: "#52B3D9",
  },
  detailItem: {
    display: "flex",
    alignItems: "center",
    gap: 1,
    marginBottom: 1,
    color: "#023059",
  },
  chipGroup: {
    display: "flex",
    gap: 1,
    flexWrap: "wrap",
    marginTop: 2,
  },
  entrySection: {
    marginTop: 2,
  },
};
