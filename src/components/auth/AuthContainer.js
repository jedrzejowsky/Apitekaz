import { useState } from "react";
import { signInWithPopup, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, Providers } from "../../config/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore"; // Dodaj te importy
import { Button, Typography } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import Center from "../utils/Center";
import { getFirestore, getDoc, setDoc, doc } from "firebase/firestore";

const AuthContainer = (props) => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [disabled, setDisabled] = useState(false);
  const firestore = getFirestore();

  const handleRegistration = async (email, password) => {
    // Dodaj parametry email i hasło
    try {
      setDisabled(true);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setDisabled(false);
      console.info("TODO: Navigate to authenticated screen after registration");
      const user = userCredential.user;
      const userRef = doc(auth, "userLikedPharmacy", userCredential.user.uid);
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
      navigate("/map", { replace: true });
    } catch (error) {
      setErrorMessage(error.code + ": " + error.message);
      setDisabled(false);
    }
  };

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
        Kontynuuj przez konto Google{" "}
      </Button>
      <Typography sx={{ mt: 2 }} color={"red"}>
        {errorMessage}
      </Typography>
    </Center>
  );
};

export default AuthContainer;
