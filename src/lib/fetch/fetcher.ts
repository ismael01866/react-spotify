export const fetcher = (...args: any) => {
  const url = args[0];
  const opts = args[1];

  return fetch(url, opts)
    .then((res) => {
      if (!res.ok) throw Error(res.statusText);

      return res.json();
    })
    .catch((err) => err);
};
