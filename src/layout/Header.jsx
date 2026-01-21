import { AppBar, Box, Button, Toolbar } from "@mui/material";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

function Header() {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: "background.default",
        width: "100%",
        borderBottom: "2px solid",
        borderColor: "divider",
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          justifyContent: "space-between",
          px: { xs: 2, sm: 2, md: 3 },
          py: { md: 2 },
        }}
      >
        <Box
          component="img"
          src={logo}
          alt="Booking logo"
          sx={{ height: 32 }}
        />
        <Box
          sx={{
            display: "flex",
            gap: 2,
          }}
        >
          <Button
            variant="contained"
            sx={{
              bgcolor: "primary.main",
              px: 3,
              height: 40,
              "&:hover": {
                bgcolor: "action.hover",
              },
            }}
            component={Link}
            to={"/"}
          >
            Home
          </Button>
          <Button
            variant="contained"
            sx={{
              bgcolor: "primary.main",
              px: 3,
              height: 40,
              "&:hover": {
                bgcolor: "action.hover",
              },
            }}
            component={Link}
            to={"/about"}
          >
            About
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
