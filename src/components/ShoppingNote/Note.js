import React from "react";
import { NavLink } from "react-router-dom";

import { Container, IconButton, Grid, Divider } from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

const useStyles = makeStyles({
  navLink: { textDecoration: "none", color: "inherit" },
});

const Note = ({ history, checkStateHandler, cookies }) => {
  const classes = useStyles();
  const [info, setInfo] = React.useState(null);
  const note_id = history.location.search.split("=")[1];

  React.useEffect(() => {
    axios
      .get("http://3.35.250.22:8080/Shop-0.0.1-SNAPSHOT/viewnote", {
        params: {
          note_id: note_id,
        },
        headers: {
          Authorization: "Bearer " + cookies.Authorization,
        },
      })
      .then((response) => {
        setInfo(response.data);
      });
  }, [cookies.Authorization, note_id]);

  return (
    <div>
      {info !== null && (
        <>
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
              <div style={{ margin: "auto 8px" }}>{info.head.write_date}</div>
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
                  <table style={{ borderSpacing: "0 8px" }}>
                    <tbody>
                      {info.body.map((it, id) => (
                        <>
                          <tr>
                            <td style={{ width: "100%", textAlign: "left" }}>
                              {it.code04_vl}
                            </td>
                            <td
                              style={{
                                minWidth: "24px",
                              }}
                            >
                              {it.note_amount}
                            </td>
                          </tr>
                          <tr>
                            <td colSpan="5" style={{ width: "100%" }}>
                              <Divider style={{ height: "2px" }} />
                            </td>
                          </tr>
                        </>
                      ))}
                    </tbody>
                  </table>
                </Grid>
              </Grid>
            </div>
          </Container>
        </>
      )}
    </div>
  );
};

export default Note;
