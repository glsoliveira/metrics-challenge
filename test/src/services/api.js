const BASE_URL = "http://localhost:4000";

const processResponse = async (response) => {
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
};

const handleError = (error, message) => {
  console.error(message, error);
  return null;
};

export const fetchCampaigns = async () => {
  try {
    const response = await fetch(`${BASE_URL}/campaigns`);
    return await processResponse(response);
  } catch (error) {
    return handleError(error, "Error fetching campaigns:");
  }
};

export const fetchDashboardData = async (campaignId, number) => {
  try {
    const response = await fetch(
      `${BASE_URL}/campaigns/${campaignId}?number=${number}`
    );
    return await processResponse(response);
  } catch (error) {
    return handleError(error, "Error fetching dashboard data:");
  }
};
