import {
  Autocomplete,
  Box,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import {
  ArticleFromGateway,
  useGetArticlesArticlesGetQuery,
} from "src/clients/generatedGatewayClient";

interface ArticleSelectorProps {
  articleIds: string[];
  onChange: (newIds: string[]) => void;
}

const ArticleSelector = (props: ArticleSelectorProps) => {
  const { articleIds, onChange } = props;

  const { data: articles } = useGetArticlesArticlesGetQuery({});

  const handleAddArticle = (event: SelectChangeEvent): void => {
    onChange([...articleIds, event.target.value as string]);
  };

  const safeArticles: ArticleFromGateway[] = articles ?? [];

  // const getArticleLabel = useCallback((articleId: string): string => {
  //     for (const article of safeArticles) {
  //         if (article.article_id === articleId) {
  //             return article.label
  //         }
  //     }
  //     return ""
  // }, [safeArticles])

  return (
    <Box sx={{ display: "flex", width: "100%", flexDirection: "column" }}>
      {articleIds.map((articleId: string) => {
        return (
          <Box sx={{ flexDirection: "row" }}>
            <Autocomplete
              options={[articleId]}
              renderInput={(params) => <TextField {...params} />}
              sx={{
                justifyContent: "start",
                display: "flex",
                textAlign: "start",
                my: 1,
              }}
            />
          </Box>
        );
      })}

      <Select
        value={""}
        sx={{ justifyContent: "start", display: "flex", textAlign: "start" }}
        onChange={handleAddArticle}
        fullWidth
      >
        {safeArticles.map((article: ArticleFromGateway) => {
          if (articleIds.includes(article.article_id)) {
            return null;
          }
          return (
            <MenuItem key={article.article_id} value={article.article_id}>
              {article.label}
            </MenuItem>
          );
        })}
      </Select>
    </Box>
  );
};
export default ArticleSelector;
