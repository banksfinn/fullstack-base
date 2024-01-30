import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { Box, IconButton, useTheme } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { FitFromGateway } from "src/clients/generatedGatewayClient";
import { getViewMode } from "src/store/components/userViewSlice";
import { RootState } from "src/store/store";

interface FitItemViewerProps {
  fit: FitFromGateway;
}

const FitItemViewer = (props: FitItemViewerProps) => {
  const { fit } = props;
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const theme = useTheme();
  const viewMode = useSelector((state: RootState) => getViewMode(state));
  const imageWidth: string = viewMode === "desktop" ? "20vw" : "80vw";

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: viewMode === "mobile" ? "center" : "flex-end",
      }}
    >
      <Box>
        <Box
          component="img"
          src={fit.image_ids[currentImageIndex]}
          width={imageWidth}
          sx={{ backgroundColor: theme.palette.divider, p: 1 }}
        />
        {fit.image_ids.length > 1 && (
          <Box>
            <IconButton
              disabled={currentImageIndex === 0}
              onClick={() => setCurrentImageIndex(currentImageIndex - 1)}
            >
              {" "}
              <ChevronLeft />{" "}
            </IconButton>
            <IconButton
              disabled={currentImageIndex === fit.image_ids.length - 1}
              onClick={() => setCurrentImageIndex(currentImageIndex + 1)}
            >
              {" "}
              <ChevronRight />{" "}
            </IconButton>
          </Box>
        )}
      </Box>
    </Box>
  );
};
export default FitItemViewer;
