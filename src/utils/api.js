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

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${url}`, config);
    console.log(response)
    return await response.json();
  } catch (err) {
    console.err(err)
  }
};