import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Map } from "@mui/icons-material";
import Logout from "../auth/Logout";

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sx"));

  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {!isMobile && (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h6" component="div">
              Apitekaz
            </Typography>
            <IconButton size="large" aria-label="map" color="warning">
              <Map />
            </IconButton>
            <Logout />
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
