import axios from "axios";
import { API_BASE_URL } from "../../config/apiConfig";
import type {
  LoginResponse,
  RegisterRequest,
  ResetPasswordRequest,
  CurrentUserResponse,
} from "../../types/auth-dto";

// 👤 Login
export async function loginUser(
  email: string,
  password: string
): Promise<LoginResponse> {
  try {
    const response = await axios.post<LoginResponse>(
      `${API_BASE_URL}/auth/login`,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const message =
        typeof error.response?.data === "string"
          ? error.response.data
          : "Login failed. Please try again.";
      throw new Error(message);
    } else {
      throw new Error("An unexpected error occurred.");
    }
  }
}

// 📝 Register
export async function registerUser(data: RegisterRequest): Promise<void> {
  try {
    await axios.post(
      `${API_BASE_URL}/auth/register`,
      {
        email: data.email,
        password: data.password,
        name: `${data.firstName} ${data.lastName}`,
        phone: data.phone || null,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const message =
        typeof error.response?.data === "string"
          ? error.response.data
          : "Registration failed.";
      throw new Error(message);
    } else {
      throw new Error("An unexpected error occurred.");
    }
  }
}

// 📧 Forgot Password
export async function sendForgotPasswordEmail(email: string): Promise<string> {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/auth/forgot-password`,
      email,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        typeof error.response?.data === "string"
          ? error.response.data
          : "Unable to send reset link."
      );
    } else {
      throw new Error("An unexpected error occurred.");
    }
  }
}

// 🔑 Reset Password
export async function resetUserPassword(
  data: ResetPasswordRequest
): Promise<string> {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/auth/reset-password`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        typeof error.response?.data === "string"
          ? error.response.data
          : "Reset password failed"
      );
    } else {
      throw new Error("An unexpected error occurred.");
    }
  }
}

export async function getCurrentUser(): Promise<CurrentUserResponse> {
  try {
    const response = await axios.get(`${API_BASE_URL}/auth/me`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = response.data;

    return {
      id: data.id,
      name: data.fullName, // ✅ map fullName → name
      email: data.email,
      role: data.role,
      phone: data.phone,
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const message =
        typeof error.response?.data === "string"
          ? error.response.data
          : "Failed to fetch current user.";
      throw new Error(message);
    } else {
      throw new Error("An unexpected error occurred.");
    }
  }
}

// 📬 Email Verification
export async function verifyUserEmail(
  email: string,
  token: string
): Promise<string> {
  try {
    const response = await axios.get(`${API_BASE_URL}/auth/verify`, {
      params: { email, token },
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data; // e.g., "Email verified and account created."
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const message =
        typeof error.response?.data === "string"
          ? error.response.data
          : "Email verification failed.";
      throw new Error(message);
    } else {
      throw new Error("An unexpected error occurred.");
    }
  }
}

// 🚪 Logout
export async function logoutUser(): Promise<void> {
  try {
    await axios.post(
      `${API_BASE_URL}/auth/logout`,
      {},
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    localStorage.removeItem("user"); // If you're using localStorage
  } catch (error) {
    console.error("Logout failed", error);
    throw new Error("Logout failed");
  }
}

