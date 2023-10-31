import { Box, Stack, AppBar, Toolbar, IconButton } from '@mui/material';
import Iconify from '../../../components/iconify';
import { styled } from "@mui/material/styles";
import { bgBlur } from "../../../utils/cssStyles.ts";

const NAV_WIDTH = 280;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const StyledAppBar = styled(AppBar)(({ theme }) => ({
    ...bgBlur({ color: theme.palette.background.default }),
    boxShadow: 'none',
    minHeight: 50,
    [theme.breakpoints.up('lg')]: {
        width: `calc(100% - ${NAV_WIDTH + 1}px)`,
    },
}));


export default function Header({ onOpenNav }) {
  return (
    <StyledAppBar>
      <Toolbar>
        <IconButton
          onClick={onOpenNav}
          sx={{
            mr: 1,
            color: 'text.primary',
            display: { lg: 'none' },
          }}
        >
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>

        <Box sx={{ flexGrow: 1 }} />

        <Stack
          direction="row"
          alignItems="center"
          spacing={{
            xs: 0.5,
            sm: 1,
          }}
        >
        </Stack>
      </Toolbar>
    </StyledAppBar>
  );
}