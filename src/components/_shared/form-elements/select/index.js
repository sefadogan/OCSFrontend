import {
  Select,
  styled,
  FormControl,
  InputLabel,
  MenuItem,
} from "@mui/material";

const StyledSelect = styled(Select)(({}) => ({
  border: "none",
  borderRadius: ".7rem",
  backgroundColor: "#f2f2f2",

  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },

  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },

  "&:hover": {
    backgroundColor: "#f2f2f2",
  },
}));

const StyledFormControl = styled(FormControl)(({}) => ({
  width: "100%",
  backgroundColor: "#f2f2f2",
  borderRadius: ".7rem",
}));

const StyledInputLabel = styled(InputLabel)(({}) => ({
  color: "#808080 !important",

  "&.Mui-focused": {
    color: "#808080 !important",
  },
}));

const OCSSelect = ({ label, name, value, onChange, options = [] }) => {
  return (
    <StyledFormControl variant="outlined">
      <StyledInputLabel>{label}</StyledInputLabel>
      <StyledSelect value={value} onChange={onChange} label={label} name={name}>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.text}
          </MenuItem>
        ))}
      </StyledSelect>
    </StyledFormControl>
  );
};

export default OCSSelect;
