import React, { useState, useEffect } from "react";
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
  Box
} from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import DeleteIcon from "@mui/icons-material/Delete";
import CopyIcon from "@mui/icons-material/FileCopy";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import pharmaciesData from "../map/geoPharmacies_id_all.json";
import { auth } from "../../config/firebase";
import {
  getFirestore,
  doc,
  collection,
  query,
  where,
  limit,
  onSnapshot,
  updateDoc,
  arrayRemove,
} from "firebase/firestore";

const Placeholder = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState("");
  const firestore = getFirestore();
  const likedPharmacyCollection = collection(firestore, "userLikedPharmacy");
  const [filteredData, setFilteredData] = useState([]);
  const [userDocId, setUserDocId] = useState();

  const handleShare = (pharmacy) => {
    const pharmacyInfo = `${pharmacy.name}\nAdres: ${pharmacy.address.label}\nTelefon: ${pharmacy.phoneNumber}\nEmail: ${pharmacy.email}\nApitekaz.vercel.app`;

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

  const handleDelete = async (pharmacy) => {
    try {
      const docRef = doc(firestore, "userLikedPharmacy", userDocId);
      await updateDoc(docRef, {
        ["list"]: arrayRemove(pharmacy.id),
      });

      console.log(`Deleting ${pharmacy.name}`);
    } catch (error) {
      console.error("Błąd podczas usuwania elementu z tablicy", error);
    }
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(dialogContent);
    handleClose();
  };

  useEffect(() => {
    const getUserId = async () => {
      return new Promise((resolve, reject) => {
        auth.onAuthStateChanged(function (user) {
          if (user) {
            resolve(user.uid);
          } else {
            console.log("Użytkownik jest wylogowany");
            reject("Użytkownik jest wylogowany");
          }
        });
      });
    };

    const queryLikedPharmacy = async () => {
      let userId;
      try {
        userId = await getUserId();
        console.log("ID to: " + userId);
      } catch (error) {
        console.error("Błąd podczas pobierania ID użytkownika", error);
        return;
      }

      const userLikedQuery = query(
        likedPharmacyCollection,
        where("user", "==", userId),
        limit(1)
      );

      onSnapshot(userLikedQuery, (querySnapshot) => {
        querySnapshot.forEach((snap) => {
          if (snap.exists()) {
            console.log(JSON.stringify(snap.data().list));
            const temp = snap.data().list;
            setUserDocId(snap.id);
            const result = pharmaciesData.filter((item) =>
              temp.includes(item.id)
            );
            setFilteredData(result);
          } else {
            console.log("Get doc error");
          }
        });
      });
    };
    queryLikedPharmacy();
  }, []);

  return (
    <div>
      {filteredData.map((pharmacy, index) => (
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
              <Typography>{pharmacy.address.label}</Typography>
              <Divider
                orientation="horizontal"
                flexItem
                style={{ marginTop: "10px", marginBottom: "10px" }}
              />
              <Typography>
                <LocalPhoneIcon style={{ fontSize: 18 }}/> {pharmacy.phoneNumber}
              </Typography>
              <Typography mb={1} style={{ overflowWrap: "break-word" }}>
                {pharmacy.email}{" "}
              </Typography>
              <Box display="flex" justifyContent="flex-end">
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
              </Box>
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
};

export default Placeholder;
