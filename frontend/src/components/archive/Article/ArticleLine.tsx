import { Box } from "@mui/material";

interface ArticleLineProps {
  articleId: string;
}

const ArticleLine = (props: ArticleLineProps) => {
  const { articleId } = props;

  return (
    <Box sx={{ display: "flex", flexDirection: "row" }}>
      <Box>{articleId}</Box>
      {/* <Box>{article.label}</Box> */}
    </Box>
  );
};
export default ArticleLine;
