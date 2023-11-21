import React, { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";

const RegistrationContainer = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegistration = () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    // Tutaj możesz dodać logikę rejestracji za pomocą Firebase lub innej usługi
    // Na przykład: firebase.auth().createUserWithEmailAndPassword(email, password)
    // Odpowiednio obsłuż błędy i sukces rejestracji
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Typography variant="h5" gutterBottom>
        Registration
      </Typography>
      <Container
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 20,
          width: 300,
        }}
        onSubmit={(e) => {
          e.preventDefault();
          handleRegistration();
        }}
      >
        <TextField
          type="email"
          label="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <TextField
          type="password"
          label="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Register
        </Button>
        {error && <Typography color="error">{error}</Typography>}
      </Container>
    </Container>
  );
};

export default RegistrationContainer;
