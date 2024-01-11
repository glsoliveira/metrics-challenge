import React from "react";
import { Card, CardContent, Typography, Grid } from "@material-ui/core";
import styles from "./styles.module.css";

export const MetricCard = ({ title, value, campaignName }) => {
  return (
    <Grid item style={{ height: "20%" }}>
      <Card
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: campaignName,
        }}
      >
        <CardContent style={{ height: "100%", textAlign: "center" }}>
          <Typography variant="subtitle2" className={styles.metricTitle}>
            {title}
          </Typography>
          <Typography variant="h6" className={styles.metricValue}>
            {value}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};
