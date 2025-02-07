import { styled, TextField } from "@mui/material";

const StyledTextField = styled(TextField)(({}) => ({
  border: "none",
  borderRadius: ".7rem",
  backgroundColor: "#f2f2f2",
  "& .MuiInputLabel-root": {
    color: "#808080",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#808080",
  },
  "& .MuiOutlinedInput-root": {
    border: "none",
    borderRadius: ".5rem",
  },
  "& .MuiOutlinedInput-input": {
    border: "none",
    borderRadius: ".5rem",
  },
  "& fieldset": {
    border: "none",
    borderRadius: ".5rem",
  },
  ":hover": {
    backgroundColor: "#f2f2f2",
  },
}));

const OCSTextField = ({ params, name, label, value, onChange }) => {
  return (
    <StyledTextField
      variant="outlined"
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      {...params}
    />
  );
};

export default OCSTextField;
