"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Box, Typography, CircularProgress } from "@mui/material";
import { verifyUserEmail } from "@/services/Auth/auth";

function VerifyEmailContent() {
  const params = useSearchParams();
  const router = useRouter();

  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const email = params?.get("email");
    const token = params?.get("token");

    if (!email || !token) {
      setStatus("error");
      setMessage("Invalid or missing verification link.");
      return;
    }

    verifyUserEmail(email, token)
      .then(() => {
        setStatus("success");
        setMessage("Your email has been verified! Redirecting to login...");
        setTimeout(() => {
          router.push("/auth/login");
        }, 3000);
      })
      .catch((err) => {
        setStatus("error");
        setMessage(err.message || "Verification failed. The link may have expired or already been used.");
      });
  }, [params, router]);

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
      <Box textAlign="center" sx={{ p: 3, maxWidth: '500px', width: '100%' }}>
        {status === "loading" && (
          <>
            <CircularProgress />
            <Typography mt={2} variant="h6">Verifying your email...</Typography>
          </>
        )}
        {status === "success" && (
          <>
            <Typography variant="h5" color="success.main" gutterBottom>
              Email Verified Successfully!
            </Typography>
            <Typography color="text.secondary">
              {message}
            </Typography>
          </>
        )}
        {status === "error" && (
          <>
            <Typography variant="h5" color="error" gutterBottom>
              Verification Failed
            </Typography>
            <Typography color="text.secondary" paragraph>
              {message}
            </Typography>
            <Typography>
              Please request a new verification link from the login page.
            </Typography>
          </>
        )}
      </Box>
    </Box>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
          <CircularProgress />
        </Box>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
}
