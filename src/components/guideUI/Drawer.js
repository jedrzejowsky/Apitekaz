import * as React from "react";
import { useState } from "react";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Tabs from "./Tabs";
import { styled } from "@mui/system";

const DrawerStyled = styled(Drawer)(({ theme }) => ({
  width: "50%",
  zIndex: 4000,
}));

const IconButtonStyled = styled(IconButton)(({ theme }) => ({
  position: "fixed",
  right: 0,
  top: "50%",
  zIndex: 4000,
  backgroundColor: "white",
}));

const ChevronRightIconStyled = styled(ChevronRightIcon)(({ theme }) => ({
  fontSize: "3rem",
  color: "red",
}));

const ChevronLeftIconStyled = styled(ChevronLeftIcon)(({ theme }) => ({
  fontSize: "3rem",
  color: "red",
}));

export default function MyComponent() {
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
        <IconButtonStyled
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="end"
        >
          <ChevronRightIconStyled />
        </IconButtonStyled>
      )}
      <DrawerStyled variant="persistent" anchor="right" open={open}>
        {open && (
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIconStyled />
          </IconButton>
        )}
        <Tabs />
      </DrawerStyled>
    </div>
  );
}
