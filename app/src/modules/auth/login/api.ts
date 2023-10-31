const baseUrl = import.meta.env.VITE_API_URL;

interface Login {
  userId: string;
  role: {
    name: string
  }
}

export const loginApi = async (code: string) => {
  const request = await fetch(`${baseUrl}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({code})
  });
  if (!request.ok) {
    const error = await request.json();
    throw new Error(error.message);
  }
  return await request.json() as Promise<{
    login: Login
  }>;
}