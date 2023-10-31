import { fetchApi } from "../../config/fetch"
import { OptionType } from "./types"

type GetRecordsParams = {
  userId?: string,
  storeId?: string,
  date?: string,
}

export const getAllFiltersApi = async () => {
  return await fetchApi('/filters') as Promise<{
    users: OptionType[],
    stores: OptionType[],
  }>
}

export const getAllRecords = async (params?: GetRecordsParams) => {
  const searchQuery = new URLSearchParams(params);
  const url = `/records?${searchQuery.toString()}`
  return await fetchApi(url) as Promise<any>
}