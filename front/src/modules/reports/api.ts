import { fetchApi } from "../../config/fetch"
import { OptionType } from "./types"


export const getAllFiltersApi = async () => {
  return await fetchApi('/filters') as Promise<{
    users: OptionType[],
    stores: OptionType[],
  }>
}