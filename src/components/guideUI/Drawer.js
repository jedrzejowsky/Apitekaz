import React, { useState } from "react";
import { styled } from "@mui/system";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Tabs from "./Tabs";

const useStyles = styled({
  drawer: {
    width: "50%",
    zIndex: 4000,
  },
  arrowButton: {
    position: "fixed",
    right: 0,
    top: "50%",
    zIndex: 4000,
    backgroundColor: "white",
  },
  icon: {
    fontSize: "3rem",
    color: "red",
  },
});

export default function MyComponent() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ zIndex: 4000 }}>
      {!open && (
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="end"
          className={classes.arrowButton}
        >
          <ChevronRightIcon className={classes.icon} />
        </IconButton>
      )}
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={open}
      >
        {open && (
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon className={classes.icon} />
          </IconButton>
        )}
        <Tabs />
      </Drawer>
    </div>
  );
}
