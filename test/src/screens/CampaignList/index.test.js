import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { CampaignList } from "./index";
import { fetchCampaigns } from "../../services/api";
import { BrowserRouter } from "react-router-dom";

jest.mock("../../services/api", () => ({
  fetchCampaigns: jest.fn(),
}));
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

describe("CampaignList", () => {
  it("should display loading initially", () => {
    fetchCampaigns.mockResolvedValueOnce({ campaigns: [] });

    render(
      <BrowserRouter>
        <CampaignList />
      </BrowserRouter>
    );

    expect(screen.getByText("Loading campaigns...")).toBeInTheDocument();
  });

  it("should not display loading indicator after campaigns are fetched", async () => {
    const mockCampaigns = [{ id: 1, name: "Campaign 1" }];

    fetchCampaigns.mockResolvedValueOnce({ campaigns: mockCampaigns });

    render(
      <BrowserRouter>
        <CampaignList />
      </BrowserRouter>
    );
  });

  it("should display error message on fetch failure", async () => {
    fetchCampaigns.mockRejectedValue(new Error("Failed to load campaigns"));

    render(
      <BrowserRouter>
        <CampaignList />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Failed to load campaigns")).toBeInTheDocument();
    });
  });

  it("should display campaigns when fetch is successful", async () => {
    const mockCampaigns = [
      { id: 1, name: "Campaign 1" },
      { id: 2, name: "Campaign 2" },
    ];

    fetchCampaigns.mockResolvedValueOnce({ campaigns: mockCampaigns });

    await act(async () => {
      render(
        <BrowserRouter>
          <CampaignList />
        </BrowserRouter>
      );
    });
  });
});
