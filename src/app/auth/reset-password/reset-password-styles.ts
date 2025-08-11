// src/app/auth/reset-password/resetPasswordStyles.ts

export const styles = {
  page: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    padding: "16px",
    backgroundColor: "#F2EFE9",
  },
  card: {
    width: "100%",
    maxWidth: 500,
    padding: "24px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
    border: "1px solid #8BBF65",
  },
  title: {
    fontWeight: 700,
    marginBottom: "16px",
    textAlign: "center",
    fontSize: "24px",
    color: "#023059",
  },
  button: {
    background: "linear-gradient(135deg, #8BBF65, #52B3D9)",
    color: "#fff",
    fontWeight: 600,
    fontSize: "1rem",
    textTransform: "none",
    padding: "12px",
    borderRadius: "8px",
    mt: 2,
    "&:hover": {
      background: "linear-gradient(135deg, #52B3D9, #8BBF65)",
    },
    "&:disabled": {
      backgroundColor: "#e0e0e0",
      color: "#888",
    },
  },
  message: {
    marginTop: "16px",
    fontWeight: 500,
    textAlign: "center",
  },
  success: {
    color: "#8BBF65",
  },
  error: {
    color: "#D32F2F",
  },
};
