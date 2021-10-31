import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  MenuItem,
  Menu,
  Badge,
  IconButton,
  Button,
  Switch,
} from "@material-ui/core";

import NotificationsIcon from "@material-ui/icons/Notifications";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import Sidebar from "../Sidebar/Sidebar";

import axios from "axios";

const useStyles = makeStyles({
  grow: {
    flexGrow: 1,
  },
  root: {
    backgroundColor: "green",
    position: "static",
  },
  menuButton: {
    padding: "6px 8px",
    marginRight: "10px",
  },
  navLink: { textDecoration: "none", color: "inherit" },
});

const Navbar = (props) => {
  const [data, setData] = React.useState(null);
  const [badgeContent, setBadgeContent] = React.useState();
  React.useEffect(() => {
    setInterval(
      axios
        .get("http://3.35.250.22:8080/Shop-0.0.1-SNAPSHOT/purchase", {
          headers: {
            Authorization: "Bearer " + props.cookies.Authorization,
          },
        })
        .then((response) => {
          setData(response.data);
          setBadgeContent(response.data.length);
        })
        .catch((e) => {
          console.log(e);
        }),
      79200000
    );
  }, [props.cookies.Authorization]);

  const classes = useStyles();

  const [sidebarState, setSidebarState] = React.useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleDrawerToggle = () => {
    setSidebarState(!sidebarState);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={(classes.grow, classes.navbar)}>
      <AppBar className={classes.root}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            className={classes.menuButton}
            onClick={handleDrawerToggle}
          >
            <Badge badgeContent={badgeContent} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          {props.routes.map((prop, key) => {
            return (
              <NavLink
                to={prop.layout + prop.path}
                className={classes.navLink}
                key={key}
              >
                <Button color="inherit" size="small">
                  {prop.name}
                </Button>
              </NavLink>
            );
          })}

          <div className={classes.grow} />

          <IconButton edge="end" color="inherit" onClick={handleMenuOpen}>
            <PermIdentityIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Sidebar
        openState={sidebarState}
        handleDrawerToggle={handleDrawerToggle}
        cookies={props.cookies}
        data={data}
      />
      <Menu
        anchorEl={anchorEl}
        //anchorOrigin={{ vertical: "top", horizontal: "right" }}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem style={{ padding: "6px" }}>
          <p
            style={{ fontSize: "14px", margin: "0px" }}
            onClick={() => {
              props.logout("Authorization", { path: "/" });
            }}
          >
            로그아웃
          </p>
        </MenuItem>
        <MenuItem style={{ padding: "6px" }}>
          <p style={{ fontSize: "14px", margin: "0px 8px 0px 0px" }}>
            알림 설정
          </p>
          <Switch checked={true} name="checkedB" color="primary" size="small" />
        </MenuItem>
      </Menu>
    </div>
  );
};

export default Navbar;
