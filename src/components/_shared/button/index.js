import { Button } from "@mui/material";

const OCSButton = ({
  text,
  type = "button",
  disabled,
  bgColor,
  minWidth,
  hoverBgColor,
  padding,
  onClick,
}) => {
  return (
    <Button
      type={type}
      variant="contained"
      disabled={disabled}
      onClick={onClick}
      sx={{
        backgroundColor: bgColor,
        textTransform: "none",
        fontSize: "1rem",
        minWidth: minWidth,
        fontWeight: 500,
        borderRadius: ".5rem",
        padding: padding,
        ":hover": {
          backgroundColor: hoverBgColor || bgColor,
        },
      }}
    >
      {text}
    </Button>
  );
};

export default OCSButton;
