import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

function Hotels() {
  const [searchParams] = useSearchParams();
  const destination = searchParams.get("destination");

  const hotels = useSelector((s) => s.hotels);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "HOTELS_FETCH_REQUESTED", payload: { destination } });
  }, [dispatch, destination]);

  return (
    <Box
      id="about"
      sx={{
        backgroundColor: "background.default",
        width: "100%",
        mt: 4,
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          mb: 4,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 600,
            lineHeight: 1.1,
            mb: 1,
          }}
        >
          Hotels
        </Typography>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
          }}
        >
          Found: {hotels.length}
        </Typography>
        <Grid
          container
          spacing={4}
          justifyContent={{ xs: "center", md: "flex-start" }}
        >
          {hotels.map((hotel) => (
            <Grid key={hotel.id} size={{ xs: 10, sm: 6, md: 4 }}>
              <Card
                sx={{
                  width: "100%",
                  height: 320,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardMedia component="img" height="150" alt={hotel.title} />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    sx={{ fontWeight: 600 }}
                    variant="h5"
                    gutterBottom
                  >
                    {hotel.name}
                  </Typography>
                  <Typography color="text.secondary" variant="body2">
                    adress: {hotel.address}
                  </Typography>
                  <Typography color="text.secondary" variant="body2">
                    city: {hotel.city}, state: {hotel.state}, country code:{" "}
                    {hotel.country_code}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default Hotels;
