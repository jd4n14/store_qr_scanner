import { NavLink as RouterLink } from 'react-router-dom';
import { Box, List, ListItemText, type BoxProps } from '@mui/material';
import { StyledNavItem, StyledNavItemIcon } from './styles';

type NavListProps = {
  data: NavItemProps[];
} & BoxProps

export default function NavSection({ data = [], ...other }: NavListProps) {
  return (
    <Box {...other}>
      <List disablePadding sx={{ p: 1 }}>
        {data.map((item) => (
          <NavItem key={item.title} item={item} />
        ))}
      </List>
    </Box>
  );
}

interface NavItemProps {
  title: string;
  path: string;
  icon: JSX.Element;
  info?: JSX.Element;
}

function NavItem({ item }: { item: NavItemProps }) {
  const { title, path, icon, info } = item;

  return (
    <StyledNavItem
      component={RouterLink}
      to={path}
      sx={{
        '&.active': {
          color: 'text.primary',
          bgcolor: 'action.selected',
          fontWeight: 'fontWeightBold',
        },
      }}
    >
      <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>

      <ListItemText disableTypography primary={title} />

      {info && info}
    </StyledNavItem>
  );
}