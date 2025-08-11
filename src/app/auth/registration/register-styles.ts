// src/app/auth/registration/registrationStyles.ts

export const styles = {
  page: {
    minHeight: "100vh",
    background: "#fdfbf2",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    width: "100%",
    position: 'relative',
  },
  logoContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 10,
    '&:hover': { 
      opacity: 0.8,
      cursor: 'pointer'
    }
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
    backgroundColor: "#F2EFE9",
    borderRadius: "16px",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
    border: "1px solid rgba(2, 56, 89, 0.2)",
    width: '100%',
    maxWidth: '500px',
    margin: '0 auto',
  },
  content: {
    padding: { xs: "30px 20px", sm: "40px" },
  },
  header: {
    textAlign: "center",
    marginBottom: "30px",
  },
  title: {
    fontSize: { xs: "1.75rem", sm: "2rem" },
    fontWeight: 700,
    color: "#023059",
    marginBottom: "8px",
    fontFamily: `"Inter", "SF Pro Display", "Segoe UI", "Roboto", "Helvetica Neue", sans-serif`,
  },
  subtitle: {
    color: "#023859",
    fontSize: "1rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    marginBottom: "30px",
  },
  button: {
    background: "linear-gradient(135deg, #8BBF65, #9fe01b)",
    color: "#023859",
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
  loginText: {
    textAlign: "center",
    color: "#023859",
    fontSize: "0.95rem",
  },
  loginLink: {
    color: "#8BBF65",
    fontWeight: 600,
    textDecoration: "none",
    cursor: "pointer",
    "&:hover": {
      textDecoration: "underline",
    },
  },
};
