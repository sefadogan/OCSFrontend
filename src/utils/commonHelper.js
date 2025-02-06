import { isNullOrEmptyOrUndefined } from "./dataCheck";

export const buildQueryString = (parametersObject) => {
  if (isNullOrEmptyOrUndefined(parametersObject)) return "";

  const esc = encodeURIComponent;
  const query = Object.keys(parametersObject)
    .map((k) => esc(k) + "=" + esc(parametersObject[k]))
    .join("&");

  return query;
};

export const buildFilterQuery = (values) => {
  let queryParts = [];

  for (const key in values) {
    if (key === "sorting") continue;

    const value = values[key];

    if (value === null || value === undefined || value === "") continue;

    if (Array.isArray(value) && value.length > 0) {
      queryParts.push(handleArrayFilter(key, value));
    } else if (typeof value === "object" && value !== null) {
      const rangeQuery = handleRangeFilter(key, value);
      if (rangeQuery) queryParts.push(rangeQuery);
    } else {
      queryParts.push(handleSingleValueFilter(key, value));
    }
  }

  return queryParts.length > 0 ? queryParts.join(" and ") : "";
};

// 'eq' filtresi
const handleSingleValueFilter = (key, value) => {
  return typeof value === "string"
    ? `${key} eq '${value}'`
    : `${key} eq ${value}`;
};

// 'in' filtresi (array)
const handleArrayFilter = (key, values) => {
  if (values.length === 0) return "";

  if (key.includes("any")) {
    const [baseKey, , subKey] = key.split("/");
    return `${baseKey}/any(s: s/${subKey} in (${values.join(",")}))`;
  }
  return `${key} in (${values
    .map((v) => (typeof v === "string" ? `'${v}'` : v))
    .join(",")})`;
};

// 'ge' ve 'le' filtresi (sayısal değerler)
const handleRangeFilter = (key, value) => {
  let conditions = [];

  if (!isNullOrEmptyOrUndefined(value.min))
    conditions.push(`${key} ge ${value.min}`);
  if (!isNullOrEmptyOrUndefined(value.max))
    conditions.push(`${key} le ${value.max}`);

  return conditions.length > 0 ? conditions.join(" and ") : "";
};
