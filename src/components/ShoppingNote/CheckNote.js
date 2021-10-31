import React from "react";
import { NavLink } from "react-router-dom";
import {
  Button,
  Container,
  IconButton,
  TextField,
  Grid,
  Divider,
} from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

import {
  makeStyles,
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";

import axios from "axios";

const theme = createMuiTheme({
  palette: {
    primary: {
      500: "#4caf50",
    },
  },
});

const useStyles = makeStyles((theme) => ({
  navLink: { textDecoration: "none", color: "inherit" },
}));

const CheckNote = (props) => {
  const selectedItem = props.history.history.location.state.selectedItem;
  const Authorization = props.history.history.location.state.Authorization;

  const classes = useStyles();

  const [num, setNum] = React.useState(1);

  const onSubmit = (e) => {
    e.preventDefault();
    const next = selectedItem.map((item, index) => {
      return { ...item, note_amount: num };
    });
    console.log(Authorization);

    axios
      .post(
        "http://3.35.250.22:8080/Shop-0.0.1-SNAPSHOT/note",
        JSON.stringify(next),
        {
          headers: {
            "Content-Type": `application/json`,
            Authorization: "Bearer " + Authorization,
          },
        }
      )
      .then((res) => {
        props.checkStateHandler();
      })
      .catch((e) => console.log("Error : " + e));
    props.history.history.push("/main/shoppingnote");
  };
  return (
    <div>
      <form
        onSubmit={(e) => {
          onSubmit(e);
        }}
      >
        <Container
          style={{
            marginTop: "15px",
            padding: "0px 0px",
            backgroundColor: "#fff",
            boxShadow: "0 0px 3px 0 rgb(0 0 0 / 14%)",
            border: "0",
          }}
        >
          <div
            style={{
              display: "flex",
              marginTop: "15px",
              color: "rgba(0, 0, 0, 0.54)",
              height: "64px",
            }}
          >
            <div style={{ margin: "auto 16px auto 0" }}>
              <NavLink to="/main/shoppingnote" className={classes.navLink}>
                <IconButton>
                  <ChevronLeftIcon fontSize="small" />
                </IconButton>
              </NavLink>
            </div>
            <div style={{ paddingTop: "16px" }}>
              <ThemeProvider theme={theme}>
                <TextField placeholder="2021-07-21" />
              </ThemeProvider>
            </div>
          </div>
        </Container>

        <Container
          style={{
            height: "100%",
            paddingBottom: "70px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              marginTop: "20px",
              height: "100%",
              padding: "12px",
              backgroundColor: "#fff",
              boxShadow: "0 0px 3px 0 rgb(0 0 0 / 14%)",
              border: "0",
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <table style={{ borderSpacing: "0 8px", width: "100%" }}>
                  <tbody>
                    {selectedItem.map((item, index) => (
                      <div style={{ width: "100%" }} key={index}>
                        <tr>
                          <td style={{ width: "100%", textAlign: "left" }}>
                            {item.code04_vl}
                          </td>
                          <td
                            style={{ minWidth: "36px" }}
                            onClick={() => {
                              if (num > 1) {
                                setNum(num - 1);
                              }
                            }}
                          >
                            -
                          </td>
                          <td
                            style={{
                              minWidth: "24px",
                              maxWidth: "40px",
                              overflow: "hidden",
                            }}
                          >
                            {num}
                          </td>
                          <td
                            style={{ minWidth: "36px" }}
                            onClick={() => {
                              if (num < 999) {
                                setNum(num + 1);
                              }
                            }}
                          >
                            +
                          </td>
                          <td style={{ minWidth: "34px" }}>
                            <IconButton size="small" onClick={() => {}}>
                              <CloseIcon />
                            </IconButton>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="5" style={{ width: "100%" }}>
                            <Divider style={{ height: "2px" }} />
                          </td>
                        </tr>
                      </div>
                    ))}
                  </tbody>
                </table>
              </Grid>
            </Grid>
          </div>
        </Container>

        <div
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            width: "100%",
          }}
        >
          <Button
            style={{
              width: "100%",
              height: "50px",
              backgroundColor: "green",
              color: "#fff",
            }}
            type="submit"
          >
            쇼핑 노트 생성
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CheckNote;
