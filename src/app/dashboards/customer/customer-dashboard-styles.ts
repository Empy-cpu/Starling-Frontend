// CustomerDashboard.styles.ts
import { styled } from "@mui/material/styles";
import { Container, Box } from "@mui/material";

export const DashboardContainer = styled(Container)({
  paddingTop: "80px",
  paddingBottom: "40px",
  minHeight: "100vh",
  background: "linear-gradient(135deg, rgba(110, 110, 110, 0.05), rgba(186, 255, 57, 0.02))",
});

export const TopSection = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "24px",
  marginBottom: "32px",

  // Responsive row layout for medium screens and up
  "@media (min-width: 900px)": {
    flexDirection: "row",
  },
});

export const ProfileWrapper = styled(Box)({
  flex: "1 1 40%",
});

export const StatsWrapper = styled(Box)({
  flex: "1 1 60%",
});
