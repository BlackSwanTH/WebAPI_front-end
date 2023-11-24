import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from "react";
import "../index.css";

const Snackbar = forwardRef((props, ref) => {
  const [showSnackbar, setShowSnackbar] = useState(false);
  useImperativeHandle(ref, () => ({
    show() {
      setShowSnackbar(true);
      setTimeout(() => {
        setShowSnackbar(false);
      }, 1000);
    },
  }));
  const getBackgroundColor = () => {
    let color;
    //API ทำงานสำเร็จ
    if (props.type === "success") {
      color = "#00F593";
      //API ถูกใส่ข้อมูลไม่ถูกต้อง
    } else if (props.type === "fail") {
      color = "#F3950E";
      //API ไม่ตอบสนอง
    } else if (props.type === "timeout") {
      color = "#E81515";
    } else {
      color = "#12B8F1";
    }
    return color;
  };
  const getSymbol = () => {
    let symbol;
    if (props.type === "success") {
      symbol = <h1>&#10003;</h1>;
      //API ถูกใส่ข้อมูลไม่ถูกต้อง
    } else if (props.type === "fail") {
      symbol = <h1>&#9888;</h1>;
      //API ไม่ตอบสนอง
    } else if (props.type === "timeout") {
      symbol = <h1>&#8505;</h1>;
    } else {
      symbol = <h1>&#8505;</h1>;
    }
    return symbol;
  };
  return (
    <>
      <div
        className="snackbar"
        style={{
          backgroundColor: getBackgroundColor(),
        }}
      >
        <div className="symbol">{getSymbol()}</div>
        <div className="message">{props.message}</div>
      </div>
    </>
  );
});

export default Snackbar;
