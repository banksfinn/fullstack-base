import React, { useEffect } from "react";
import { useCurrentUser } from "src/store/components/authSlice";
import { useAppDispatch } from "src/store/hooks";

interface AuthProviderProps {
    children: React.ReactNode;
}

const AuthProvider = (props: AuthProviderProps) => {
    const { children } = props;
    const dispatch = useAppDispatch();
    const user = useCurrentUser();

    useEffect(() => {
        if (
            !user.accessToken &&
            window.location.pathname !== "/login" &&
            window.location.pathname !== "/register"
        ) {
            window.location.href = "/register";
        }
    }, [dispatch, user]);

    return children;
};

export default AuthProvider;
