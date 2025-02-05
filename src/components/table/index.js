import React, { useState } from "react";

import OCSTableHeader from "./header";
import {
  Box,
  Button,
  MenuItem,
  Pagination,
  Select,
  Table,
  tableCellClasses,
  TableContainer,
  TableRow,
  Typography,
  styled,
  TableCell,
} from "@mui/material";
import OCSTableBody from "./body";
import { Navigate, useNavigate } from "react-router-dom";

const rows = Array.from({ length: 168 }, (_, idx) => ({
  id: idx + 1,
  shipmentTrackingNo: "S-123456",
  orderTrackingNo: "O-123456",
  customer: {
    firstName: "Sefa",
    lastName: "DOĞAN",
  },
  district: {
    name: "Maltepe",
  },
  releasedForDistribution: true,
  status: "Teslim Edildi",
  createdDate: "12.09.2021",
}));

const StyledTableCell = styled(TableCell)(({}) => ({
  fontSize: "1rem",
  color: "#6A717E",
  padding: "1rem",
  lineHeight: "1rem",
  borderBottom: "1px solid rgba(56, 103, 182, 0.05)",
  [`&.${tableCellClasses.head}`]: {
    fontWeight: 700,
    fontSize: "0.85rem",
    background: "rgba(56, 103, 182, 0.05)",
    borderWidth: "1px 0px",
    borderStyle: "solid",
    borderColor: "rgba(56, 103, 182, 0.1)",
    padding: "1rem",
  },
  [`&.${tableCellClasses.body}`]: {},
  [`&.${tableCellClasses.footer}`]: {},
}));

const OrderTable = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const paginatedRows = rows.slice(
    (page - 1) * rowsPerPage,
    (page - 1) * rowsPerPage + rowsPerPage
  );
  const totalPages = Math.ceil(rows.length / rowsPerPage);

  const headers = [
    { name: "Sipariş No", width: "10%" },
    { name: "Gönderi Takip No", width: "10%" },
    { name: "Sipariş Takip No", width: "10%" },
    { name: "Müşteri", width: "10%" },
    { name: "İlçe", width: "10%" },
    { name: "Plaka", width: "10%" },
    { name: "Dağıtımda", width: "10%" },
    { name: "Durum", width: "10%" },
    { name: "Tarih", width: "10%" },
    { name: "", width: "10%" },
  ];

  const handleChangePage = (e, value) => {
    setPage(value);
  };
  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(1);
  };

  const handleOrderDetailClick = (data) => {
    navigate(`/orders/${data.id}`);
  };

  const rowFormat = (data) => {
    return (
      <>
        <TableRow className="p-[1.5rem]">
          <StyledTableCell width="10%" align="center">
            {data.id}
          </StyledTableCell>
          <StyledTableCell width="10%" align="center">
            {data.shipmentTrackingNo}
          </StyledTableCell>
          <StyledTableCell width="10%" align="center">
            {data.orderTrackingNo}
          </StyledTableCell>
          <StyledTableCell width="10%" align="center">
            {/* TODO: fullname helper oluştur */}
            {`${data.customer.firstName} ${data.customer.lastName} (${data.id})`}
          </StyledTableCell>
          <StyledTableCell width="10%" align="center">
            {data.district.name}
          </StyledTableCell>
          <StyledTableCell width="10%" align="center">
            Plaka........
          </StyledTableCell>
          <StyledTableCell width="10%" align="center">
            {/* TODO: badge oluştur */}
            {data.releasedForDistribution ? "Evet" : "Hayır"}
          </StyledTableCell>
          <StyledTableCell width="10%" align="center">
            {/* TODO: badge ve status helper oluştur */}
            {data.status}
          </StyledTableCell>
          <StyledTableCell width="10%" align="center">
            {/* TODO: badge ve status helper oluştur */}
            {data.createdDate}
          </StyledTableCell>

          <StyledTableCell width="10%" align="center">
            {/* re-usable component hale getirilebilir */}
            <Button
              variant="contained"
              className="rounded-lg"
              sx={{
                backgroundColor: "#5f7b2d",
                textTransform: "none",
                fontSize: "1rem",
                minWidth: "8.75rem",
                fontWeight: 500,
                padding: ".1rem",
                borderRadius: ".5rem",
                ":hover": {
                  backgroundColor: "#5f7b2d",
                },
              }}
              onClick={() => handleOrderDetailClick(data)}
            >
              Sipariş Detay
            </Button>
          </StyledTableCell>
        </TableRow>
      </>
    );
  };

  return (
    <>
      <TableContainer>
        <TableContainer sx={{ width: "100%" }}>
          <Table>
            <OCSTableHeader headers={headers} />
            <OCSTableBody data={paginatedRows} rowFormat={rowFormat} />
          </Table>
        </TableContainer>
      </TableContainer>

      <div className="flex justify-end items-center gap-[1rem]">
        <span className="font-semibold text-gray-600">
          Toplam: {rows.length}
        </span>

        <Pagination
          count={totalPages}
          page={page}
          onChange={handleChangePage}
          color="primary"
          shape="rounded"
          sx={{
            "& .MuiPaginationItem-root": {
              color: "#444444",
            },
            "& .MuiPaginationItem-root.Mui-selected": {
              backgroundColor: "#f2f2f2",
              color: "#444444",
              border: "none",
              borderRadius: ".5rem",
              ":hover": {
                backgroundColor: "#f2f2f2",
              },
            },
            "& .MuiPaginationItem-ellipsis": {
              color: "#444444",
            },
            "& .MuiPaginationItem-icon": {
              color: "#444444",
            },
          }}
        />

        <Select
          value={rowsPerPage}
          onChange={handleChangeRowsPerPage}
          size="small"
          sx={{ height: "2rem" }}
        >
          {[10, 25, 50, 100].map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </div>
    </>
  );
};

export default OrderTable;
