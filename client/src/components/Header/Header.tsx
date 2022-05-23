import React from "react";
import { Link } from "react-router-dom";

import { AppBar, Toolbar, IconButton, Button, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import { useAppSelector } from "hooks/reduxHooks";

const Header = () => {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <header>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>

          {user ? (
            <Typography variant="subtitle1" component="p" sx={{ flexGrow: 0 }}>
              {user.username}
            </Typography>
          ) : (
            <Button color="inherit">
              <Link to="/login">Login</Link>
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </header>
  );
};

export default Header;
