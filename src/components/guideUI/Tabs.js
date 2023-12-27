import * as React from "react";
import { Tab, Tabs, Box, Divider, Typography } from "@mui/material";
import { styled, useTheme } from "@mui/system";
import { auth } from "../../config/firebase";
import Logout from "../auth/Logout";
import Placeholder from "./Placeholder";

const Root = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  maxWidth: "600px", // Maksymalna szerokość
  margin: "0 auto", // Wyśrodkowanie
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
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const currentUser = auth.currentUser;

  return (
    <Root>
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
        <Placeholder />
      </TabPanel>
      <TabPanel value={value} index={1} dir={theme.direction}>
        <Typography variant="h6">Hello</Typography>
        {currentUser && <Typography> #{currentUser.email}</Typography>}
        <Divider />
        <Logout />
      </TabPanel>
    </Root>
  );
}
