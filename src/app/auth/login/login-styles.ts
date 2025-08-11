export const styles = {
  page: {
    minHeight: "100vh",
    height: "100vh",
    background: "#fdfbf2",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
    overflowY: "auto",
  },
  container: {
    width: "100%",
    maxWidth: {
      xs: "90%", // on phones
      sm: "500px", // on tablets and small laptops
      md: "600px", // on desktops
    },
    mx: "auto",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "16px",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.15)",
    border: "1px solid rgba(186, 255, 57, 0.2)",
  },
  content: {
    padding: { xs: "30px 20px", sm: "40px" },
  },
  header: {
    textAlign: "center",
    marginBottom: "30px",
  },
  title: {
    fontSize: { xs: "1.5rem", sm: "2rem" },
    fontWeight: 700,
    color: "#023059",
    marginBottom: "8px",
    fontFamily: `"Inter", "SF Pro Display", "Segoe UI", "Roboto", "Helvetica Neue", sans-serif`,
  },
  subtitle: {
    color: "#999",
    fontSize: "1rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    marginBottom: "30px",
  },
  input: {
    "& .MuiOutlinedInput-root": {
      borderRadius: "8px",
      height: "56px",
    },
    "& .MuiInputLabel-root": {
      fontSize: "1rem",
      color: "#6e6e6e",
    },
    "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#8BBF65",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#8BBF65",
    },
  },
  icon: {
    color: "#6e6e6e",
    fontSize: "20px",
  },
  options: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "-10px",
  },
  forgotPassword: {
    color: "#8BBF65",
    textDecoration: "none",
    fontSize: "0.9rem",
    fontWeight: 500,
    "&:hover": {
      textDecoration: "underline",
    },
  },
  button: {
    background: "linear-gradient(135deg, #8BBF65, #9fe01b)",
    color: "#6e6e6e",
    fontWeight: 700,
    fontSize: "1rem",
    textTransform: "none",
    padding: "14px",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(186, 255, 57, 0.4)",
    transition: "all 0.3s ease",
    "&:hover": {
      background: "linear-gradient(135deg, #9fe01b, #baff39)",
      boxShadow: "0 4px 12px rgba(186, 255, 57, 0.6)",
      transform: "translateY(-1px)",
    },
    "&:disabled": {
      background: "#e0e0e0",
      color: "#999",
      boxShadow: "none",
      transform: "none",
    },
  },
  registerSection: {
    textAlign: "center",
  },
  registerText: {
    color: "#6e6e6e",
    fontSize: "0.95rem",
  },
  registerLink: {
    color: "#8BBF65",
    fontWeight: 600,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
};
