import { Box, Button, useTheme } from "@mui/material";
import { useState } from "react";
import CreateItemDialog from "src/components/Items/CreateItemDialog";
// // import { useSelector } from "react-redux"
// import { getCurrentUser } from "src/store/components/userSlice"
// import { RootState } from "src/store/store"

interface ItemViewProps {}

const ItemView = (props: ItemViewProps) => {
  const theme = useTheme();
  const [createItemDialog, setCreateItemDialog] = useState<boolean>(false);

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
      <CreateItemDialog
        open={createItemDialog}
        onClose={() => setCreateItemDialog(false)}
      />
      <Button onClick={() => setCreateItemDialog(true)}>
        Open Create Item Dialog
      </Button>
    </Box>
  );
};
export default ItemView;
