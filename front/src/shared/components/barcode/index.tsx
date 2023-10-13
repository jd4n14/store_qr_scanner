import { AppBar, Dialog, IconButton, Toolbar, Typography } from "@mui/material";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { SlideUp } from "../../animations";

import { Result, useZxing } from "react-zxing";

const BarcodeScanner = ({
  onResult,
}: {
  onResult: (result: Result) => void;
}) => {
  const { ref } = useZxing({
    onDecodeResult(result) {
      onResult(result);
    },
  });

  return (
    <video
      ref={ref}
      style={{
        width: "100vw",
        height: "100vh",
        objectFit: "cover",
        transform: "scale(1.2)",
      }}
    />
  );
};

export function BarcodeReader({
  children,
  onScan,
}: {
  children: (status: boolean, toggle: () => void) => React.ReactNode;
  onScan: (result: string) => void;
}) {
  const [open, setOpen] = useState(false);

  const handleUpdate = (result: Result) => {
    onScan(result.getText());
    toggleOpen();
  };
  const toggleOpen = () => setOpen((status) => !status);
  return (
    <>
      {children(open, toggleOpen)}
      <Dialog
        fullScreen
        open={open}
        onClose={toggleOpen}
        TransitionComponent={SlideUp}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={toggleOpen}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Escanear codigo QR
            </Typography>
          </Toolbar>
        </AppBar>
        <div>
          <BarcodeScanner onResult={handleUpdate} />
        </div>
      </Dialog>
    </>
  );
}
