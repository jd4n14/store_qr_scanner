import { AppBar, Dialog, IconButton, Toolbar, Typography, styled } from "@mui/material";
import { useRef, useState, ReactNode } from "react";
import CloseIcon from "@mui/icons-material/Close";
import PrintIcon from "@mui/icons-material/Print";
import Download from "@mui/icons-material/Download";
import html2canvas from "html2canvas";

import { SlideUp } from "../../animations";
import QRCode from "react-qr-code";

const printQR = (element) => {
  if (!element) return false;
  const toPrint = window.open("", "PRINT", "height=400,width=600");
  if (!toPrint) return false;

  toPrint.document.write("<html><head>");
  toPrint.document.write(`
    <style>
      @media print {
        @page {
          margin: 0;
        }
        body {
          margin: 1.6cm;
        }
      }
    </style>
  `);
  toPrint.document.write("</head><body >");

  toPrint.document.write(element.innerHTML);
  toPrint.document.write("</body></html>");

  toPrint.print();
  toPrint.close();

  return true;
};
const downloadQR = async (element, name) => {
  if (!element) return false;
  const canvas = await html2canvas(element);
  const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
  const downloadLink = document.createElement("a");
  downloadLink.href = pngUrl;
  downloadLink.download = name + ".png";
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
  return true;
};

const QrContainer = styled("div")(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  padding: theme.spacing(2),
  justifyContent: "center",
  alignContent: "center",
  alignItems: "center",
}));

type ChildrenFn = ({ status, toggle }: { status: boolean; toggle: () => void }) => ReactNode;

interface ShowQRProps {
  children: ChildrenFn;
  title?: string;
  value: string | number;
}

export function ShowQR({ children, title = "Mostrar QR", value }: ShowQRProps) {
  const [open, setOpen] = useState(false);
  const printElement = useRef(null);

  const toggleOpen = () => setOpen((status) => !status);
  return (
    <>
      {children({ status: open, toggle: toggleOpen })}
      <Dialog fullScreen open={open} onClose={toggleOpen} TransitionComponent={SlideUp}>
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={toggleOpen} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {title}
            </Typography>
            {/* print icon button */}
            <IconButton color="inherit" aria-label="print" onClick={() => printQR(printElement.current)}>
              <PrintIcon />
            </IconButton>
            <IconButton
              color="inherit"
              aria-label="download"
              onClick={() => downloadQR(printElement.current, `${value}_${new Date().getTime()}`)}
            >
              <Download />
            </IconButton>
          </Toolbar>
        </AppBar>
        <QrContainer>
          <div ref={printElement}>
            <QRCode value={String(value)} />
          </div>
        </QrContainer>
      </Dialog>
    </>
  );
}
