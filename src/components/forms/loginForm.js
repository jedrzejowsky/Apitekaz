import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase";
import { Button, Typography, TextField } from "@mui/material";
import Center from "../utils/Center";

const LoginForm = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailAndPasswordSignIn = async () => {
    try {
      setDisabled(true);
      await signInWithEmailAndPassword(auth, email, password);
      setDisabled(false);
      console.info("TODO: navigate to authenticated screen");
      navigate("/map");
    } catch (error) {
      setErrorMessage(error.code + ": " + error.message);
      setDisabled(false);
    }
  };

  return (
    <Center height={"auto"}>
      <TextField
        type="email"
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        type="password"
        label="Hasło"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      <Button
        variant="contained"
        disabled={disabled}
        onClick={handleEmailAndPasswordSignIn}
      >
        Zaloguj
      </Button>
      <Typography sx={{ mt: 2 }} color={"red"}>
        {errorMessage}
      </Typography>
    </Center>
  );
};

export default LoginForm;
