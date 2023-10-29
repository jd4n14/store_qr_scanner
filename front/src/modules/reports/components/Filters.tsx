import { useQuery } from "@tanstack/react-query";
import { getAllFiltersApi } from "../api";
import { Stack } from "@mui/material";
import { CustomAutocomplete } from "./CustomAutocomplete";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import esLocale from "date-fns/locale/es";

export const Filters = () => {
  const filtersQuery = useQuery({
    queryKey: ["filters"],
    queryFn: getAllFiltersApi,
  });
  if (filtersQuery.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Stack spacing={2} direction="row">
      <CustomAutocomplete onChange={() => {}} optionList={filtersQuery.data?.users || []} title="Usuario" />
      <CustomAutocomplete onChange={() => {}} optionList={filtersQuery.data?.stores || []} title="Tienda" />
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={esLocale}>
        <DatePicker sx={{ width: "100%" }} label="Fecha" />
      </LocalizationProvider>
    </Stack>
  );
};
