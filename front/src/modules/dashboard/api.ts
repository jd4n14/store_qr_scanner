
const baseUrl = import.meta.env.VITE_API_URL;
interface RecordRequest {
  userId: string;
  vehicleId: string;
}
export const createRecordApi = async (data: RecordRequest) => {
  const request = await fetch(`${baseUrl}/records`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  const response = await request.json();
  if (request.ok) {
    throw new Error(response.message);
  }
  return response
}