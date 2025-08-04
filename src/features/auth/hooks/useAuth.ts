import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
    signInFailure,
    signInStart,
    signInSuccess,
    signOut as signOutAction,
    clearError,
} from "../store/authSlice";
import type { SignInCredentials, User } from "../types";
import { jwtDecode } from "jwt-decode";
import { setCookie } from "typescript-cookie";
import { authApi } from "../api/authApi";

interface JwtPayload {
    sub: string;
    role: string;
    type: string;
    iat: number;
    exp: number;
}

export const useAuth = () => {
    const dispatch = useAppDispatch();
    const { user, isAuthenticated, loading, error } = useAppSelector(
        (state) => state.auth,
    );

    useEffect(() => {
        if (isAuthenticated && user?.tokenExpiresAt) {
            const now = Date.now();
            if (now > user.tokenExpiresAt) dispatch(signOutAction());
            else {
                const timeUntilExpired = user.tokenExpiresAt - now;
                const timeoutId = setTimeout(() => {
                    dispatch(signOutAction());
                }, timeUntilExpired);

                return () => clearTimeout(timeoutId);
            }
        }

        return () => {};
    }, [isAuthenticated, user, dispatch]);

    const signIn = async (credentials: SignInCredentials) => {
        dispatch(signInStart());
        try {
            const response = await authApi.signIn(credentials);

            const decodedToken = jwtDecode<JwtPayload>(
                response.data.tokens.accessToken,
            );

            const userData: User = {
                id: response.data.user.id,
                username: response.data.user.username,
                email: response.data.user.email || "",
                role: response.data.user.role,
                tokenExpiresAt: decodedToken.exp * 1000,
            };

            setCookie("accessToken", response.data.tokens.accessToken);
            setCookie("refreshToken", response.data.tokens.refreshToken);

            dispatch(signInSuccess(userData));
        } catch (error) {
            console.log(error);
            dispatch(signInFailure("Login failed"));
        }
    };

    const signOut = () => {
        dispatch(signOutAction());
    };

    const clearAuthError = () => {
        dispatch(clearError());
    };

    return {
        user,
        isAuthenticated,
        loading,
        error,
        signIn,
        signOut,
        clearError: clearAuthError,
    };
};
