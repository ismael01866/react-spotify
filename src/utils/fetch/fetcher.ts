export const fetcher = (...args: any) => {
  const url = args[0];
  const opts = args[1];

  return fetch(url, opts)
    .then((res) => {
      if (!res.ok) throw Error(res.statusText);

      const contentType = res.headers.get('content-type');

      if (contentType?.startsWith('text/plain;')) {
        return res.text();
      }

      if (contentType?.startsWith('application/json;')) {
        return res.json();
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
