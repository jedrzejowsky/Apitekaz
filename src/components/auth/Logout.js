import React, { useState } from "react";
import { IconButton } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase";

const Logout = ({ navigateTo = "/login" }) => {
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
        <ExitToAppIcon />
      </IconButton>
    </div>
  );
};

export default Logout;
