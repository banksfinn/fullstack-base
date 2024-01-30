import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { Box, IconButton, useTheme } from "@mui/material";
import { useMemo, useState } from "react";

interface ImagePreviewProps {
  imageIds: string[];
}

const ImagePreview = (props: ImagePreviewProps) => {
  const { imageIds } = props;

  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const theme = useTheme();

  // TODO: Don't do this here
  const imageUrls = useMemo((): string[] => {
    return imageIds.map((id: string) => {
      return "https://storage.googleapis.com/dressr-photos/" + id;
    });
  }, [imageIds]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "50vw",
        overflow: "hidden",
        mt: 1,
      }}
    >
      <Box>
        <Box
          component="img"
          src={imageUrls[currentImageIndex]}
          width="calc(100% - 16px)"
          sx={{ backgroundColor: theme.palette.divider, p: 1 }}
        />
        {imageUrls.length > 1 && (
          <Box>
            <IconButton
              disabled={currentImageIndex === 0}
              onClick={() => setCurrentImageIndex(currentImageIndex - 1)}
            >
              {" "}
              <ChevronLeft />{" "}
            </IconButton>
            <IconButton
              disabled={currentImageIndex === imageUrls.length - 1}
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
export default ImagePreview;
