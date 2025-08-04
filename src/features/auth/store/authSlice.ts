import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../types";
import { getCookie, removeCookie, setCookie } from "typescript-cookie";

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
}

const loadAuthFromCookies = (): Pick<AuthState, "user" | "isAuthenticated"> => {
    try {
        const storedAuth = getCookie("auth");
        const parsed = JSON.parse(storedAuth || "{}");
        if (storedAuth) {
            return {
                user: parsed.user || null,
                isAuthenticated: parsed.isAuthenticated || false,
            };
        }
    } catch (error) {
        console.error("Failed to load auth from cookies:", error);
    }
    return {
        user: null,
        isAuthenticated: false,
    };
};

const { user, isAuthenticated } = loadAuthFromCookies();
const initialState: AuthState = {
    user,
    isAuthenticated,
    loading: false,
    error: null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        signInSuccess: (state, action: PayloadAction<User>) => {
            state.loading = false;
            state.user = action.payload;
            state.isAuthenticated = true;
            setCookie(
                "auth",
                JSON.stringify({
                    user: action.payload,
                    isAuthenticated: true,
                }),
            );
        },
        signInFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        signOut: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.error = null;
            removeCookie("auth");
            removeCookie("accessToken");
            removeCookie("refreshToken");
        },
        clearError: (state) => {
            state.error = null;
        },
    },
});

export const {
    signInStart,
    signInSuccess,
    signInFailure,
    signOut,
    clearError,
} = authSlice.actions;

export default authSlice.reducer;
