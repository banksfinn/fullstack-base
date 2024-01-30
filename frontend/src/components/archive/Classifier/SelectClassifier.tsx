import { Box, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import {
  ClassifierFromGateway,
  useGetClassifiersClassifiersGetQuery,
} from "src/clients/generatedGatewayClient";

interface SelectClassifierProps {
  classifierId: string;
  onChange: (newId: string) => void;
}

const SelectClassifier = (props: SelectClassifierProps) => {
  const { classifierId, onChange } = props;
  const { data: classifiers } = useGetClassifiersClassifiersGetQuery({});

  const handleUpdateClassifier = (event: SelectChangeEvent): void => {
    onChange(event.target.value as string);
  };
  const safeClassifiers: ClassifierFromGateway[] = classifiers ?? [];

  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <Select
        value={classifierId}
        sx={{ justifyContent: "start", display: "flex", textAlign: "start" }}
        onChange={handleUpdateClassifier}
        fullWidth
      >
        {safeClassifiers.map((classifier: ClassifierFromGateway) => {
          return (
            <MenuItem
              key={classifier.classifier_id}
              value={classifier.classifier_id}
            >
              {classifier.label}
            </MenuItem>
          );
        })}
      </Select>
    </Box>
  );
};
export default SelectClassifier;
