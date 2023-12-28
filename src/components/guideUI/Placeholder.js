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
import pharmaciesData from "../map/geoPharmacies_id_all.json";
import { auth, Firebase } from "../../config/firebase";
import {
  addDoc,
  getFirestore,
  doc,
  collection,
  query,
  where,
  limit,
  getDocs,
  onSnapshot,
  updateDoc,
  arrayRemove,
} from "firebase/firestore";

export default function Placeholder() {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [dialogContent, setDialogContent] = React.useState("");
  const firestore = getFirestore();
  const likedPharmacyCollection = collection(firestore, "userLikedPharmacy");
  const [filteredData, setFilteredData] = React.useState([]);
  const [userDocId, setUserDocId] = React.useState();

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

  const handleFind = (pharmacy) => {
    console.log(`Finding ${pharmacy.name}`);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(dialogContent);
    handleClose();
  };

  React.useEffect(() => {
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
      let userId = await getUserId();
      console.log("ID to: " + userId);

      const userLikedQuery = query(
        likedPharmacyCollection,
        where("user", "==", userId),
        limit(1)
      );

      // const querySnapshot = await getDocs(userLikedQuery);
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
      <Typography variant="h6">Likes</Typography>
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
              <Typography>tel. {pharmacy.phoneNumber}</Typography>
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
