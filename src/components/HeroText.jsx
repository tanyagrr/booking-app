import { Box, Stack, Typography } from "@mui/material";

function HeroText() {
  return (
    <Stack spacing={3} alignItems="flex-start">
      <Typography
        variant="h3"
        sx={{
          fontWeight: 700,
          lineHeight: 1.1,
        }}
      >
        Travel With{" "}
        <Box component="span" sx={{ color: "primary.main" }}>
          Booking
        </Box>
      </Typography>

      <Typography
        variant="body1"
        sx={{
          color: "text.secondary",
          lineHeight: 1.8,
        }}
      >
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </Typography>
    </Stack>
  );
}

export default HeroText;
