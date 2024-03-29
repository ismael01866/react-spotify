export const utilWithQueryParams = (url: string, query: object = {}) => {
  const params = new URLSearchParams(JSON.parse(JSON.stringify(query)));

  return `${url}?${params}`;
};
