import { Icon, InputAdornment, TextField, styled } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

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

interface SearchProps {
  onSearch?: (value: string) => void;
}

export const Search = (props: SearchProps) => {
  const [search, setSearch] = useSearchParams();

  const onSearch = (value: string) => {
    if (value.trim() === "") {
      props?.onSearch?.(value);
      return setSearch({});
    }
    props?.onSearch?.(value);
    setSearch({
      search: value,
    });
  };

  useEffect(() => {
    onSearch(search.get("search") || "");
  }, []);

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
