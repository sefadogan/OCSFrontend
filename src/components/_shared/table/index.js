import React, { useEffect, useMemo } from "react";

import {
  Button,
  MenuItem,
  Pagination,
  Select,
  styled,
  Table,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableRow,
} from "@mui/material";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getOrdersTableDataThunkAsync,
  selectOrders,
  setOrdersTablePageNumber,
  setOrdersTablePageSize,
} from "../../../store/ocs/orders/ordersSlice";
import {
  getOrderStatusById,
  getReleaseForDistributionById,
} from "../../../utils/orders/orderHelper";
import OCSTableBody from "./body";
import OCSTableHeader from "./header";
import { tableConstants } from "../../../constants/commonConstants";

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
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { ordersTable } = useSelector(selectOrders);

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
    if (value === ordersTable.loadOptions.pageNumber) return;

    dispatch(setOrdersTablePageNumber(value));

    //TODO: build filter query
    dispatch(getOrdersTableDataThunkAsync({}));
  };
  const handleChangeRowsPerPage = (e) => {
    if (e.target.value === ordersTable.loadOptions.pageSize) return;
    dispatch(setOrdersTablePageNumber(1));
    dispatch(setOrdersTablePageSize(e.target.value));

    //TODO: build filter query
    dispatch(getOrdersTableDataThunkAsync({}));
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
            {getReleaseForDistributionById(data.releasedForDistribution).text}
          </StyledTableCell>
          <StyledTableCell width="10%" align="center">
            {/* TODO: badge ve status helper oluştur */}
            {getOrderStatusById(data.status).text}
          </StyledTableCell>
          <StyledTableCell width="10%" align="center">
            {moment(data.createdDate).format("DD.MM.YYYY")}
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

  useEffect(() => {
    dispatch(getOrdersTableDataThunkAsync({}));
  }, []);

  return (
    <>
      <TableContainer>
        <TableContainer sx={{ width: "100%" }}>
          <Table>
            <OCSTableHeader headers={headers} />
            {ordersTable.loadOptions.isLoading ? (
              "Yükleniyor..."
            ) : (
              <OCSTableBody data={ordersTable.dataList} rowFormat={rowFormat} />
            )}
          </Table>
        </TableContainer>
      </TableContainer>

      <div className="flex justify-end items-center gap-[1rem]">
        <span className="font-semibold text-gray-600">
          Toplam: {ordersTable.dataList.length}
        </span>

        <Pagination
          count={ordersTable.totalPages}
          defaultPage={1}
          page={ordersTable.loadOptions.pageNumber}
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
          value={ordersTable.loadOptions.pageSize}
          onChange={handleChangeRowsPerPage}
          size="small"
          sx={{ height: "2rem" }}
        >
          {tableConstants.rowsPerPage.map((option) => (
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
