export const retainFields = (obj, fieldsToKeep) => {
  Object.keys(obj).forEach((key) => {
    if (!fieldsToKeep.includes(key)) {
      console.log("HERE");
      delete obj[key];
    }
  });
  return obj;
};

export const checkFields = (obj, fieldsToCheck) => {
  let missing = [];
  for (let field of fieldsToCheck) {
    if (!obj[field]) {
      missing.push(field);
    }
  }
  if (missing.length > 0) {
    return { status: false, missing: missing };
  }
  return { status: true };
};
