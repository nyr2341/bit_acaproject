import React from "react";

import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Grid, IconButton } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import NoteDiv from "../Div/NoteDiv";

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

const NoteList = (props) => {
  const classes = useStyles();
  const noteList = props.noteList;

  return (
    <div>
      <Container style={{ marginTop: "15px" }}>
        {noteList !== null ? (
          <NoteDiv noteList={noteList} />
        ) : (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <div
                style={{
                  textAlign: "center",
                  marginTop: "150px",
                }}
              >
                <p>쇼핑 노트가 없습니다.</p>
                <p style={{ margin: "60px 0 0 0" }}>하단 + 버튼을 눌러 .</p>
                <p>쇼핑 노트를 생성해보세요.</p>
              </div>
            </Grid>
          </Grid>
        )}
      </Container>
      <div className={classes.footer}>
        <div style={{ flex: 1 }}></div>
        <div>
          <NavLink to="/main/shoppingnote/addnote" className={classes.navLink}>
            <IconButton style={{ marginRight: "20px" }}>
              <AddCircleIcon fontSize="large" />
            </IconButton>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default NoteList;
