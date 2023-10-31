import { useQuery } from "@tanstack/react-query";
import { Filters } from "./components/Filters.tsx";
import { ReportsTable } from "./components/ReportsTable.tsx";
import { StyledHeader } from "./styles.tsx";
import { getAllRecords } from "./api.ts";
import { useAtomValue } from "jotai";
import { filtersAtom } from "./store.ts";
import { useEffect } from "react";

const ReportsPage = () => {
  const filters = useAtomValue(filtersAtom);
  const getRecordsQuery = useQuery({
    queryKey: ["records"],
    queryFn: () => getAllRecords(filters),
  });
  
  useEffect(() => {
    getRecordsQuery.refetch();
  }, [filters]);

  if (getRecordsQuery.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        <StyledHeader>
          <h1>Reportes</h1>
        </StyledHeader>
        <Filters />
      </div>
      <ReportsTable records={getRecordsQuery.data} />
    </div>
  );
};

export default ReportsPage;
