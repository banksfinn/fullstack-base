import { Box, Divider } from "@mui/material";
import BaseView from "./BaseView";
import {
  FitFromGateway,
  useGetFitsFitsGetQuery,
} from "../clients/generatedGatewayClient";
import FitItem from "src/components/Fit/FitItem";

const FitsView = () => {
  // Multiple ways of showing this.
  // The simplest is to just stack fits on top of one another
  // However, the one I like better is to do it like a swiping system

  const { data: fitData } = useGetFitsFitsGetQuery({});

  const safeFitData = fitData ?? [];

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
          {safeFitData.map((f: FitFromGateway) => {
            return (
              <Box key={f.fit_id}>
                <FitItem fit={f} />
                <Divider sx={{ my: 2 }} />
              </Box>
            );
          })}
        </Box>
      </Box>
    </BaseView>
  );
};
export default FitsView;
