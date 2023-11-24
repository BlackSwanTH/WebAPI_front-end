import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
} from "@material-ui/pickers";
import React, { useState } from "react";
import { th } from "date-fns/locale";
import dayjs from "dayjs";

const CustomDatePicker = (props) => {
  const [date, setDate] = useState(null);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={th}>
      <KeyboardDateTimePicker
        margin="normal"
        id="date-picker-dialog"
        label="ปฏิทิน"
        format="d MMM yyyy hh:mm น."
        clearable
        value={date}
        onChange={(event) => {
          console.log("Date picker value: ", event);
          console.log(props.columnDef.tableData.id);

          setDate(event);
          props.onFilterChanged(props.columnDef.tableData.id, event);
        }}
        KeyboardButtonProps={{
          "aria-label": "change date",
        }}
      />
    </MuiPickersUtilsProvider>
  );
};

// class LocalizedUtils extends DateFnsUtils {
//   getYearText(date) {
//     return dayjs(date).add(543, "year").format("YYYY");
//   }
//   getCalendarHeaderText(date) {
//     return dayjs(date).add(543, "year").format("MMMM YYYY");
//   }
// }
export default CustomDatePicker;
