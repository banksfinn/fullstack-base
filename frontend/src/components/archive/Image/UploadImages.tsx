import { AddAPhotoSharp } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useUploadImagesImagesPostMutation } from "src/clients/generatedGatewayClient";
import ImagePreview from "./ImagePreview";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

interface UploadImagesProps {
  onUploadImages: (imageIds: string[]) => void;
  currentImageIds: string[];
  showImages: boolean;
}

const UploadImages = (props: UploadImagesProps) => {
  const { onUploadImages, showImages, currentImageIds } = props;
  const [uploadImages] = useUploadImagesImagesPostMutation();

  const handleUploadFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    }
    const formData = new FormData();
    for (const image of event.target.files) {
      formData.append("images", image);
    }
    uploadImages({
      // @ts-expect-error Testing
      bodyUploadImagesImagesPost: formData,
    }).then((response) => {
      if (response && "data" in response) {
        onUploadImages(response.data);
      }
    });
  };

  return (
    <Box>
      {showImages && currentImageIds.length !== 0 && (
        <ImagePreview imageIds={currentImageIds} />
      )}
      <IconButton component="label" sx={{ my: 1 }} size="large">
        <AddAPhotoSharp fontSize="large" />
        <VisuallyHiddenInput
          type="file"
          accept=".jpg"
          onChange={handleUploadFiles}
          multiple
        />
      </IconButton>
    </Box>
  );
};
export default UploadImages;
