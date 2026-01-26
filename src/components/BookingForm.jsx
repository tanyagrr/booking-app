import {
  Stack,
  TextField,
  MenuItem,
  Button,
  Box,
  FormHelperText,
} from "@mui/material";
import { Formik } from "formik";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../api/client";

const validate = (values) => {
  const errors = {};

  if (!values.destination) {
    errors.destination = "Please choose a destination";
  }

  return errors;
};

function BookingForm() {
  const [destinations, setDestinations] = useState([]);

  async function fetchDestinationsServer() {
    const response = await api.get("/destination");
    return response.data;
  }

  useEffect(() => {
    (async () => {
      const data = await fetchDestinationsServer();
      setDestinations(data);
    })();
  }, []);

  const digitsOnly = (val) => String(val ?? "").replace(/[^\d]/g, "");

  const navigate = useNavigate();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Formik
        initialValues={{
          destination: "",
          checkIn: null,
          checkOut: null,
          adults: "",
          children: "",
        }}
        validate={validate}
        validateOnMount
        onSubmit={(values) => {
          navigate(
            `/hotels?destination=${encodeURIComponent(values.destination)}`,
          );
        }}
      >
        {({
          values,
          handleChange,
          handleSubmit,
          setFieldValue,
          errors,
          touched,
          isValid,
          setFieldTouched,
        }) => (
          <Box component="form" onSubmit={handleSubmit} sx={{ py: 2 }}>
            <Stack spacing={0.75}>
              <Stack direction="row" spacing={2} alignItems="center">
                <TextField
                  select
                  size="small"
                  name="destination"
                  value={values.destination}
                  onChange={handleChange}
                  onBlur={() => setFieldTouched("destination", true)}
                  aria-label="Destination"
                  error={touched.destination && Boolean(errors.destination)}
                  sx={{
                    minWidth: 200,
                    "& .MuiOutlinedInput-root": { borderRadius: 1.5 },
                  }}
                  slotProps={{
                    select: {
                      displayEmpty: true,
                      renderValue: (value) =>
                        value ? (
                          value
                        ) : (
                          <Box
                            component="span"
                            sx={{ color: "text.secondary" }}
                          >
                            Destination
                          </Box>
                        ),
                    },
                  }}
                >
                  <MenuItem value="">Destination</MenuItem>
                  {destinations.map((d) => (
                    <MenuItem key={d.id} value={d.label}>
                      {d.label}
                    </MenuItem>
                  ))}
                </TextField>

                <DatePicker
                  disablePast
                  label="Check in"
                  value={values.checkIn}
                  onChange={(newValue) => setFieldValue("checkIn", newValue)}
                  slots={{ openPickerIcon: CalendarMonthIcon }}
                  slotProps={{
                    textField: {
                      size: "small",
                      name: "checkIn",
                      "aria-label": "Check in",
                      onClick: (e) => {
                        e.currentTarget.querySelector("button")?.click();
                      },
                      sx: {
                        minWidth: 150,
                        "& .MuiOutlinedInput-root": { borderRadius: 1 },
                        "& input": { cursor: "pointer" },
                      },
                    },
                    openPickerIcon: {
                      fontSize: "small",
                      sx: { color: "text.disabled" },
                    },
                    openPickerButton: { tabIndex: -1 },
                  }}
                />

                <DatePicker
                  disablePast
                  label="Check out"
                  value={values.checkOut}
                  onChange={(newValue) => setFieldValue("checkOut", newValue)}
                  slots={{ openPickerIcon: CalendarMonthIcon }}
                  slotProps={{
                    textField: {
                      size: "small",
                      name: "checkOut",
                      "aria-label": "Check out",
                      onClick: (e) => {
                        e.currentTarget.querySelector("button")?.click();
                      },
                      sx: {
                        minWidth: 150,
                        "& .MuiOutlinedInput-root": { borderRadius: 1 },
                        "& input": { cursor: "pointer" },
                      },
                    },
                    openPickerIcon: {
                      fontSize: "small",
                      sx: { color: "text.disabled" },
                    },
                    openPickerButton: { tabIndex: -1 },
                  }}
                />

                <TextField
                  size="small"
                  label="Adults"
                  name="adults"
                  value={values.adults}
                  onChange={(e) =>
                    setFieldValue("adults", digitsOnly(e.target.value))
                  }
                  inputMode="numeric"
                  sx={{
                    minWidth: 90,
                    width: 150,
                    "& .MuiOutlinedInput-root": { borderRadius: 1.5 },
                    "& input": { textOverflow: "ellipsis" },
                  }}
                />

                <TextField
                  size="small"
                  label="Children"
                  name="children"
                  value={values.children}
                  onChange={(e) =>
                    setFieldValue("children", digitsOnly(e.target.value))
                  }
                  inputMode="numeric"
                  sx={{
                    minWidth: 110,
                    width: 210,
                    "& .MuiOutlinedInput-root": { borderRadius: 1.5 },
                    "& input": { textOverflow: "ellipsis" },
                  }}
                />

                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    bgcolor: "primary.main",
                    px: 6,
                    height: 40,
                    "&:hover": { bgcolor: "action.hover" },
                  }}
                >
                  Submit
                </Button>
              </Stack>
              {touched.destination && errors.destination && (
                <FormHelperText error sx={{ ml: 0.5 }}>
                  {errors.destination}
                </FormHelperText>
              )}
            </Stack>
          </Box>
        )}
      </Formik>
    </LocalizationProvider>
  );
}

export default BookingForm;
