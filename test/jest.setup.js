jest.mock("chartjs-plugin-datalabels", () => ({}));

jest.mock("chart.js", () => ({
  Chart: jest.fn(),
  registerables: [],
  ChartJS: { register: jest.fn() },
}));

global.console = {
  ...console,
  log: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
};
