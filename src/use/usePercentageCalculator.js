export function usePercentageCalculator(oldValue, newValue) {
  return ((newValue - oldValue) / oldValue) * 100;
}
