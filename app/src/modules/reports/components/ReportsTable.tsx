import { Box } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams, GridValueFormatterParams, esES } from "@mui/x-data-grid";
import * as datefns from "date-fns";
import { CustomNoRowsOverlay } from "./NoRows";

const columns: GridColDef[] = [
  { field: "id", headerName: "Id" },
  {
    field: "storeName",
    headerName: "Nombre de la tienda",
    valueGetter: (params: GridValueGetterParams) => params.row.store?.name || "-",
    flex: 1,
    minWidth: 150,
  },
  {
    field: "userName",
    headerName: "Nombre de usuario",
    valueGetter: (params: GridValueGetterParams) => params.row.user?.name || "",
    flex: 1,
    minWidth: 150,
  },
  {
    field: "entranceTime",
    headerName: "Hora de entrada",
    type: "date",
    valueFormatter: (params: GridValueFormatterParams<string>) => {
      return datefns.format(new Date(params.value), "dd/MM/yyyy HH:mm:ss");
    },
    flex: 1,
    minWidth: 300,
  },
  {
    field: "exitTime",
    headerName: "Hora de salida",
    type: "date",
    valueFormatter: (params: GridValueFormatterParams<string>) => {
      if (!params.value) return "-";
      return datefns.format(new Date(params.value), "dd/MM/yyyy HH:mm:ss");
    },
    flex: 1,
    minWidth: 300,
  },
  {
    field: "vehicleId",
    headerName: "No. de equipo",
    valueGetter: (params: GridValueGetterParams) => params.row.vehicle?.name || "",
    flex: 1,
    minWidth: 300,
  },
];

type RecordType = {
  id: number;
  userCode: string;
  userName: string;
  entranceTime: string;
  exitTime: string;
  vehicleId: string;
};

interface ReportsTableProps {
  records: RecordType[];
}

export const ReportsTable = (props: ReportsTableProps) => {
  return (
    <Box sx={{ width: "100%", height: 400 }}>
      <DataGrid
        localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        slots={{
          noRowsOverlay: CustomNoRowsOverlay,
        }}
        rows={props.records}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[5, 10, 100]}
        disableRowSelectionOnClick
      />
    </Box>
  );
};
