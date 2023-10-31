import { fetchApi } from "../../../config/fetch";


export const loginApi = async (code: string) => {
  const request = await fetchApi(`/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({code})
  });
  return request as any;
}