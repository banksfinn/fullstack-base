import { Box } from "@mui/material";
import BaseView from "./BaseView";
import {
  ArticleFromGateway,
  useGetArticlesArticlesGetQuery,
} from "src/clients/generatedGatewayClient";
import ArticleItem from "src/components/Article/ArticleItem";

const WardobeView = () => {
  const { data: articleData } = useGetArticlesArticlesGetQuery({});

  const safeArticleData = articleData ?? [];

  return (
    <BaseView>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexGrow: 1,
          mt: 2,
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          {safeArticleData.map((a: ArticleFromGateway) => {
            return (
              <Box key={a.article_id}>
                <ArticleItem article={a} />
              </Box>
            );
          })}
        </Box>
      </Box>
    </BaseView>
  );
};
export default WardobeView;
