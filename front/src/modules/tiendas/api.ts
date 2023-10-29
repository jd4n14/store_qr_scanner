const baseUrl = import.meta.env.VITE_API_URL;

interface Store {
  id: number;
  name: string;
}

export const getAllStores = () => {
  return fetch(`${baseUrl}/stores`).then(res => res.json()) as Promise<{
    stores: Store[]
  }>;
}

export const createNewStore = ({ name }: { name: string }) => {
  return fetch(`${baseUrl}/stores`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({name})
  }).then(res => res.json());
}