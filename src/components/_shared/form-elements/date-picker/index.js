import { styled } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import OCSTextField from "../text-field";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

const StyledDatePicker = styled(DatePicker)({
  "& .MuiOutlinedInput-root": {
    borderRadius: ".7rem",
    backgroundColor: "#f2f2f2",
    border: "none !important",

    "& fieldset": {
      border: "none !important",
    },
    "&.Mui-focused": {
      border: "none !important",
    },
    "&.Mui-focused fieldset": {
      border: "none !important",
    },
  },
  "& .MuiInputBase-input": {
    borderRadius: ".7rem",
  },
  "& .MuiPickersPopper-root": {
    borderRadius: ".7rem",
    backgroundColor: "#fff",
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
  },
  "& .MuiPickersDay-root": {
    borderRadius: "50%",
  },
  "& .MuiPickersDay-today": {
    backgroundColor: "#f2f2f2",
    color: "#000",
  },
  "& .MuiIconButton-root": {
    color: "#808080",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#808080 !important",
  },
});

const OCSDatePicker = (props) => {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <StyledDatePicker
        {...props}
        variant="outlined"
        renderInput={(params) => <OCSTextField {...params} />}
      />
    </LocalizationProvider>
  );
};

export default OCSDatePicker;
