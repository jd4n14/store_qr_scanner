import { fetchApi } from "../../config/fetch";

interface RecordRequest {
  userId: string;
  vehicleId: string;
  storeId: string;
}
export const createRecordApi = async (data: RecordRequest) => {
  const request = await fetchApi(`/records`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  if (!request.ok) {
    throw new Error("Error al crear el registro");
  }
}