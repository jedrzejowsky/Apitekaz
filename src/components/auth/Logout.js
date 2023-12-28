import React, { useState } from "react";
import { IconButton, Typography } from "@mui/material";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase";

const Logout = ({ navigateTo = "/" }) => {
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    setDisabled(true);
    signOut(auth)
      .then(() => {
        navigate(navigateTo);
      })
      .catch((error) => {
        console.error(error);
        setDisabled(false);
      });
  };

  return (
    <div>
      <IconButton disabled={disabled} onClick={logout} aria-label="Logout">
        <Typography variant="h6" color="secondary">
          Logout
        </Typography>{" "}
        {/* Zmieniamy variant na "h6" i color na "secondary" */}
      </IconButton>
    </div>
  );
};

export default Logout;
