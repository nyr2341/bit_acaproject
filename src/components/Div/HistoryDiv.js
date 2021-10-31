import React from "react";
import { Grid } from "@material-ui/core";

import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
  navLink: { textDecoration: "none", color: "inherit" },
});

const HistoryDiv = (props) => {
  const classes = useStyles();
  const historyList = props.historyList;

  return (
    <Grid container spacing={2}>
      {historyList.map((item, index) => {
        return (
          <Grid item xs={12} key={index}>
            <NavLink
              to={"/main/shoppinglist/history?list_id=" + item.head.list_id}
              className={classes.navLink}
            >
              <div
                style={{
                  border: "1px solid silver",
                  minHeight: "80px",
                  borderRadius: "4px",
                  backgroundColor: "white",
                  padding: "4px 12px",
                }}
              >
                <div
                  style={{
                    margin: "4px 0",
                    color: "silver",
                    display: "flex",
                  }}
                >
                  <b style={{ flex: 1 }}>{item.head.purchase_date}</b>
                  <b>{item.head.mart_name}</b>
                </div>
                <div
                  style={{
                    display: "flex",
                    marginBottom: "4px",
                    fontSize: "14px",
                  }}
                >
                  <div style={{ flex: 1 }}>
                    {item.body.map((it, id) => {
                      if (id > 2) {
                        return "";
                      }
                      return (
                        <p key={id}>
                          {it.code04_vl +
                            " " +
                            it.qt +
                            it.qt_code +
                            " " +
                            it.amount +
                            "개"}
                        </p>
                      );
                    })}
                  </div>
                  <div>
                    {item.body.map((it, id) => {
                      if (id > 2) {
                        return "";
                      }
                      return <p key={id}>₩{it.price}</p>;
                    })}
                  </div>
                </div>
                {item.body.length > 2 && (
                  <div style={{ textAlign: "center" }}>⋮</div>
                )}
              </div>
            </NavLink>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default HistoryDiv;
