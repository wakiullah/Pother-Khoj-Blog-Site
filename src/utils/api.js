
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
    const response = await fetch(`/api${url}`, config);
    return await response.json();
  } catch (err) {
    console.error('err', err)
  }
};