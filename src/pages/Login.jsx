import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Box,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AlertMessage from "../components/Alert";

const theme = createTheme();

export default function LoginScreen() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginUrl = "http://localhost:3000/comee_core/login";
  const [message, setMessage] = React.useState("");
  const [disabled, setDisabled] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [severity, setSeverity] = useState("success");

  const requestBody = {
    auth: {
      email: email,
      password: password,
    },
  };
  const handleSubmit = (e) => {
    setDisabled(true);
    e.preventDefault();
    fetch(loginUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.error) {
          setOpenAlert(true);
          setMessage("Wrong credentials try again");
          setSeverity("error");
          setDisabled(false);
        } else {
          localStorage.setItem("accessToken", data.token);
          localStorage.setItem("name", data.user.name);
          setOpenAlert(true);
          setMessage("Login Succesful!");
          setSeverity("success");
          setTimeout(() => {
            navigate("/po");
          }, 800);
          setDisabled(false);
        }
      })
      .catch((error) => {
        setOpenAlert(true);
        setMessage("Wrong credentials try again");
        setSeverity("error");
        setDisabled(false);
        console.error("Error during login:", error);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <AlertMessage
        open={openAlert}
        message={message}
        setOpen={setOpenAlert}
        severity={severity}
      ></AlertMessage>
      <Card sx={{ maxWidth: 400, margin: "0 auto", marginTop: 40 }}>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            MAVEKO
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 5 }}>
              <TextField
                label="Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                label="Password"
                variant="outlined"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                disabled={disabled}
                style={{ padding: "12px" }}
                type="submit"
                variant="contained"
                color="primary"
              >
                Login
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </ThemeProvider>
  );
}
