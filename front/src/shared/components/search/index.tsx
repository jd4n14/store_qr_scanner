import { Icon, InputAdornment, TextField, styled } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import {  useSearchParams } from "react-router-dom";

const SearchWrapper = styled("div")(({ theme }) => ({
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
  gap: theme.spacing(2),
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export const Search = () => {
  const [search, setSearch] = useSearchParams();

  const onSearch = (value: string) => {
    if (value.trim() === "") {
      return setSearch({});
    }
    setSearch({
      search: value,
    });
  };

  return (
    <SearchWrapper>
      <TextField
        placeholder="Buscar"
        variant="outlined"
        fullWidth
        value={search.get("search") || ""}
        onChange={(e) => onSearch(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Icon>
                <SearchIcon />
              </Icon>
            </InputAdornment>
          ),
        }}
      />
    </SearchWrapper>
  );
};
