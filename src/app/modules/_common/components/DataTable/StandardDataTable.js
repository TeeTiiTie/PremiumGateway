import React from "react";
import MUIDataTable from "mui-datatables";
import PropTypes from "prop-types";
import { Typography, CircularProgress } from "@material-ui/core";
import { createTheme, MuiThemeProvider } from "@material-ui/core/styles";

function StandardDataTable(props) {
  const options = {
    filterType: "checkbox",
    jumpToPage: true,
    print: props.print,
    download: props.download,
    filter: props.filter,
    search: props.search,
    viewColumns: props.viewColumns,
    selectableRows: props.selectableRows,
    serverSide: true,
    selectableRowsOnClick: props.cursorPointer,
    count: props.totalRecords,
    customToolbarSelect: () => {},
    rowsSelected: props.selectedRows ? props.selectedRows : [],
    onRowSelectionChange: (rowsSelectedData, allRows, rowsSelected) => {
      props.rowsSelectedIndex({
        rowsSelected: rowsSelected,
        allRows: allRows,
        rowsSelectedData: rowsSelectedData,
      });
    },

    page: props.paginated.page - 1,
    rowsPerPage: props.paginated.recordsPerPage,
    rowsPerPageOptions: [5, 10, 15, 20, 30, 50],
    responsive: "vertical",
    rowHover: true,
    onChangeRowsPerPage: (numberOfRows) => {
      props.setPaginated({ ...props.paginated, recordsPerPage: numberOfRows });
    },
    onChangePage: (currentPage) => {
      props.setPaginated({ ...props.paginated, page: currentPage + 1 });
    },
    onColumnSortChange: (changedColumn, direction) => {
      props.setPaginated({
        ...props.paginated,
        orderingField: `${changedColumn}`,
        ascendingOrder: direction === "asc" ? true : false,
      });
    },
    textLabels: {
      body: {
        noMatch: "ไม่พบข้อมูล",
        toolTip: "Sort",
        columnHeaderTooltip: (column) => `จัดเรียงจาก ${column.label}`,
      },
      pagination: {
        next: "ถัดไป",
        previous: "ย้อนกลับ",
        rowsPerPage: "ข้อมูลต่อหน้า",
        displayRows: "จาก",
        jumpToPage: "หน้า",
      },
      viewColumns: {
        title: "แสดง Columns",
        titleAria: "Show/Hide Table Columns",
      },
      topBar: { title: false },
    },
    setTableProps: () => {
      return {
        // material ui v4 only
        size: props.denseTable ? "small" : "medium",
      };
    },
  };

  const tableTheme = (theme) =>
    createTheme({
      ...theme,
      overrides: {
        MuiTableCell: {
          head: {
            backgroundColor: `${props.headerbgcolor} !important`,
            fontFamily: props.fontFamily,
          },
          root: {
            fontFamily: props.fontFamily,
          },
        },
        MUIDataTableHeadCell: {
          contentWrapper: {
            justifyContent: props.alignmentAllColumn,
          },
          toolButton: {
            marginLeft: "0px",
            marginRight: "0px",
          },
        },
        MUIDataTableBodyCell: {
          root: {
            fontFamily: props.fontFamily,
          },
        },
        MUIDataTableToolbar: {
          root: {
            display: props.displayToolbar ? "auto" : "none",
          },
        },
        MuiTableFooter: {
          root: {
            display: props.displayFooter ? "auto" : "none",
          },
        },
      },
    });

  return (
    <div>
      {/* Datatable */}
      <MuiThemeProvider theme={tableTheme}>
        <MUIDataTable
          denseTable={props.denseTable}
          title={
            props.showTitle && (
              <React.Fragment>
                <Typography variant="h6" align="left">
                  {props.title}
                </Typography>
                {props.loading && <CircularProgress></CircularProgress>}
              </React.Fragment>
            )
          }
          data={props.data}
          columns={props.columns}
          options={options}
        />
      </MuiThemeProvider>
    </div>
  );
}

StandardDataTable.propTypes = {
  name: PropTypes.string,
  title: PropTypes.string,
  paginated: PropTypes.object,
  setPaginated: PropTypes.func,
  rowsSelectedIndex: PropTypes.func,
  data: PropTypes.array,
  columns: PropTypes.array,
  totalRecords: PropTypes.number,
  denseTable: PropTypes.bool,
  cursorPointer: PropTypes.bool,
  loading: PropTypes.bool,
  selectableRows: PropTypes.string,
  selectedRows: PropTypes.array,
  displayToolbar: PropTypes.bool,
  displayFooter: PropTypes.bool,
  alignmentAllColumn: PropTypes.string,
  print: PropTypes.bool,
  download: PropTypes.bool,
  filter: PropTypes.bool,
  search: PropTypes.bool,
  viewColumns: PropTypes.bool,
  headerbgcolor: PropTypes.string,
  showTitle: PropTypes.bool,
};

// Same approach for defaultProps too
StandardDataTable.defaultProps = {
  name: "please set name",
  title: "",
  paginated: {
    page: 1,
    recordsPerPage: 10,
    orderingField: "",
    ascendingOrder: true,
  },
  setPaginated: () => {},
  data: [],
  columns: [],
  totalRecords: 0,
  denseTable: true,
  selectableRows: "none",
  selectedRows: [],
  selectableRowsHeader: false,
  fontFamily: "Sarabun",
  cursorPointer: false,
  loading: false,
  displayToolbar: true,
  displayFooter: true,
  alignmentAllColumn: "",
  print: false,
  download: false,
  filter: false,
  search: false,
  viewColumns: false,
  showTitle: false,
  headerbgcolor: "#e0e0e0", //Gray 300
};

export default StandardDataTable;
