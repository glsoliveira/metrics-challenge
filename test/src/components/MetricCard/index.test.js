import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MetricCard } from "./index";

describe("MetricCard", () => {
  it("should render the title and value correctly", () => {
    const mockTitle = "Test Title";
    const mockValue = "Test Value";
    const mockCampaignName = "blue";

    render(
      <MetricCard
        title={mockTitle}
        value={mockValue}
        campaignName={mockCampaignName}
      />
    );

    expect(screen.getByText(mockTitle)).toBeInTheDocument();

    expect(screen.getByText(mockValue)).toBeInTheDocument();
  });

  // Additional tests can be written as needed to cover more functionalities
});
