export const onlyForCondition2: <T>(
  condition2: boolean,
  predicate: () => T
) => T | undefined = (condition2, predicate) => {
  if (!condition2) {
    return;
  }
  return predicate();
};
