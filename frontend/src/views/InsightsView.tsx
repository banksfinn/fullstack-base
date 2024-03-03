import { Box } from "@mui/material";
import { BarChart, PieChart } from "@mui/x-charts";
import { ItemType, useGetItemsQuery } from "src/clients/generatedGatewayClient";
import { useItemTableQuery } from "src/store/components/itemTableSlice";

interface PieChartData {
    [ItemType.TypeA]: number;
    [ItemType.TypeB]: number;
    [ItemType.TypeC]: number;
}

const InsightsView = () => {
    const query = useItemTableQuery();
    const { data } = useGetItemsQuery(query);

    const getPieChartData = (): PieChartData => {
        const result: PieChartData = {
            TYPE_A: 0,
            TYPE_B: 0,
            TYPE_C: 0,
        };
        for (const item of data?.items ?? []) {
            result[item.item_type] += 1;
        }
        return result;
    };

    const pieChartData = getPieChartData();

    return (
        <Box
            sx={{
                p: 4,
                display: "flex",
                flexDirection: "column",
            }}
        >
            <BarChart series={[]} />
            <PieChart
                height={400}
                width={400}
                series={[
                    {
                        data: [
                            {
                                id: 0,
                                value: pieChartData[ItemType.TypeA],
                                label: "Type A",
                            },
                            {
                                id: 1,
                                value: pieChartData[ItemType.TypeB],
                                label: "Type B",
                            },
                            {
                                id: 2,
                                value: pieChartData[ItemType.TypeC],
                                label: "Type C",
                            },
                        ],
                    },
                ]}
            />
        </Box>
    );
};
export default InsightsView;
