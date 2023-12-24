import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase";
import { Button, Typography, TextField } from "@mui/material";
import Center from "../utils/Center";

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegistration = async () => {
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
      console.log("User registered:", user);
      navigate("/");
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
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      <Button
        variant="contained"
        disabled={disabled}
        onClick={handleRegistration}
      >
        Register
      </Button>
      <Typography sx={{ mt: 2 }} color={"red"}>
        {errorMessage}
      </Typography>
    </Center>
  );
};

export default RegistrationForm;
