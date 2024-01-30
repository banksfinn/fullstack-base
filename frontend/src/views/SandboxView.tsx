import { Box, Button, useTheme } from "@mui/material";
import { useState } from "react";
import CreateTransactionDialog from "src/components/Transactions/CreateTransactionDialog";
// // import { useSelector } from "react-redux"
// import { getCurrentUser } from "src/store/components/userSlice"
// import { RootState } from "src/store/store"

interface SandboxViewProps {}

const SandboxView = (props: SandboxViewProps) => {
  const theme = useTheme();
  const [createTransactionDialog, setCreateTransactionDialog] =
    useState<boolean>(false);

  return (
    <Box
      sx={{
        display: "flex",
        height: "100%",
        width: "100%",
        backgroundColor: theme.palette.background.default,
        flexDirection: "column",
      }}
    >
      <CreateTransactionDialog
        open={createTransactionDialog}
        onClose={() => setCreateTransactionDialog(false)}
      />
      <Button onClick={() => setCreateTransactionDialog(true)}>
        Open Create Transaction Dialog
      </Button>
    </Box>
  );
};
export default SandboxView;
