import { Filters } from "./components/Filters.tsx";
import { StyledHeader } from "./styles.tsx";
//2023-10-29T14:22:53.532Z
// "2023-10-29T14:20:58.757Z
const ReportsPage = () => {
  return (
    <div>
      <div>
        <StyledHeader>
          <h1>Reportes</h1>
        </StyledHeader>
        <Filters />
      </div>
    </div>
  );
};

export default ReportsPage;
