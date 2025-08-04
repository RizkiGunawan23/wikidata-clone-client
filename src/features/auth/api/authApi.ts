import { api } from "../../../api"; // 👈 FIX: remove axios, gunakan api
import type { SignInCredentials, SignInResponse } from "../types"; // 👈 FIX: type-only import

export class AuthApi {
    async signIn(credentials: SignInCredentials): Promise<SignInResponse> {
        try {
            console.log("🔄 Attempting sign in with:", {
                username: credentials.username,
                password: credentials.password,
            }); // 👈 DEBUG

            const response = await api.post<SignInResponse["data"]>(
                "/user/auth/signin",
                credentials,
            );

            console.log("✅ Sign in successful:", response); // 👈 DEBUG

            return {
                message: response.message,
                data: response.data,
            };
        } catch (error) {
            console.error("❌ Sign in error:", error);

            throw new Error(
                error instanceof Error ? error.message : "Sign in failed",
            );
        }
    }
}

export const authApi = new AuthApi();
