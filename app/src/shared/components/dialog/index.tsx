import {ReactNode, useState} from "react";
import {AppBar, Dialog, IconButton, Toolbar, Typography} from "@mui/material";
import {SlideUp} from "../../animations";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useTheme} from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";

type TriggerFn = (fn?: () => void) => void;

interface AppDialogProps {
  trigger: ({ toggle } : { toggle: TriggerFn }) => ReactNode;
  children: ({ toggle } : { toggle: TriggerFn }) => ReactNode;
  title: string
}

export function AppDialog(props: AppDialogProps) {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const toggleOpen = () => setOpen((status) => !status);
  const triggerFn = (fn?: () => void) => {
    toggleOpen();
    fn?.();
  }
  return (
    <>
      {props.trigger({ toggle: triggerFn })}
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={toggleOpen}
        TransitionComponent={SlideUp}
      >
        {
          fullScreen && (
            <AppBar sx={{position: "relative"}}>
              <Toolbar>
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={toggleOpen}
                  aria-label="close"
                >
                  <CloseIcon/>
                </IconButton>
                <Typography sx={{ml: 2, flex: 1}} variant="h6" component="div">
                  {props.title}
                </Typography>
              </Toolbar>
            </AppBar>
          )
        }
        {
          !fullScreen && (
            <div style={{ display: 'flex', justifyContent: 'left', marginLeft: 20, marginRight: 20, marginTop: 20 }}>
              <div>
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={toggleOpen}
                  aria-label="close"
                >
                  <CloseIcon/>
                </IconButton>
              </div>
              <Typography variant="h6" component="div" style={{ margin: 0, display: 'flex', alignItems: 'center' }}>
                {props.title}
              </Typography>
            </div>
          )
        }
        <div>
          {props.children({ toggle: triggerFn })}
        </div>
      </Dialog>
    </>
  );
}
