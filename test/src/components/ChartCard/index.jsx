import React from "react";
import { Card, Typography, Grid } from "@material-ui/core";

import { Line } from "react-chartjs-2";
import { chartOptions } from "./../../ultils/chartUtils";

export const ChartCard = ({ title, data }) => {
  return (
    <Grid item xs={12} sm={6}>
      <Card style={{ padding: 10, textAlign: "center" }}>
        <Typography variant="h6">{title}</Typography>
        <Line data={data} options={chartOptions} />
      </Card>
    </Grid>
  );
};
