export const advancedConfigChange = (state, {methodConfig, key, isNumber, isFloat, maybeNumber}, value) => {
  // Only the changed values are put in config. Otherwise merged with config in backend
  // classification.knn weights distance
  const config = state[methodConfig];
  if (isNumber) {
    // for some reason, value can be "". Don't know, dont care
    value = parseInt(value, 10);
  } else if (isFloat) {
    value = parseFloat(value);
  } else if (maybeNumber) {
    const parsed = parseFloat(value);
    if (!isNaN(parsed)) {
      value = parsed;
    }
  }
  config[key] = value;
  return {...state, [methodConfig]: config};
};
