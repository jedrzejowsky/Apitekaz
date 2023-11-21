import React, { useState } from "react";
import { Container, TextField, Button, Typography } from "@mui/material";
import { auth } from "../../config/firebase"; // Firebase config file

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await auth.signInWithEmailAndPassword(email, password);
      // Jeśli logowanie się powiedzie, możesz dodać odpowiednie przekierowanie lub akcje
      console.log("Zalogowano pomyślnie!");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Logowanie
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={handleLogin}>
        <TextField
          type="email"
          label="Adres email"
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
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Zaloguj się
        </Button>
      </form>
    </Container>
  );
};

export default LoginForm;
