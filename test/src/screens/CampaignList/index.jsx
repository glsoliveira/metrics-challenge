import React, { useEffect, useState, useCallback } from "react";
import { fetchCampaigns } from "../../services/api";
import { Grid } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { CampaignCard } from "../../components/CampaignCard";
import styles from "./styles.module.css";

export const CampaignList = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const DISPLAY_LIMIT = 6;

  useEffect(() => {
    const loadCampaigns = async () => {
      try {
        setIsLoading(true);
        const data = await fetchCampaigns();
        setCampaigns(data.campaigns);
        setIsLoading(false);
      } catch (error) {
        setError("Failed to load campaigns");
        setIsLoading(false);
      }
    };

    loadCampaigns();
  }, []);

  const onCampaignClick = useCallback(
    (campaign) => {
      navigate(`/dashboard/${campaign.id}`, {
        state: { campaignName: campaign.name },
      });
    },
    [navigate]
  );

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (isLoading) {
    return <div className={styles.loading}>Loading campaigns...</div>;
  }

  return (
    <div className={styles.campaignListContainer}>
      <Grid container spacing={3} className={styles.gridContainer}>
        {campaigns.slice(0, DISPLAY_LIMIT).map((campaign) => (
          <CampaignCard
            key={campaign.id}
            campaign={campaign}
            onClick={() => onCampaignClick(campaign)}
          />
        ))}
      </Grid>
    </div>
  );
};
