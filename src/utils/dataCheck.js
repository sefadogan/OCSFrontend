export const isNull = (data) => {
  return data === null;
};

export const isUndefined = (data) => {
  return data === undefined;
};

export const isNullOrEmptyOrUndefined = (data) => {
  return isNull(data) || data === "" || isUndefined(data);
};

export const isArrayEmpty = (data) => {
  return data?.length === 0;
};
