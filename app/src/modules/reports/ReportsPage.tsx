import { useQuery } from "@tanstack/react-query";
import { Filters } from "./components/Filters.tsx";
import { ReportsTable } from "./components/ReportsTable.tsx";
import { StyledHeader } from "./styles.tsx";
import { getAllRecords } from "./api.ts";
import { useAtomValue } from "jotai";
import { filtersAtom } from "./store.ts";
import { useEffect } from "react";
import { Typography } from "@mui/material";
import { Helmet } from "react-helmet-async";

const ReportsPage = () => {
  const filters = useAtomValue(filtersAtom);
  const getRecordsQuery = useQuery({
    queryKey: ["records"],
    queryFn: () => getAllRecords(filters),
    // run refetch when filters change
    refetchOnMount: false,
  });

  useEffect(() => {
    getRecordsQuery.refetch();
  }, [filters]);

  if (getRecordsQuery.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Helmet>
        <title> Reportes </title>
      </Helmet>
      <div>
        <StyledHeader>
          <Typography variant="h3">Reportes</Typography>
        </StyledHeader>
        <Filters />
      </div>
      <ReportsTable records={getRecordsQuery.data} />
    </div>
  );
};

export default ReportsPage;
