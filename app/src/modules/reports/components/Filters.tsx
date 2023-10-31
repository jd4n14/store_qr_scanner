import { useQuery } from "@tanstack/react-query";
import { getAllFiltersApi } from "../api";
import { IconButton, Stack } from "@mui/material";
import { CustomAutocomplete } from "./CustomAutocomplete";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import esLocale from "date-fns/locale/es";
import { useAtom } from "jotai";
import { filtersAtom } from "../store";
import { CloseSharp } from "@mui/icons-material";

export const Filters = () => {
  const [filters, setFilters] = useAtom(filtersAtom);
  const filtersQuery = useQuery({
    queryKey: ["filters"],
    queryFn: getAllFiltersApi,
  });
  if (filtersQuery.isLoading) {
    return <div>Loading...</div>;
  }

  const onChangeInput = (field: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const onClearFilters = () => {
    setFilters({});
  };

  return (
    <Stack spacing={2} direction="row" sx={(theme) => ({ marginBottom: theme.spacing(2) })}>
      <CustomAutocomplete
        onChange={(value) => onChangeInput("userId", value.value)}
        optionList={filtersQuery.data?.users || []}
        value={filtersQuery.data?.users.find((user) => user.value === filters.userId) || null}
        title="Usuario"
      />
      <CustomAutocomplete
        onChange={(value) => onChangeInput("storeId", value.value)}
        optionList={filtersQuery.data?.stores || []}
        value={filtersQuery.data?.stores.find((store) => store.value === filters.storeId) || null}
        title="Tienda"
      />
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={esLocale}>
        <DatePicker
          sx={{ width: "100%" }}
          label="Fecha"
          value={new Date(filters?.date || new Date())}
          onChange={(value) => onChangeInput("date", new Date(value as unknown as any).toJSON())}
        />
      </LocalizationProvider>
      <Stack sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <IconButton onClick={() => onClearFilters()}>
          <CloseSharp />
        </IconButton>
      </Stack>
    </Stack>
  );
};
