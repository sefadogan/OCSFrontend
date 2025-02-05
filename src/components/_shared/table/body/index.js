import { TableBody } from "@mui/material";

const Row = ({ row, rowFormat }) => {
  return rowFormat(row);
};

const OCSTableBody = ({ data, rowFormat }) => {
  return (
    <TableBody>
      {data?.map((row, idx) => {
        return <Row key={idx} row={row} rowFormat={rowFormat} />;
      })}
    </TableBody>
  );
};

export default OCSTableBody;
