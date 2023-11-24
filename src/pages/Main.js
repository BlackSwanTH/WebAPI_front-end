import { slide as Menu } from "react-burger-menu";
import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { Cookies as cookies } from "react-cookie";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import MaterialTable from "material-table";
import { ThemeProvider, createTheme, useTheme } from "@mui/material";
import { forwardRef } from "react";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import { styled } from "@mui/material/styles";
import CustomDatePicker from "../components/DatePicker";
import { th } from "date-fns/locale/th";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Snackbar from "../components/Snackbar";
function Main() {
  const defaultMaterialTheme = createTheme();
  const [data, setData] = useState([]);
  const [showSnackbarSuccess, setShowSnackbarSuccess] = useState(false);
  const [showSnackbarFail, setShowSnackbarFail] = useState(false);
  const [showSnackbarTimeout, setShowSnackbarTimeout] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSnackbarSuccess(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [setShowSnackbarSuccess]);
  const [columns, setColumns] = useState([
    // { title: "เลขระเบียน", field: "id" },
    { title: "รหัสลงทะเบียน", field: "user_Id" },
    {
      title: "กิจกรรม",
      field: "name",
    },
    {
      title: "วันเวลา",
      field: "when",
      type: "datetime",
      dateSetting: { format: "d MMM yy hh:mm น.", locale: "th-TH" },
      filterComponent: (props) => <CustomDatePicker {...props} />,
    },
  ]);
  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => (
      <ChevronRight {...props} ref={ref} />
    )),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),

    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),

    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => (
      <ChevronLeft {...props} ref={ref} />
    )),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => (
      <ArrowDownward {...props} ref={ref} />
    )),
    ThirdStateCheck: forwardRef((props, ref) => (
      <Remove {...props} ref={ref} />
    )),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  };
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  const SnackbarType = {
    success: "success",
    fail: "fail",
    timeout: "timeout",
    login: "login",
  };
  const snackbarRef = useRef(null);
  useEffect(() => {
    axios
      .get("http://localhost:3000/activities", {
        headers: { Authorization: "Bearer " + cookies["token"] },
        timeout: 10 * 1000,
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        if (error.code === "ECONNABORTED") {
          console.log("timeout");
        } else {
          console.log(error.response.status);
        }
      });
  }, []);
  return (
    <>
      <Snackbar
        ref={snackbarRef}
        message="This is an info alert - check it out!"
        type={SnackbarType.login}
      />
      {showSnackbarSuccess && (
        <Snackbar
          ref={snackbarRef}
          message="This is a success alert - check it out!"
          type={SnackbarType.success}
        />
      )}
      {showSnackbarFail && (
        <Snackbar
          ref={snackbarRef}
          message="This is a warning alert - check it out!"
          type={SnackbarType.fail}
        />
      )}
      {showSnackbarTimeout && (
        <Snackbar
          ref={snackbarRef}
          message="This is an error alert - check it out!"
          type={SnackbarType.timeout}
        />
      )}

      <div id="outer-container">
        <Sidebar
          pageWrapId={"page-wrap"}
          outerContainerId={"outer-container"}
        />
        <div id="page-wrap">
          <ThemeProvider theme={defaultMaterialTheme}>
            <MaterialTable
              style={{ paddingLeft: "40px", marginRight: "20px" }}
              icons={tableIcons}
              title="To Do"
              columns={columns}
              data={data}
              options={{
                filtering: true,
                search: false,
              }}
              // localization={{
              //   body: {
              //     dateTimePickerLocalization: th,
              //   },
              // }}
              editable={{
                onBulkUpdate: (changes) =>
                  new Promise((resolve, reject) => {
                    setTimeout(() => {
                      setData([...data, changes]);
                      resolve();
                    }, 1000);
                  }),
                onRowAddCancelled: (rowData) =>
                  console.log("Row adding cancelled"),
                onRowUpdateCancelled: (rowData) =>
                  console.log("Row editing cancelled"),
                onRowAdd: (newData) =>
                  new Promise((resolve, reject) => {
                    setTimeout(() => {
                      axios
                        .post(
                          "http://localhost:3000/users/" + newData.user_Id,
                          {
                            name: newData.name,
                            when: newData.when,
                            // when: format(newData.when, "do MMMM yyyy", {locale: th,}),
                          },
                          {
                            headers: {
                              Authorization: "Bearer " + cookies["token"],
                            },
                            timeout: 10 * 1000,
                          }
                        )
                        .then((response) => {
                          newData.id = response.data.id;
                          setData([...data, newData]);
                          setShowSnackbarSuccess(true);
                        })
                        .catch((error) => {
                          if (error.code === "ECONNABORTED") {
                            console.log("timeout");
                            setShowSnackbarTimeout(true);
                          } else {
                            console.log(error.response.status);
                            setShowSnackbarFail(true);
                          }
                        });
                      resolve();
                    }, 1000);
                  }),
                onRowUpdate: (newData, oldData) =>
                  new Promise((resolve, reject) => {
                    setTimeout(() => {
                      axios
                        .put(
                          "http://localhost:3000/activities/" + oldData.id,
                          { name: newData.name, when: newData.when },
                          {
                            headers: {
                              Authorization: "Bearer " + cookies["token"],
                            },
                            timeout: 10 * 1000,
                          }
                        )
                        .then((response) => {
                          const dataUpdate = [...data];
                          const index = oldData.tableData.id;
                          dataUpdate[index] = newData;
                          setData([...dataUpdate]);

                          setShowSnackbarSuccess(true);
                          console.log("success!");

                          // return (
                          //   <Snackbar
                          //     ref={snackbarRef}
                          //     message="This is a success alert - check it out!"
                          //     type={SnackbarType.success}
                          //   />
                          // );
                        })
                        .catch((error) => {
                          if (error.code === "ECONNABORTED") {
                            console.log("timeout");
                            setShowSnackbarTimeout(true);
                          } else {
                            console.log(error.response.status);
                            setShowSnackbarFail(true);
                          }
                        });
                      resolve();
                    }, 1000);
                  }),
                onRowDelete: (oldData) =>
                  new Promise((resolve, reject) => {
                    setTimeout(() => {
                      axios
                        .delete(
                          "http://localhost:3000/activities/" + oldData.id,
                          {
                            headers: {
                              Authorization: "Bearer " + cookies["token"],
                            },
                            timeout: 10 * 1000,
                          }
                        )
                        .then((response) => {
                          const dataDelete = [...data];
                          const index = oldData.tableData.id;
                          dataDelete.splice(index, 1);
                          setData([...dataDelete]);
                          setShowSnackbarSuccess(true);
                        })
                        .catch((error) => {
                          if (error.code === "ECONNABORTED") {
                            console.log("timeout");
                            setShowSnackbarTimeout(true);
                          } else {
                            console.log(error.response.status);
                            setShowSnackbarFail(true);
                          }
                        });
                      resolve();
                    }, 1000);
                  }),
              }}
            />
          </ThemeProvider>
        </div>
      </div>
    </>
  );
}

export default Main;
