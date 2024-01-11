import React from "react";
import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
} from "@material-ui/core";
import InfoIcon from "@mui/icons-material/Info";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

export const FilterControl = ({
  filterOption,
  handleFilterChange,
  handleCustomValueChange,
  customValue,
  campaignName,
}) => {
  const longText = `
  Most Recent: This field will pause the charts and display the 7 most recent data points.\n 
  Custom: This field will pause the charts and allow the user to customize how much data they want to view.\n
  All Data: This field will display all the dates and update the chart every 5 seconds.
`;
  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <FormControl
        component="fieldset"
        style={{
          backgroundColor: campaignName,
          color: "#29292e",
          padding: "10px",
          borderRadius: "5px",
        }}
      >
        <RadioGroup row value={filterOption} onChange={handleFilterChange}>
          <FormControlLabel
            value="mostRecent"
            control={<Radio style={{ color: "#202024" }} />}
            label="Most Recent"
          />
          <FormControlLabel
            value="custom"
            control={<Radio style={{ color: "#202024" }} />}
            label="Custom"
          />
          {filterOption === "custom" && (
            <TextField
              type="number"
              value={customValue}
              onChange={handleCustomValueChange}
              variant="outlined"
              size="small"
              style={{ marginRight: 8, width: 70 }}
              inputProps={{
                min: 0,
                max: 100,
                step: 1,
                style: { backgroundColor: "white" },
              }}
            />
          )}
          <FormControlLabel
            value="all"
            control={<Radio style={{ color: "#202024" }} />}
            label="All Data"
          />
          <Tooltip
            title={<span style={{ whiteSpace: "pre-line" }}>{longText}</span>}
            enterDelay={500}
            arrow
            placement="top"
          >
            <IconButton>
              <InfoIcon style={{ color: "#202024" }} />
            </IconButton>
          </Tooltip>
        </RadioGroup>
      </FormControl>
    </div>
  );
};
