import React from "react";
import { Container, IconButton, Grid } from "@material-ui/core";

import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import AddCircleIcon from "@material-ui/icons/AddCircle";
import HistoryDiv from "../Div/HistoryDiv";

const useStyles = makeStyles({
  footer: {
    position: "fixed",
    width: "100%",
    bottom: "0px",
    display: "flex",
    height: "70px",
  },
  navLink: { textDecoration: "none", color: "inherit" },
});

const HistoryList = (props) => {
  const classes = useStyles();

  const historyList = props.historyList;

  return (
    <div>
      <Container style={{ marginTop: "15px" }}>
        {historyList !== null ? (
          <HistoryDiv historyList={historyList} />
        ) : (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <div
                style={{
                  textAlign: "center",
                  marginTop: "150px",
                }}
              >
                <p>쇼핑 이력이 없습니다.</p>
                <p style={{ margin: "60px 0 0 0" }}>하단 + 버튼을 눌러 .</p>
                <p>쇼핑 이력을 추가해보세요.</p>
              </div>
            </Grid>
          </Grid>
        )}
      </Container>
      <div className={classes.footer}>
        <div style={{ flex: 1 }}></div>
        <div>
          <NavLink
            to="/main/shoppinglist/addhistory"
            className={classes.navLink}
          >
            <IconButton style={{ marginRight: "20px" }}>
              <AddCircleIcon fontSize="large" />
            </IconButton>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default HistoryList;
