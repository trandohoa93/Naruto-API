export const getUniqueValues = (data, type) => {
  let unique = data.map((item) => item.info[type]);
  return ["all", ...new Set(unique)];
};
