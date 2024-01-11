import { fetchCampaigns, fetchDashboardData } from "../services/api";

global.fetch = jest.fn();
global.console.error = jest.fn();

describe("Api.js", () => {
  beforeEach(() => {
    fetch.mockClear();
    console.error.mockClear();
  });

  it("should handle fetch error for fetchCampaigns", async () => {
    // Simulate a fetch error
    fetch.mockRejectedValue(new Error("Network error"));

    // Call your API function
    const result = await fetchCampaigns();

    // Assertions
    expect(fetch).toHaveBeenCalledWith("http://localhost:4000/campaigns");
    expect(result).toBeNull();
    expect(console.error).toHaveBeenCalledWith(
      "Error fetching campaigns:",
      expect.any(Error) // Expecting any error object
    );
  });

  it("fetchCampaigns successfully fetches data", async () => {
    const mockCampaigns = [
      { id: 1, name: "Campaign 1" },
      { id: 2, name: "Campaign 2" },
    ];
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockCampaigns,
    });

    const result = await fetchCampaigns();
    expect(fetch).toHaveBeenCalledWith("http://localhost:4000/campaigns");
    expect(result).toEqual(mockCampaigns);
  });

  it("fetchCampaigns handles network error", async () => {
    fetch.mockRejectedValueOnce(new Error("Network error"));

    const result = await fetchCampaigns();
    expect(fetch).toHaveBeenCalledWith("http://localhost:4000/campaigns");
    expect(result).toBeNull();
    expect(console.error).toHaveBeenCalledWith(
      "Error fetching campaigns:",
      expect.any(Error)
    );
  });

  it("fetchDashboardData successfully fetches data", async () => {
    const mockData = { impressions: 100, clicks: 50 };
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const result = await fetchDashboardData(1, 10);
    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:4000/campaigns/1?number=10"
    );
    expect(result).toEqual(mockData);
  });

  it("fetchDashboardData handles network error", async () => {
    fetch.mockRejectedValueOnce(new Error("Network error"));

    const result = await fetchDashboardData(1, 10);
    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:4000/campaigns/1?number=10"
    );
    expect(result).toBeNull();
    expect(console.error).toHaveBeenCalledWith(
      "Error fetching dashboard data:",
      expect.any(Error)
    );
  });
});
