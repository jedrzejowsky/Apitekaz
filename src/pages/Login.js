import { Box, Tab, Tabs } from "@mui/material";
import React from "react";
import { useSearchParams } from "react-router-dom";
import AuthContainer from "../components/auth/AuthContainer";
import Center from "../components/utils/Center";
import LoginForm from "../components/forms/loginForm";
import RegistrationForm from "../components/forms/registrationForm";

import backgroundImage from "../assets/background1.png";

const tabIdToURL = {
  0: "login",
  1: "register",
};

const Login = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const action = searchParams.get("action") || "login";
  let indexFromUrl = 0;
  if (action === "register") {
    indexFromUrl = 1;
  }

  const [value, setValue] = React.useState(indexFromUrl);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    const action = tabIdToURL[newValue];
    setSearchParams({ action });
  };

  return (
    <Center height={90}>
      <Box
        display={"flex"}
        alignItems={"center"}
        flexDirection={"column"}
        boxShadow={2}
        margin={3}
        sx={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Box sx={{ borderBottom: 1, borderColor: "divider", width: "100%" }}>
          <Tabs value={value} onChange={handleChange} variant="fullWidth">
            <Tab sx={{ px: { lg: 20, xs: 6 } }} label="Login" />
            <Tab sx={{ px: { lg: 16, xs: 6 } }} label="Rejestracja" />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <LoginForm />
          <AuthContainer />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <RegistrationForm />
          <AuthContainer />
        </TabPanel>
      </Box>
    </Center>
  );
};

const TabPanel = ({ children, value, index }) => {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <>{children}</>
        </Box>
      )}
    </div>
  );
};

export default Login;
