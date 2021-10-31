import React from "react";
//import styles from "assets/jss/material-react/sidebarStyle.js";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import Divider from "@material-ui/core/Divider";

import axios from "axios";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  item: {
    border: "1px solid silver",
    margin: "16px 8px 0 8px",
    padding: "8px",
    borderRadius: "5px",
    display: "flex",
  },
  itemover: {
    backgroundColor: "#f50057",
    color: "#fff",
    padding: "2px 10px",
    borderRadius: "8px",
    margin: "auto 8px auto 0",
    textAlign: "center",
    verticalAlign: "middle",
    width: "36px",
  },
});

const Sidebar = (props) => {
  const classes = useStyles();
  const data = props.data;

  return (
    <div>
      <Drawer
        variant="temporary"
        anchor={"left"}
        open={props.openState}
        onClose={props.handleDrawerToggle}
      >
        <List className={classes.list}>
          <ListItem>
            <ListItemText>
              <b>구매 임박 상품</b>
            </ListItemText>
          </ListItem>
          <Divider />

          {data !== null ? (
            <div>
              {data.map((item, index) => (
                <div className={classes.item} key={index}>
                  <div className={classes.itemover}>
                    D-{item["Remaining Date"]}
                  </div>
                  <div>
                    <div
                      style={{
                        width: "146px",
                        wordBreak: "break-all",
                        fontSize: "12px",
                      }}
                    >
                      <b>{item.code04_vl}</b>
                    </div>
                    <div
                      style={{
                        marginTop: "5px",
                        width: "146px",
                        wordBreak: "break-all",
                        fontSize: "10px",
                      }}
                    >
                      <b>최근 구매일 : {item.purchase_date}</b>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <></>
          )}
        </List>
      </Drawer>
    </div>
  );
};

export default Sidebar;
