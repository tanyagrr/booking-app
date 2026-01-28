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

  const fieldSx = {
    width: { xs: "100%", md: "auto" },
    minWidth: { xs: 0, md: "unset" },
  };

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
          setFieldTouched,
        }) => (
          <Box component="form" onSubmit={handleSubmit} sx={{ py: 2 }}>
            <Stack spacing={0.75}>
              <Stack
                direction={{ xs: "column", md: "row" }}
                spacing={{ xs: 1.25, md: 0.9 }}
                alignItems={{ xs: "stretch", md: "center" }}
                sx={{
                  display: { xs: "grid", md: "flex" },
                  gridTemplateColumns: {
                    xs: "1fr 1fr",
                    sm: "1fr 1fr",
                    md: "unset",
                  },
                  gap: { xs: 1.25, md: 0.1 },
                }}
              >
                <Box sx={{ gridColumn: { xs: "1 / -1", sm: "auto" } }}>
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
                      ...fieldSx,
                      minWidth: { xs: 0, md: 200 },
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
                  {touched.destination && errors.destination && (
                    <FormHelperText
                      error
                      sx={{
                        ml: 0.5,
                        mt: 0.5,
                        display: { xs: "block", md: "none" },
                      }}
                    >
                      {errors.destination}
                    </FormHelperText>
                  )}
                </Box>

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
                        ...fieldSx,
                        minWidth: { xs: 0, md: 150 },
                        "& .MuiOutlinedInput-root": { borderRadius: 1 },
                        "& input": { cursor: "pointer" },
                      },
                      fullWidth: { xs: true, md: false },
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
                        ...fieldSx,
                        minWidth: { xs: 0, md: 150 },
                        "& .MuiOutlinedInput-root": { borderRadius: 1 },
                        "& input": { cursor: "pointer" },
                      },
                      fullWidth: { xs: true, md: false },
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
                    ...fieldSx,
                    width: { xs: "100%", md: 150 },
                    "& .MuiOutlinedInput-root": { borderRadius: 1.5 },
                    "& input": { textOverflow: "ellipsis" },
                  }}
                  fullWidth={{ xs: true, md: false }}
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
                    ...fieldSx,
                    width: { xs: "100%", md: 150 },
                    "& .MuiOutlinedInput-root": { borderRadius: 1.5 },
                    "& input": { textOverflow: "ellipsis" },
                  }}
                  fullWidth={{ xs: true, md: false }}
                />

                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    bgcolor: "primary.main",
                    height: 40,
                    px: { xs: 2, md: 6 },
                    width: { xs: "100%", md: "auto" },
                    gridColumn: { xs: "1 / -1", sm: "auto" },
                    "&:hover": { bgcolor: "action.hover" },
                  }}
                >
                  Submit
                </Button>
              </Stack>
              {touched.destination && errors.destination && (
                <FormHelperText
                  error
                  sx={{ ml: 0.5, display: { xs: "none", md: "block" } }}
                >
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
