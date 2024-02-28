export const filterAndDelete = (array, keepKeys) => {
  return array.map((obj) => {
    Object.keys(obj).forEach((key) => {
      if (!keepKeys.includes(key)) {
        delete obj[key];
      }
    });
    return obj;
  });
};

export const filterAndRenameKeys = (array, keys) => {
  return array.map((obj) => {
    const newObj = {};
    Object.keys(obj).forEach((key) => {
      newObj[keys[key] || key] = obj[key];
    });
    return newObj;
  });
};
