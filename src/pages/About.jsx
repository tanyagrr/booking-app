import { Box, Container, Stack, Typography } from "@mui/material";

function About() {
  return (
    <>
      <Box
        id="about"
        sx={{
          backgroundColor: "background.default",
          width: "100%",
          mt: 4,
        }}
      >
        <Container
          maxWidth="md"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <Stack>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 600,
                lineHeight: 1.1,
                mb: 1.5,
              }}
            >
              About
            </Typography>

            <Typography
              variant="body2"
              sx={{
                color: "text.primary",
                lineHeight: 1.8,
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Typography>
          </Stack>
        </Container>
      </Box>
    </>
  );
}

export default About;
