import { MenuItem, Pagination, Select } from "@mui/material";
import { tableConstants } from "../../../../constants/commonConstants";

const OCSTableFooter = ({
  totalRecords,
  totalPages,
  pageNumber,
  pageSize,
  handleChangePage,
  handleChangeRowsPerPage,
}) => {
  return (
    <div className="flex justify-end items-center gap-[1rem]">
      <span className="font-semibold text-gray-600">
        Toplam: {totalRecords}
      </span>

      <Pagination
        count={totalPages}
        defaultPage={1}
        page={pageNumber}
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
        value={pageSize}
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
  );
};

export default OCSTableFooter;
