import React from "react";
import { slide as Menu } from "react-burger-menu";
import "../index.css";
function Sidebar(props) {
  var styles = {
    bmBurgerButton: {
      position: "fixed",
      width: "36px",
      height: "30px",
      left: "36px",
      top: "36px",
    },
    bmBurgerBars: {
      background: "#373a47",
    },
    bmBurgerBarsHover: {
      background: "#a90000",
    },
    bmCrossButton: {
      height: "24px",
      width: "24px",
    },
    bmCross: {
      background: "#bdc3c7",
    },
    bmMenu: {
      overflowY: "hidden", // เอา scrollbar ออก
    },
    bmMorphShape: {
      fill: "#373a47",
    },
    bmItemList: {
      color: "#b8b7ad",
    },
    bmItem: {
      display: "inline-block",
    },
    bmOverlay: {
      background: "rgba(0, 0, 0, 0.3)",
    },
  };

  return (
    <Menu styles={styles} props={props}>
      <div className="sidebar">
        <ul
          style={{
            listStyleType: "none",
            width: "100%",
            marginLeft: "0",
            paddingLeft: "0",
            marginTop: "0",
          }}
        >
          <li>
            <a
              id="main"
              style={{
                color: "rgb(184, 183, 173)",
                textDecoration: "none",
                width: "100%",
              }}
              href="/main"
            >
              Main
            </a>
          </li>
          <li>
            <a
              id="main"
              style={{
                color: "rgb(184, 183, 173)",
                textDecoration: "none",
                width: "100%",
              }}
              href="/credit"
            >
              Credit
            </a>
          </li>
          <li>
            <a
              id="main"
              style={{
                color: "rgb(184, 183, 173)",
                textDecoration: "none",
                width: "100%",
              }}
              href="/signin"
            >
              Sign Out
            </a>
          </li>
        </ul>
        <br />
      </div>
    </Menu>
  );
}

export default Sidebar;
