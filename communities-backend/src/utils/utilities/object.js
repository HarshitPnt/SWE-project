export const retainFields = (obj, fieldsToKeep) => {
  Object.keys(obj).forEach((key) => {
    if (!fieldsToKeep.includes(key)) {
      delete obj[key];
    }
  });
};
