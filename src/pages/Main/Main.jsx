import { Box, Container, Stack } from "@mui/material";
import BookingForm from "./BookingForm";
import HeroText from "./HeroText";

function Main() {
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
          <BookingForm />
          <HeroText />
        </Container>
      </Box>
    </>
  );
}

export default Main;
