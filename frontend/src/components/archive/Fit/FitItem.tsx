import { Grid, Typography } from "@mui/material";
import { FitFromGateway } from "src/clients/generatedGatewayClient";
import FitItemViewer from "./FitImageView";
import ArticleLine from "../Article/ArticleLine";

interface FitItemProps {
  fit: FitFromGateway;
}

const FitItem = (props: FitItemProps) => {
  const { fit } = props;
  return (
    <Grid container sx={{ display: "flex", justifyContent: "center" }}>
      <Grid item md={4}>
        <FitItemViewer fit={fit} />
      </Grid>
      <Grid item md={4}>
        <Typography variant="h5">{fit.title}</Typography>
        <Typography variant="body1">{fit.summary}</Typography>
        {fit.article_ids.map((articleId: string) => {
          return <ArticleLine articleId={articleId} />;
        })}
        {/* The title, summary, and the articles */}
      </Grid>
    </Grid>
  );
};
export default FitItem;
