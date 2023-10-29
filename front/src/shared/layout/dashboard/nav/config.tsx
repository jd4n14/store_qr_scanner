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
    role: "admin",
  },
  {
    title: "Star Page",
    path: "",
    icon: icon('home_line'),
    role: "user",
  },
  {
    title: "Usuarios",
    path: "/users",
    icon: icon("user_line"),
    role: "admin"
  },
  {
    title: "Tiendas",
    path: "/stores",
    icon: icon("store_line"),
    role: "admin"
  },
  {
    title: "Reportes",
    path: "/dashboard/blog",
    icon: icon("file_chart_line"),
    role: "admin"
  },
  {
    title: "Cerrar sesion",
    path: "/logout",
    icon: icon("file_chart_line"),
    role: "admin"
  },
  {
    title: "Cerrar sesion",
    path: "/logout",
    icon: icon("file_chart_line"),
    role: "user"
  },
];

export default navConfig;
