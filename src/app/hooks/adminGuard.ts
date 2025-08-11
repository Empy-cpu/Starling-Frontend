// src/app/hooks/useAdminGuard.ts
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { API_BASE_URL } from "../../config/apiConfig";

export function useAdminGuard() {
  const router = useRouter();

  useEffect(() => {
    const verifyAdmin = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/auth/me`, {
          withCredentials: true,
        });

        const { role } = response.data;

        if (role !== "admin") {
          router.replace("/login?unauthorized=true");
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        router.replace("/login?unauthorized=true");
      }
    };

    verifyAdmin();
  }, [router]);
}
