import * as React from "react";
import {
  Typography,
  Divider,
  Button,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import DeleteIcon from "@mui/icons-material/Delete";
import FindIcon from "@mui/icons-material/LocationOn";

import CopyIcon from "@mui/icons-material/FileCopy";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import pharmaciesData from "../map/geoPharmacies_0_800.json";

export default function Placeholder() {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [dialogContent, setDialogContent] = React.useState("");

  // pierwsze 5 aptek
  const pharmacies = pharmaciesData.slice(0, 5);

  const handleShare = (pharmacy) => {
    const pharmacyInfo = `
      Nazwa: ${pharmacy.name}
      Adres: ${pharmacy.address.label}
      Telefon: ${pharmacy.phoneNumber}
      Email: ${pharmacy.email}
      Apitekaz.vercel.app
    `;

    if (navigator.share) {
      navigator.share({
        title: "Udostępnij aptekę",
        text: pharmacyInfo,
      });
    } else {
      setDialogContent(pharmacyInfo);
      setDialogOpen(true);
    }
  };

  const handleDelete = (pharmacy) => {
    // logikę usuwania apteki
    console.log(`Deleting ${pharmacy.name}`);
  };

  const handleFind = (pharmacy) => {
    // logikę wskazania apteki na mapie
    console.log(`Finding ${pharmacy.name}`);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(dialogContent);
    handleClose();
  };

  return (
    <div>
      <Typography variant="h6">Likes</Typography>
      {pharmacies.map((pharmacy, index) => (
        <Paper key={index} elevation={3} style={{ marginBottom: "10px" }}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="h7">{pharmacy.name}</Typography>
              {pharmacy.name && (
                <Divider
                  orientation="vertical"
                  flexItem
                  style={{ marginLeft: "10px", marginRight: "10px" }}
                />
              )}
              <Typography>
                {pharmacy.address.city}, {pharmacy.address.street}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{pharmacy.phoneNumber}</Typography>
              <Typography>{pharmacy.email}</Typography>
              <Typography>{pharmacy.address.label}</Typography>
              <Button
                startIcon={<ShareIcon />}
                onClick={() => handleShare(pharmacy)}
              >
                Udostępnij
              </Button>
              <Button
                startIcon={<DeleteIcon />}
                onClick={() => handleDelete(pharmacy)}
              >
                Usuń
              </Button>
              <Button
                startIcon={<FindIcon />}
                onClick={() => handleFind(pharmacy)}
              >
                Znajdź
              </Button>
            </AccordionDetails>
          </Accordion>
        </Paper>
      ))}
      <Dialog open={dialogOpen} onClose={handleClose}>
        <DialogTitle>{"Kopiuj do schowka"}</DialogTitle>
        <DialogContent>
          <DialogContentText>{dialogContent}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Anuluj</Button>
          <Button startIcon={<CopyIcon />} onClick={handleCopy}>
            Kopiuj
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
