import { DataGrid, GridColDef, GridValueGetterParams, GridValueFormatterParams } from "@mui/x-data-grid";
import * as datefns from 'date-fns';

const columns: GridColDef[] = [
  { field: "id", headerName: "Id" },
  {
    field: "userCode",
    headerName: "Código de usuario",
    valueGetter: (params: GridValueGetterParams) => params.row.user?.code || "-",
    flex: 1,
  },
  {
    field: "userName",
    headerName: "Nombre de usuario",
    valueGetter: (params: GridValueGetterParams) => params.row.user?.name || "",
    flex: 1,
  },
  {
    field: "entranceTime",
    headerName: "Hora de entrada",
    type: "date",
    valueFormatter: (params: GridValueFormatterParams<string>) => {
      return datefns.format(new Date(params.value), 'dd/MM/yyyy HH:mm:ss')
    },
    flex: 1,
  },
  {
    field: "exitTime",
    headerName: "Hora de salida",
    type: "date",
    valueFormatter: (params: GridValueFormatterParams<string>) => {
      if (!params.value) return "-"
      return datefns.format(new Date(params.value), 'dd/MM/yyyy HH:mm:ss')
    },
    flex: 1,
  },
  {
    field: "vehicleId",
    headerName: "No. de equipo",
    valueGetter: (params: GridValueGetterParams) => params.row.vehicle?.name || "",
    flex: 1,
  },
];

type RecordType = {
  id: number;
  userCode: string;
  userName: string;
  entranceTime: string;
  exitTime: string;
  vehicleId: string;
}

interface ReportsTableProps {
  records: RecordType[];
}

export const ReportsTable = (props: ReportsTableProps) => {
  return (
    <DataGrid
      rows={props.records}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 5,
          },
        },
      }}
      pageSizeOptions={[5]}
      disableRowSelectionOnClick
    />
  );
};
