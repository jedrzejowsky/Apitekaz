// Tabs.js
import React from "react";
import styled from '@emotion/styled';
import { Tab, Tabs, Box, Typography, Button, Divider } from "@mui/material";
import { useTheme } from "@mui/system";
import { auth } from "../../config/firebase";
import Logout from "../auth/Logout";

const useStyles = styled((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: "100%",
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

export default function FullWidthTabs() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const currentUser = auth.currentUser;

  return (
    <div className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
      >
        <Tab label="Likes" />
        <Tab label="Profile" />
      </Tabs>
      <TabPanel value={value} index={0} dir={theme.direction}>
        <Typography variant="h6">Likes</Typography>
        <Typography>This is the Likes tab.</Typography>
      </TabPanel>
      <TabPanel value={value} index={1} dir={theme.direction}>
        <Typography variant="h6">Hello</Typography>
        {currentUser && <Typography> #{currentUser.email}</Typography>}
        <Divider />
        <Logout />
      </TabPanel>
    </div>
  );
}
