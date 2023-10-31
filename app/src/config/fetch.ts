// wrapper for fetch
//
const baseUrl = import.meta.env.VITE_API_URL || 'api';
export const fetchApi = async (url: string, options: RequestInit = {}) => {
  const response = await fetch(`${baseUrl}${url}`, options);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
  // if response code is 201, return empty object
  if (response.status === 201) {
    return { ok: true };
  }
  return response.json();
}