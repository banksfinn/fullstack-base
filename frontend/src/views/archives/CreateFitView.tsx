import { Box, Button, Card, TextField, Typography } from "@mui/material";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCreateFitFitsPostMutation } from "src/clients/generatedGatewayClient";
import UploadImages from "src/components/Image/UploadImages";
import { updateImages } from "src/store/components/createArticleSlice";
import BaseView from "./BaseView";
import ArticleSelector from "src/components/Article/ArticleSelector";
import {
  updateArticles,
  updateSummary,
  updateTitle,
  useFitCreationState,
} from "src/store/components/createFitSlice.ts";

const CreateFitView = () => {
  const createFitState = useFitCreationState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [createFit] = useCreateFitFitsPostMutation();

  const handleUpdateTitle = (e: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(updateTitle(e.target.value));
  };

  const handleUpdateSummary = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    dispatch(updateSummary(e.target.value));
  };

  const handleUpdateArticles = (newIds: string[]): void => {
    dispatch(updateArticles(newIds));
  };

  const handleUpdateImages = (imageIds: string[]): void => {
    dispatch(updateImages(imageIds));
  };

  const handleSubmitCreation = useCallback(() => {
    createFit({
      fitCreationRequest: {
        ...createFitState,
      },
    }).then((): void => {
      // Where should we go?
      navigate("/home");
    });
  }, [createFitState, createFit, navigate]);

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
          Upload Fit
        </Typography>
        <Card sx={{ p: 4, display: "flex", flexDirection: "column" }}>
          <UploadImages
            currentImageIds={createFitState.image_ids}
            onUploadImages={handleUpdateImages}
            showImages={true}
          />
          <TextField
            type="text"
            label="Title"
            sx={{ my: 1 }}
            value={createFitState.title}
            onChange={handleUpdateTitle}
          />
          <TextField
            type="text"
            multiline
            minRows={4}
            label="Summary"
            sx={{ my: 1 }}
            value={createFitState.summary}
            onChange={handleUpdateSummary}
          />
          <ArticleSelector
            articleIds={createFitState.article_ids}
            onChange={handleUpdateArticles}
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
export default CreateFitView;
