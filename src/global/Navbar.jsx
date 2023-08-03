import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import logo from "../assets/express_logo.png";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Fragment, useState } from "react";
import {
  Badge,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useSelector } from "react-redux";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import {
  HowToRegOutlined,
  LoginOutlined,
  Logout,
  PersonOutlined,
} from "@mui/icons-material";
import AlertBar from "../components/AlertBar";

function Navbar() {
  // MOBILE MENU HANDLERS
  const [state, setState] = useState(false);
  const products = useSelector((state) => state.cart.products);
  const { handleSetToken, isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const [alert, setAlert] = useState({
    message: "",
    active: false,
    type: "success",
  });

  // HANDLE USER POP UP MENU
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { data: categories } = useFetch(`categories`);

  // HANDLE MOBILE MENU
  const toggleDrawer = (currState) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState(currState);
  };

  const handleLogout = () => {
    window.localStorage.removeItem("JWT_TOKEN");
    handleSetToken(JSON.parse(localStorage.getItem("JWT_TOKEN")));
    setAlert({
      ...alert,
      active: true,
      message: "Logged out successfully!",
    });
    location.reload();
    navigate("/");
  };
  return (
    <Box>
      {alert.active && (
        <AlertBar
          alert={alert}
          setAlert={setAlert}
          // reload={true}
        />
      )}
      <AppBar
        position="static"
        elevation={0}
        color="brown"
        sx={{
          boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Box className="">
              <Box style={{ display: "flex", alignItems: "center" }}>
                <Link to="/">
                  <img style={{ width: "70px" }} src={logo} />
                </Link>
                <Link to="/">
                  <Typography
                    variant="a3"
                    ml={1}
                    sx={{ fontSize: { xs: "20px", md: "24px" } }}
                  >
                    Express Luxury
                  </Typography>
                </Link>
              </Box>
            </Box>

            <Box>
              {!isLoggedIn ? (
                <Fragment>
                  <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                  >
                    <AccountCircleOutlinedIcon
                      color="primary"
                      sx={{
                        fontSize: {
                          xs: "1.3rem",
                          sm: "1.5rem",
                          md: "1.5rem",
                        },
                      }}
                    />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    transformOrigin={{ horizontal: "center", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                    disableScrollLock={true}
                  >
                    <Link to="sign_up">
                      <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                          <PersonOutlined fontSize="medium" />
                        </ListItemIcon>
                        Register
                      </MenuItem>
                    </Link>
                    <Link to="/sign_in">
                      <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                          <LoginOutlined fontSize="small" />
                        </ListItemIcon>
                        Login
                      </MenuItem>
                    </Link>
                  </Menu>
                </Fragment>
              ) : (
                <Fragment>
                  <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                  >
                    <HowToRegOutlined
                      color="primary"
                      sx={{
                        fontSize: {
                          xs: "1.3rem",
                          sm: "1.5rem",
                          md: "1.5rem",
                        },
                        border: "solid 2px primary",
                      }}
                    />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    transformOrigin={{ horizontal: "center", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                    disableScrollLock={true}
                  >
                    <Link to="/dashboard">
                      <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                          <PersonOutlined fontSize="medium" />
                        </ListItemIcon>
                        My account
                      </MenuItem>
                    </Link>
                    <MenuItem onClick={handleLogout}>
                      <ListItemIcon>
                        <Logout fontSize="small" />
                      </ListItemIcon>
                      Logout
                    </MenuItem>
                  </Menu>
                </Fragment>
              )}

              <Link to={"/cart"}>
                <IconButton sx={{ p: 0 }}>
                  <Badge color="primary" badgeContent={products.length}>
                    <ShoppingBagOutlinedIcon
                      color="primary"
                      sx={{
                        fontSize: { xs: "1.3rem", sm: "1.5rem", md: "1.5rem" },
                      }}
                    />
                  </Badge>
                </IconButton>
              </Link>
              <IconButton
                onClick={toggleDrawer(true)}
                sx={{ p: 0, ml: 1, display: { xs: "", md: "none" } }}
              >
                <MenuOutlinedIcon
                  color="primary"
                  sx={{
                    fontSize: { xs: "1.3rem", sm: "1.5rem", md: "1.5rem" },
                  }}
                />
              </IconButton>
              <Drawer
                anchor={"right"}
                open={state}
                onClose={toggleDrawer(false)}
              >
                <Box
                  sx={{ width: 250 }}
                  role="presentation"
                  onClick={toggleDrawer(false)}
                  onKeyDown={toggleDrawer(false)}
                >
                  {categories && (
                    <List>
                      <Link to="/">
                        <ListItem disablePadding>
                          <ListItemButton>
                            <ListItemText
                              sx={{ textTransform: "capitalize" }}
                              primary="Home"
                            />
                          </ListItemButton>
                        </ListItem>
                      </Link>
                      <Link reloadDocument to={`categories/new-arrivals`}>
                        <ListItem disablePadding>
                          <ListItemButton>
                            <ListItemText
                              sx={{ textTransform: "capitalize" }}
                              primary="New Arrivals"
                            />
                          </ListItemButton>
                        </ListItem>
                      </Link>
                      {categories.map((category, index) => (
                        <Link
                          reloadDocument
                          to={`categories/${category.attributes.slug}`}
                          key={index}
                        >
                          <ListItem disablePadding>
                            <ListItemButton>
                              <ListItemText
                                sx={{ textTransform: "capitalize" }}
                                primary={category.attributes.title}
                              />
                            </ListItemButton>
                          </ListItem>
                        </Link>
                      ))}
                    </List>
                  )}
                </Box>
              </Drawer>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <AppBar
        position="static"
        elevation={0}
        color="primary"
        sx={{
          boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
          display: { xs: "none", md: "block" },
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            minHeight: "50px !important",
          }}
        >
          {categories && (
            <Box
              sx={{
                display: {
                  xs: "none",
                  md: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                },
              }}
            >
              <Link to="/">
                <Button
                  sx={{
                    color: "inherit",
                    display: "block",
                    fontSize: "0.8rem",
                    textTransform: "capitalize",
                    "&:hover": {
                      backgroundColor: "#333 !important",
                      color: "#fff",
                    },
                  }}
                >
                  Home
                </Button>
              </Link>
              <Link to={`categories/new-arrivals`}>
                <Button
                  sx={{
                    color: "inherit",
                    display: "block",
                    fontSize: "0.8rem",
                    textTransform: "capitalize",
                    "&:hover": {
                      backgroundColor: "#333 !important",
                      color: "#fff",
                    },
                  }}
                >
                  New Arrivals
                </Button>
              </Link>
              {categories.map((category, i) => (
                <Link key={i} to={`categories/${category.attributes.slug}`}>
                  <Button
                    sx={{
                      color: "inherit",
                      display: "block",
                      fontSize: "0.8rem",
                      textTransform: "capitalize",
                      "&:hover": {
                        backgroundColor: "#333 !important",
                        color: "#fff",
                      },
                    }}
                  >
                    {category.attributes.title}
                  </Button>
                </Link>
              ))}
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
export default Navbar;
