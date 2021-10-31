import React from "react";

import { NavLink } from "react-router-dom";
import { Container, IconButton, Divider } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

import axios from "axios";

import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import EditIcon from "@material-ui/icons/Edit";
import ModifyHistory from "./ModifyHistory";

const useStyles = makeStyles({
  navLink: { textDecoration: "none", color: "inherit" },
});

const History = ({ history, checkStateHandler, cookies }) => {
  const classes = useStyles();
  const [historyState, setHistoryState] = React.useState(true);
  const [info, setInfo] = React.useState(null);

  const list_id = history.location.search.split("=")[1];

  const clickHandler = () => {
    setHistoryState(!historyState);
  };
  React.useEffect(() => {
    axios
      .get("http://3.35.250.22:8080/Shop-0.0.1-SNAPSHOT/viewitem", {
        params: {
          list_id: list_id,
        },
        headers: {
          Authorization: "Bearer " + cookies.Authorization,
        },
      })
      .then((response) => {
        setInfo(response.data);
      });
  }, [cookies.Authorization, list_id]);

  return (
    <Container
      style={{
        height: "100%",
        padding: "0px",
      }}
    >
      {info !== null ? (
        <div>
          {historyState ? (
            <div>
              <div
                style={{
                  display: "flex",
                  marginTop: "15px",
                  backgroundColor: "white",
                  boxShadow: "0 0px 3px 0 rgb(0 0 0 / 14%)",
                  border: "0",
                }}
              >
                <NavLink to="/main/shoppinghistory" className={classes.navLink}>
                  <IconButton
                    style={{ width: "28px", height: "28px", margin: "6px" }}
                  >
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
                  <b style={{ marginRight: "12px" }}>
                    {info.head.purchase_date}
                  </b>
                  <b>{info.head.mart_name}</b>
                </div>
                <IconButton
                  style={{ width: "28px", height: "28px", margin: "6px" }}
                  onClick={() => {
                    clickHandler();
                  }}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
              </div>
              <Divider />
              <div
                style={{
                  backgroundColor: "white",
                  boxShadow: "0 0px 3px 0 rgb(0 0 0 / 14%)",
                  border: "0",
                }}
              >
                <table
                  style={{
                    marginTop: "20px",
                    padding: "12px",
                    width: "100%",
                  }}
                >
                  <tbody>
                    {info.body.map((it, id) => (
                      <tr key={id}>
                        <td style={{ wordBreak: "break-all", width: "100%" }}>
                          <p style={{ margin: "4px 0" }}>
                            {it.code04_vl +
                              " " +
                              it.qt +
                              it.qt_code +
                              " " +
                              it.amount +
                              "개"}
                          </p>
                        </td>
                        <td>
                          <div style={{ margin: "0 0 0 8px" }}>
                            <p style={{ margin: "4px 0" }}>{"₩" + it.price}</p>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <ModifyHistory
              history={history}
              info={info}
              clickHandler={clickHandler}
              checkStateHandler={checkStateHandler}
              cookies={cookies}
            />
          )}
        </div>
      ) : (
        <></>
      )}
    </Container>
  );
};

export default History;
