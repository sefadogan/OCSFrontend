import { TableCell, TableHead, TableRow } from "@mui/material";

const OCSTableHeader = ({ headers }) => {
  return (
    <TableHead>
      <TableRow
        sx={{
          "& th": {
            color: "#b7b7b7",
            padding: ".5rem",
            borderRight: ".0625rem solid rgba(56, 103, 182, 0.05)",
            borderBottom: ".125rem solid #d9d9d9",
            textAlign: "center",
          },
          "& th:last-child": {
            borderRight: "none",
          },
        }}
      >
        {headers.map((header, idx) => (
          <TableCell key={idx} width={header.width}>
            {header.name}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default OCSTableHeader;
