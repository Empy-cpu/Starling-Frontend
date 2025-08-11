// components/StatsAndActions.styles.ts
import { SxProps, Theme } from "@mui/material";

export const statsStyles: { [key: string]: SxProps<Theme> } = {
  section: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    padding: 2,
    backgroundColor: "#F2EFE9",
  },
  statsContainer: {
    display: "flex",
    gap: 2,
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  statCard: {
    flex: "1 1 30%",
    backgroundColor: "#ffffff",
    borderRadius: 3,
    boxShadow: "0px 4px 12px rgba(0,0,0,0.05)",
    textAlign: "center",
    padding: 2,
    minWidth: 160,
  },
  statTitle: {
    fontSize: "1rem",
    color: "#023059",
  },
  statValue: {
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#023859",
  },
  actionsCard: {
    backgroundColor: "#ffffff",
    borderRadius: 3,
    boxShadow: "0px 4px 12px rgba(0,0,0,0.05)",
    padding: 2,
  },
  actionTitle: {
    fontWeight: 600,
    marginBottom: 1,
    color: "#023059",
  },
  actionsButtons: {
    display: "flex",
    gap: 1.5,
    flexWrap: "wrap",
    marginTop: 1,
  },
  primaryButton: {
    backgroundColor: "#8BBF65",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#79a956",
    },
  },
  outlinedButton: {
    borderColor: "#52B3D9",
    color: "#023059",
    "&:hover": {
      backgroundColor: "#f2fefe",
    },
  },
};
