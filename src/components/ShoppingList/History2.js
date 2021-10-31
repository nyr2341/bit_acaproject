import React from "react";

import { NavLink } from "react-router-dom";
import {
  Container,
  IconButton,
  Divider,
  TextField,
  Select,
  MenuItem,
} from "@material-ui/core";

import {
  makeStyles,
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";

import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import EditIcon from "@material-ui/icons/Edit";
import SaveAltIcon from "@material-ui/icons/SaveAlt";
import HistoryInfoDiv from "../Div/HistoryInfoDiv";

const useStyles = makeStyles({
  navLink: { textDecoration: "none", color: "inherit" },
});

const theme = createMuiTheme({
  palette: {
    primary: {
      500: "#4caf50",
    },
  },
});

const History = (props) => {
  const classes = useStyles();
  const [historyState, setHistoryState] = React.useState(true);

  const info = props.info;

  return (
    <Container
      style={{
        height: "100%",
        padding: "0px",
        backgroundColor: "white",
        boxShadow: "0 0px 3px 0 rgb(0 0 0 / 14%)",
        border: "0",
      }}
    >
      <div style={{ display: "flex", marginTop: "15px" }}>
        <NavLink to="/admin/shoppinghistory" className={classes.navLink}>
          <IconButton style={{ width: "28px", height: "28px", margin: "6px" }}>
            <ChevronLeftIcon fontSize="small" />
          </IconButton>
        </NavLink>
        <div
          style={{
            margin: "auto 0",
            color: "rgba(0, 0, 0, 0.54)",
            display: "flex",
            flex: 1,
          }}
        >
          <b style={{ marginRight: "12px" }}>{info.head.purchase_date}</b>
          <b>{info.head.mart_name}</b>
        </div>
        <IconButton
          style={{ width: "28px", height: "28px", margin: "6px" }}
          onClick={() => {
            setHistoryState(!historyState);
          }}
        >
          {historyState ? (
            <EditIcon fontSize="small" />
          ) : (
            <SaveAltIcon fontSize="small" />
          )}
        </IconButton>
      </div>
      <Divider />
      {historyState ? (
        <HistoryInfoDiv info={info} />
      ) : (
        <form className={classes.root} autoComplete="off">
          <table style={{ padding: "12px 14px", width: "100%" }}>
            <tbody>
              {info.body.map((it, id) => (
                <tr>
                  <ThemeProvider theme={theme}>
                    <td>
                      <TextField
                        value={it.code04_vl}
                        style={{ width: "100%" }}
                      />
                    </td>
                    <td>
                      <TextField value={it.qt} style={{ width: "40px" }} />
                    </td>
                    <td>
                      <Select
                        style={{ width: "42px" }}
                        defaultValue={it.qt_code}
                      >
                        <MenuItem value="l">l</MenuItem>
                        <MenuItem value="ml">ml</MenuItem>
                        <MenuItem value="kg">kg</MenuItem>
                        <MenuItem value="g">g</MenuItem>
                      </Select>
                    </td>
                    <td>
                      <TextField value={it.amount} style={{ width: "40px" }} />
                    </td>
                    <td style={{ margin: "0 0 0 8px", width: "80px" }}>
                      <TextField value={it.price} />
                    </td>
                  </ThemeProvider>
                </tr>
              ))}
            </tbody>
          </table>
        </form>
      )}
    </Container>
  );
};

export default History;
