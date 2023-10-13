import { forwardRef } from 'react';
import { Box } from '@mui/material';

const SvgColor = forwardRef(({ src, sx, ...other }, ref) => (
  <Box
    component="span"
    className="svg-color"
    ref={ref}
    sx={{
      width: 24,
      height: 24,
      display: "inline-block",
      bgcolor: "currentColor",
      mask: `url(${src}) no-repeat center / contain`,
      WebkitMask: `url(${src}) no-repeat center / contain`,
      ...sx,
    }}
    {...other}
  />
));
const icon = (name) => (
  <SvgColor
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
);


const navConfig = [
  {
    title: "Home",
    path: "",
    icon: icon('home_line'),
  },
  {
    title: "Usuarios",
    path: "/dashboard/user",
    icon: icon("user_line"),
  },
  {
    title: "Tiendas",
    path: "/stores",
    icon: icon("store_line"),
  },
  {
    title: "Reportes",
    path: "/dashboard/blog",
    icon: icon("file_chart_line"),
  },
];

export default navConfig;
