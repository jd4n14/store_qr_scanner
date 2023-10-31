import { atom } from "jotai";

type Filters = {
  userId?: string;
  storeId?: string;
  date?: string;
};

export const filtersAtom = atom<Filters>({});
