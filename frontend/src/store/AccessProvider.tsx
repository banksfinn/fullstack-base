import { useEffect } from "react";
import { useAppDispatch } from "./hooks";
import { useCurrentUser } from "./components/authSlice";

interface AccessProviderProps {
    children: React.ReactElement;
}

const AccessProvider = (props: AccessProviderProps) => {
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

export default AccessProvider;
