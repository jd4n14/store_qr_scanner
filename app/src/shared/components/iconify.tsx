import { forwardRef } from "react";
import { Icon } from "@iconify/react";
import { Box } from "@mui/material";

// ----------------------------------------------------------------------

const Iconify = forwardRef(
  (
    {
      icon,
      width = 20,
      sx,
      ...other
    }: { icon: string; width?: number; sx?: object; other?: object },
    ref
  ) => (
    <Box
      ref={ref}
      component={Icon}
      icon={icon}
      sx={{ width, height: width, ...sx }}
      {...other}
    />
  )
);

export default Iconify;
