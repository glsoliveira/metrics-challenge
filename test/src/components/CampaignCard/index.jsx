import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Grid,
} from "@material-ui/core";
import styles from "./styles.module.css";

export const CampaignCard = ({ campaign, onClick }) => {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card
        className={styles.campaignCard}
        style={{ backgroundColor: campaign.name }}
      >
        <CardActionArea onClick={onClick} className={styles.cardActionArea}>
          <CardContent>
            <Typography
              variant="h5"
              component="h2"
              className={styles.campaignTitle}
            >
              {campaign.name}
            </Typography>
            <Typography className={styles.campaignId}>
              ID: {campaign.id}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};
