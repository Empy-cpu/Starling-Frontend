// components/BookingsTable.styles.ts
import { SxProps, Theme } from "@mui/material";

export const bookingsTableStyles: { [key: string]: SxProps<Theme> } = {
  container: {
    backgroundColor: "#F2EFE9",
    padding: 2,
  },
  card: {
    borderRadius: 4,
    backgroundColor: "#FFFFFF",
    boxShadow: "0px 4px 12px rgba(0,0,0,0.05)",
    overflowX: "auto",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 2,
    color: "#023059",
  },
  tableHeadCell: {
    fontWeight: "bold",
    color: "#023859",
    backgroundColor: "#eaf6fc",
  },
  priceCell: {
    color: "#023059",
    fontWeight: 500,
  },
  dateCell: {
    whiteSpace: "nowrap",
    color: "#023059",
  },
  smallText: {
    fontSize: "0.75rem",
    color: "#555",
  },
};
