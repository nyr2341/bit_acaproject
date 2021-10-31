import React from "react";
import { Grid } from "@material-ui/core";

import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
  navLink: { textDecoration: "none", color: "inherit" },
});

const NoteDiv = (props) => {
  const classes = useStyles();
  const noteList = props.noteList;
  return (
    <Grid container spacing={2}>
      {noteList.map((item, index) => (
        <Grid item xs={12} key={index}>
          <NavLink
            to={"/main/shoppingnote/note?note_id=" + item.head.note_id}
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
                <b style={{ flex: 1 }}>{item.head.write_date}</b>
                <b>⋮</b>
              </div>
              <div
                style={{
                  display: "flex",
                  marginBottom: "4px",
                  fontSize: "14px",
                }}
              >
                <div style={{ flex: 1 }}>
                  {item.body.map((it, id) => (
                    <p key={id}>{it.code04_vl}</p>
                  ))}
                </div>
                <div>
                  {item.body.map((it, id) => (
                    <p key={id}>{it.note_amount}</p>
                  ))}
                </div>
              </div>
            </div>
          </NavLink>
        </Grid>
      ))}
    </Grid>
  );
};

export default NoteDiv;
