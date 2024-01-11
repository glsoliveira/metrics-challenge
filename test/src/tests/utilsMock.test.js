import {
  calculateTotal,
  calculateCTR,
  formatNumber,
} from "../ultils/dataUtils";

describe("Utility Functions", () => {
  // Testing calculateTotal
  describe("calculateTotal", () => {
    it("should correctly calculate the sum of an array of numbers", () => {
      expect(calculateTotal([1, 2, 3, 4, 5])).toBe(15);
      expect(calculateTotal([])).toBe(0);
      expect(calculateTotal([100, 200])).toBe(300);
    });
  });

  // Testing calculateCTR
  describe("calculateCTR", () => {
    it("should correctly calculate the CTR", () => {
      expect(calculateCTR(100, 1000)).toBe(10);
      expect(calculateCTR(0, 1000)).toBe(0);
      expect(calculateCTR(50, 0)).toBe(0);
    });
  });

  // Testing formatNumber
  describe("formatNumber", () => {
    it("should correctly format numbers", () => {
      expect(formatNumber(1500)).toBe("1.5K");
      expect(formatNumber(2000000)).toBe("2.0M");
      expect(formatNumber(3000000000)).toBe("3000.0B");
      expect(formatNumber(123)).toBe("123");
    });
  });
});
