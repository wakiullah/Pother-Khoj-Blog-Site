import { getBaseUrl } from "@/utilitis/getBaseUrl";

export const apiRequest = async (url, method = 'GET', data = null) => {
  const config = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (data) {
    config.body = JSON.stringify(data);
  }
  try {
    const response = await fetch(`${getBaseUrl()}api${url}`, config);
    return await response.json();
  } catch (err) {
    console.error('err', err)
  }
};