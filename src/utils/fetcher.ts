export interface Fetcher {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  body?: any;
  json?: boolean;
}

export const fetcher = async ({ url, method, body, json = true }: Fetcher) => {
  const res = await fetch(url, {
    method,
    ...(body && { body: JSON.stringify(body) }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  if (json) {
    const data = await res.json();
    return data.data;
  }
};
