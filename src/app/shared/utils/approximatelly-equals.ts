export function approxEq(val1, val2, epsilon) {
  return Math.abs(val1 - val2) < epsilon;
}
