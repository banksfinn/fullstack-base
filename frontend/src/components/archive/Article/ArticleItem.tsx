import { Box } from "@mui/material";
import { ArticleFromGateway } from "src/clients/generatedGatewayClient";

interface ArticleItemProps {
  article: ArticleFromGateway;
}

const ArticleItem = (props: ArticleItemProps) => {
  const { article } = props;

  return (
    <Box sx={{ display: "flex", flexDirection: "row" }}>
      <Box>{article.brand}</Box>
      <Box>{article.label}</Box>
    </Box>
  );
};
export default ArticleItem;
