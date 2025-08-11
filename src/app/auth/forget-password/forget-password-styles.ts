// src/app/auth/reset-password/resetPasswordStyles.ts

export const styles = {
  page: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    backgroundColor: "#F2EFE9", // lightest tone from your palette
    padding: "20px",
  },
  card: {
    padding: "24px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "500px",
    margin: "0 auto",
    backgroundColor: "#fff",
    border: "1px solid #8BBF65", // green border for contrast
  },
  title: {
    fontWeight: 600,
    fontSize: "1.75rem",
    marginBottom: "8px",
    color: "#023059", // deep navy
    textAlign: "center",
  },
  subtitle: {
    color: "#023859", // dark teal variant
    marginBottom: "16px",
    textAlign: "center",
    fontSize: "1rem",
  },
  button: {
    mt: 2,
    background: "linear-gradient(135deg, #8BBF65, #52B3D9)", // green → light blue
    color: "#fff",
    fontWeight: 600,
    textTransform: "none",
    borderRadius: "8px",
    padding: "12px",
    boxShadow: "0 2px 6px rgba(82, 179, 217, 0.4)", // matches blue tone
    "&:hover": {
      background: "linear-gradient(135deg, #52B3D9, #8BBF65)",
      boxShadow: "0 4px 10px rgba(82, 179, 217, 0.5)",
    },
    "&:disabled": {
      backgroundColor: "#e0e0e0",
      color: "#999",
      boxShadow: "none",
    },
  },
  successMessage: {
    mt: 2,
    color: "#8BBF65", // success green
    textAlign: "center",
    fontWeight: 500,
  },
  errorMessage: {
    mt: 2,
    color: "#D32F2F", // Material UI red for errors
    textAlign: "center",
    fontWeight: 500,
  },
};
