import { Autocomplete, TextField } from "@mui/material";
import { useState } from "react";
import { OptionType } from "../types";

interface ICustomAutocompleteProps {
  onChange: (value: OptionType) => void;
  optionList: OptionType[];
  title: string;
}

export const CustomAutocomplete = (props: ICustomAutocompleteProps) => {
  const [value, setValue] = useState<OptionType | null>(null);

  return (
    <Autocomplete
      fullWidth
      autoHighlight
      value={value}
      onChange={(_event, newValue) => {
        setValue(newValue);
      }}
      options={props.optionList}
      renderInput={(params) => <TextField {...params} label={props.title} />}
    />
  );
};
