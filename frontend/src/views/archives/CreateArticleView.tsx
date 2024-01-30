import { Box, Button, Card, TextField, Typography } from "@mui/material";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCreateArticleArticlesPostMutation } from "src/clients/generatedGatewayClient";
import SelectClassifier from "src/components/Classifier/SelectClassifier";
import UploadImages from "src/components/Image/UploadImages";
import {
  updateBrand,
  updateClassifier,
  updateImages,
  updateLabel,
  useArticleCreationState,
} from "src/store/components/createArticleSlice";
import BaseView from "./BaseView";

const CreateArticleView = () => {
  const createArticleState = useArticleCreationState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [createArticle] = useCreateArticleArticlesPostMutation();

  const handleUpdateBrand = (e: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(updateBrand(e.target.value));
  };
  const handleUpdateLabel = (e: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(updateLabel(e.target.value));
  };

  const handleUpdateClassifier = (newId: string): void => {
    dispatch(updateClassifier(newId));
  };

  const handleUpdateImages = (imageIds: string[]): void => {
    dispatch(updateImages(imageIds));
  };

  const handleSubmitCreation = useCallback(() => {
    console.log(createArticleState);
    createArticle({
      articleCreationRequest: {
        ...createArticleState,
      },
    }).then((): void => {
      // Where should we go?
      navigate("/home");
    });
  }, [createArticleState, createArticle, navigate]);

  return (
    <BaseView>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <Typography variant="h2" sx={{ mb: 4 }}>
          Create Article
        </Typography>
        <Card sx={{ p: 4, display: "flex", flexDirection: "column" }}>
          <TextField
            type="text"
            label="Brand"
            sx={{ my: 1 }}
            value={createArticleState.brand}
            onChange={handleUpdateBrand}
          />
          <TextField
            type="text"
            label="Label"
            sx={{ my: 1 }}
            value={createArticleState.label}
            onChange={handleUpdateLabel}
          />
          <SelectClassifier
            classifierId={createArticleState.classifier_id}
            onChange={handleUpdateClassifier}
          />
          <UploadImages
            currentImageIds={createArticleState.image_ids}
            onUploadImages={handleUpdateImages}
            showImages={true}
          />
          <Button
            variant="outlined"
            color="primary"
            sx={{ mt: 4 }}
            onClick={handleSubmitCreation}
          >
            Submit
          </Button>
        </Card>
      </Box>
    </BaseView>
  );
};
export default CreateArticleView;
