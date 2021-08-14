const fetcher = async (url, token) => {
  const response = await fetch(url, { headers: { Authorization: token } });

  if (!response.ok) {
    const error = new Error("An error occurred while fetching the data.");
    // Attach extra info to the error object.
    error.info = await response.json();
    error.status = response.status;
    throw error;
  }

  return response.json();
};

export default fetcher;
