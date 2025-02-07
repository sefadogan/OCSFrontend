import { Table, TableContainer } from "@mui/material";
import React from "react";
import OCSTableBody from "./body";
import OCSTableFooter from "./footer";
import OCSTableHeader from "./header";

const OCSTable = ({
  headers,
  rowFormat,
  dataList,
  isLoading,
  paginationProps = {
    totalPages: null,
    totalRecords: null,
    pageNumber: null,
    pageSize: null,
    handleChangePage: null,
    handleChangeRowsPerPage: null,
  },
}) => {
  return (
    <>
      <TableContainer>
        <TableContainer sx={{ width: "100%" }}>
          <Table>
            <OCSTableHeader headers={headers} />
            {isLoading ? (
              "Yükleniyor..."
            ) : (
              <OCSTableBody data={dataList} rowFormat={rowFormat} />
            )}
          </Table>
        </TableContainer>
      </TableContainer>

      <OCSTableFooter {...paginationProps} />
    </>
  );
};

export default OCSTable;
