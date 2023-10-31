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
import { CloseSharp, FileDownload } from "@mui/icons-material";
import { Parser } from "@json2csv/plainjs";
import * as datefns from "date-fns";

export const Filters = ({ records }: { records: any[] }) => {
  const [filters, setFilters] = useAtom(filtersAtom);
  const filtersQuery = useQuery({
    queryKey: ["filters"],
    queryFn: getAllFiltersApi,
  });
  if (filtersQuery.isLoading) {
    return <div>Loading...</div>;
  }

  const onChangeInput = (field: string, value: string | null) => {
    if (value === null) {
      setFilters((prev) => {
        const newFilters = { ...prev };
        delete newFilters[field];
        return newFilters;
      });
      return;
    }
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const onClearFilters = () => {
    setFilters({});
  };

  const generateCSV = (data: Record<string, any>) => {
    try {
      const parser = new Parser({
        fields: ["Tienda", "Usuario", "Entrada", "Salida", "Equipo"],

      });
      const csv = parser.parse(data);
      return csv;
    } catch (error) {
      return "";
    }
  };

  const generateData = (data: Record<string, any>) => {
    return data.map((record) => ({
      Tienda: record.store?.name || "",
      Usuario: record.user.name,
      Entrada: datefns.format(new Date(record.entranceTime), "dd/MM/yyyy HH:mm:ss"),
      Salida: record.exitTime ? datefns.format(new Date(record.exitTime), "dd/MM/yyyy HH:mm:ss") : "",
      Equipo: record.vehicle.name
    }));
  };

  const downloadCsv = () => {
    const data = generateData(records);
    const csv = generateCSV(data);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `reporte-${new Date().getTime()}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
  }

  return (
    <Stack spacing={2} direction="row" sx={(theme) => ({ marginBottom: theme.spacing(2) })}>
      <CustomAutocomplete
        onChange={(value) => onChangeInput("userId", value?.value || null)}
        optionList={filtersQuery.data?.users || []}
        value={filtersQuery.data?.users.find((user) => user.value === filters.userId) || null}
        title="Usuario"
      />
      <CustomAutocomplete
        onChange={(value) => onChangeInput("storeId", value?.value || null)}
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
        <IconButton onClick={downloadCsv}>
          <FileDownload />
        </IconButton>
      </Stack>
      {Object.keys(filters).length > 0 && (
        <Stack sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <IconButton onClick={() => onClearFilters()}>
            <CloseSharp />
          </IconButton>
        </Stack>
      )}
    </Stack>
  );
};
