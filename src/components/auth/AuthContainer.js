import { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, Providers } from "../../config/firebase";
import { Button, Typography } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import Center from "../utils/Center";
import { getFirestore, getDoc, setDoc, doc } from "firebase/firestore";

const AuthContainer = (props) => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [disabled, setDisabled] = useState(false);
  const firestore = getFirestore();

  const signInWithGoogle = () => {
    setDisabled(true);
    signInWithPopup(auth, Providers.google)
      .then(async (userCredential) => {
        setDisabled(false);
        const user = userCredential.user;
        const userRef = doc(
          firestore,
          "userLikedPharmacy",
          userCredential.user.uid
        );
        const createLikedDoc = await getDoc(userRef);
        if (!createLikedDoc.exists()) {
          try {
            await setDoc(userRef, {
              list: [],
              user: userCredential.user.uid,
            });
          } catch (error) {
            console.error("Error while creating user document", error);
          }
        }
        console.log("User registered:", user);
        console.info("TODO: navigate to authenticated screen");
        navigate("/map", { replace: true });
      })
      .catch((error) => {
        setErrorMessage(error.code + ": " + error.message);
        setDisabled(false);
      });
  };

  return (
    <Center height={"auto"}>
      <Button
        startIcon={<GoogleIcon />}
        size="large"
        disabled={disabled}
        variant="contained"
        onClick={signInWithGoogle}
      >
        Kontynuuj poprzez konto google{" "}
      </Button>
      <Typography sx={{ mt: 2 }} color={"red"}>
        {errorMessage}
      </Typography>
    </Center>
  );
};

export default AuthContainer;
