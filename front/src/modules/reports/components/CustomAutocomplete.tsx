import { Autocomplete, TextField } from "@mui/material";
import { useState } from "react";
import { OptionType } from "../types";

interface ICustomAutocompleteProps {
  onChange: (value: OptionType) => void;
  optionList: OptionType[];
  title: string;
  value?: OptionType | null;
}

export const CustomAutocomplete = (props: ICustomAutocompleteProps) => {
  const [value, setValue] = useState<OptionType | null>(props.value || null);

  const onChange = (value: OptionType | null) => {
    setValue(value);
    props.onChange(value as OptionType);
  }

  return (
    <Autocomplete
      fullWidth
      autoHighlight
      value={value}
      onChange={(_event, newValue) => {
        onChange(newValue);
      }}
      options={props.optionList}
      renderInput={(params) => <TextField {...params} label={props.title} />}
    />
  );
};
