/* eslint-disable react/prop-types */
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";
import logo from "../assets/favi.png";
import { menus, subMenus } from "./Menus";

const drawerWidth = 250;

export default function LeftDrawer({
  title,
  sub,
  setTitle,
  titleIcon,
  setTitleIcon,
}) {
  const navigate = useNavigate();
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
          boxShadow: 0,
          borderBottom: ".5px solid #d6d6cd",
        }}
      >
        <Toolbar style={{ backgroundColor: "#fff", color: "#000" }}>
          <Typography
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
            variant="h6"
            noWrap
            component="div"
          >
            {titleIcon}{" "}
            <span style={{ marginLeft: "12px", marginTop: "2px" }}>
              {title}
            </span>
            <span style={{ marginLeft: "5px" }}>{sub}</span>
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
      disablePadding
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar>
          <Typography
            variant="h6"
            sx={{ mt: 2, mb: 2, display: "flex", alignItems: "center" }}
          >
            <img
              style={{ width: "30px", marginRight: "8px", marginTop: "-2px" }}
              src={logo}
              alt="logo"
            />{" "}
            MAVEKO
          </Typography>
        </Toolbar>
        <Divider />
        <div
          className="drawer"
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <List>
            {menus.map((menu) => (
              <ListItem key={menu.id}>
                <ListItemButton
                  onClick={() => {
                    setTitle(menu.name);
                    setTitleIcon(menu.icon);
                    navigate(menu.link);
                  }}
                >
                  <ListItemIcon>{menu.icon}</ListItemIcon>
                  <ListItemText sx={{ ml: -2 }} primary={menu.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <List>
            {subMenus.map((menu) => (
              <ListItem key={menu.id}>
                <ListItemButton
                  onClick={() => {
                    menu.account ? null : navigate(menu.link);
                  }}
                >
                  <ListItemIcon sx={{ color: menu.logout ? "red" : "" }}>
                    {menu.icon}
                  </ListItemIcon>
                  <ListItemText
                    sx={{ ml: -2, color: menu.logout ? "red" : "" }}
                    primary={menu.name}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
    </Box>
  );
}
