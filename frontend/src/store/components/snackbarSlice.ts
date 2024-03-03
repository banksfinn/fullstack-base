import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { useAppSelector } from "../hooks";

interface SnackbarMessage {
    message: string;
    severity: "error" | "success" | "info";
    duration: number;
}

const severityPriority: { [severity: string]: number } = {
    error: 1,
    success: 5,
    info: 10,
};

const getHighestPriorityMessage = (
    messages: SnackbarMessage[],
): SnackbarMessage | null => {
    if (!messages.length) {
        return null;
    }
    const sortedMessages = sortMessages(messages);
    return sortedMessages[0];
};

const sortMessages = (messages: SnackbarMessage[]): SnackbarMessage[] => {
    return [...messages].sort((a, b) => {
        return severityPriority[a.severity] - severityPriority[b.severity];
    });
};

interface SnackbarState {
    messages: SnackbarMessage[];
}

const initialState: SnackbarState = {
    messages: [],
};

export const snackbarSlice = createSlice({
    name: "snackbarSlice",
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        addSnackbarMessage: (state, action: PayloadAction<SnackbarMessage>) => {
            state.messages = sortMessages([...state.messages, action.payload]);
            return state;
        },
        clearSnackbarMessage: (state) => {
            state.messages.shift();
            return state;
        },
    },
});

export const { addSnackbarMessage, clearSnackbarMessage } =
    snackbarSlice.actions;
export const getSnackbarState = (state: RootState) => state.snackbarSlice;
export const useSnackbarState = (): SnackbarState => {
    return useAppSelector(getSnackbarState);
};

export const useActiveSnackbarMessage = (): SnackbarMessage | null => {
    const snackbarState = useAppSelector(getSnackbarState);
    return getHighestPriorityMessage(snackbarState.messages);
};

export default snackbarSlice.reducer;
