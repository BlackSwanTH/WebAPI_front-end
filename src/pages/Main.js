import { slide as Menu } from "react-burger-menu";
import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { Cookies as cookies } from "react-cookie";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import MaterialTable from "material-table";
import { ThemeProvider, createTheme } from "@mui/material";
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
import { format } from "date-fns";
import { th } from "date-fns/locale";

import { styled } from "@mui/material/styles";

function Main() {
  const defaultMaterialTheme = createTheme();

  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([
    // { title: "เลขระเบียน", field: "id" },
    { title: "รหัสลงทะเบียน", field: "user_Id" },
    {
      title: "กิจกรรม",
      field: "name",
      initialEditValue: "initial edit value",
    },
    { title: "วันเวลา", field: "when", type: "datetime" },
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
                        })
                        .catch((error) => {
                          if (error.code === "ECONNABORTED") {
                            console.log("timeout");
                          } else {
                            console.log(error.response.status);
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
                        })
                        .catch((error) => {
                          if (error.code === "ECONNABORTED") {
                            console.log("timeout");
                          } else {
                            console.log(error.response.status);
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
                        })
                        .catch((error) => {
                          if (error.code === "ECONNABORTED") {
                            console.log("timeout");
                          } else {
                            console.log(error.response.status);
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
