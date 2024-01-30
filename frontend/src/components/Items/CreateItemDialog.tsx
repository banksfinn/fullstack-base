import { Box, Dialog, TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

interface CreateItemDialogProps {
  open: boolean;
  onClose: () => void;
}

const CreateItemDialog = (props: CreateItemDialogProps) => {
  const { open, onClose } = props;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{ display: "flex", flexDirection: "column" }}
    >
      <Box sx={{ p: 4 }}>
        <Box sx={{ width: "100%", height: "64px" }}>
          <Typography>Create Item</Typography>
        </Box>
        <Box sx={{ width: "100%", height: "calc(100% - 64px)" }}>
          Date
          <Box sx={{ flexDirection: "row" }}>
            <DatePicker value={dayjs()} />
          </Box>
          Name and Cost
          <Box sx={{ flexDirection: "row" }}>
            <TextField label="Name"></TextField>
            <TextField label="Cost" type="number"></TextField>
          </Box>
          Insitutions Add
          <Box>
            <TextField label="From"></TextField>
            <TextField label="To"></TextField>
          </Box>
          Description
          <Box>
            <TextField
              label="Description"
              multiline={true}
              rows={4}
            ></TextField>
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
};
export default CreateItemDialog;
