import { Icon, InputAdornment, TextField, styled } from "@mui/material";

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
  return (
    <SearchWrapper>
      <TextField
        placeholder="Buscar"
        variant="outlined"
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Icon>
                <Search />
              </Icon>
            </InputAdornment>
          ),
        }}
      />
    </SearchWrapper>
  );
};
