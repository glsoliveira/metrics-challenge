// Function to calculate total from an array of numbers
export const calculateTotal = (data) => {
  return data.reduce((acc, value) => acc + value, 0);
};

// Function to calculate the Click Through Rate (CTR)
export const calculateCTR = (clicks, impressions) => {
  if (impressions === 0) return 0;
  return (clicks / impressions) * 100;
};

// Function to format numbers in the American style, using "K" for thousands and "M" for millions and "B" for billions.
export const formatNumber = (number) => {
  if (number >= 1000000000) {
    return (number / 1000000).toFixed(1) + "B";
  } else if (number >= 1000000) {
    return (number / 1000000).toFixed(1) + "M";
  } else if (number >= 1000) {
    return (number / 1000).toFixed(1) + "K";
  } else {
    return number.toString();
  }
};
