import React from "react";

import { Divider, Grid, IconButton } from "@material-ui/core";

import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";

const NoteSelectDiv = (props) => {
  const [dropState, setDropState] = React.useState(false);
  const title = props.title;
  const item = props.item;

  const [state, setState] = React.useState({});
  const clickHandler = (index) => {
    if (state[index] === true) {
      const nextSelectedItem = [...props.selectedItem];
      nextSelectedItem.splice(index, 1);
      props.setSelectedItem(nextSelectedItem);
    } else {
      props.setSelectedItem([
        ...props.selectedItem,
        {
          code01: item[index].code01,
          code02: item[index].code02,
          code03: item[index].code03,
          code04: item[index].code04,
          code04_vl: item[index].code04_vl,
        },
      ]);
    }
    const nextState = { ...state, [index]: !state[index] };
    setState(nextState);
  };

  return (
    <Grid item xs={12}>
      <div
        style={{
          height: "50px",
          border: "0",
          boxShadow: "0px 0px 3px 0 rgb(0 0 0 / 60%)",
          textAlign: "center",
          display: "flex",
          width: "100%",
        }}
      >
        <b style={{ flex: 1, padding: "14px", marginLeft: "48px" }}>{title}</b>
        <IconButton
          onClick={() => {
            setDropState(!dropState);
          }}
        >
          {dropState ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
        </IconButton>
      </div>
      {item !== null && (
        <>
          {dropState ? (
            <>
              {item.map((item, index) => {
                return (
                  <div
                    style={{
                      border: "0",
                      padding: "1px 12px",
                      overflow: "auto",
                      maxHeight: "285px",
                    }}
                    key={index}
                  >
                    {state[index] ? (
                      <div
                        style={{
                          border: "0",
                          boxShadow: "0px 0px 3px 0 rgb(0 0 0 / 60%)",
                          textAlign: "center",
                          width: "100%",
                          margin: "12px 0 12px 0",
                          padding: "2px",
                          backgroundColor: "#F4C19A",
                        }}
                        onClick={() => clickHandler(index)}
                      >
                        <div style={{ display: "flex", margin: "8px" }}>
                          {item["Remaining Date"] !== undefined && (
                            <div
                              style={{
                                backgroundColor: "#FD583F",
                                color: "#fff",
                                padding: "2px 10px",
                                borderRadius: "8px",
                                margin: "auto 8px auto 0",
                                textAlign: "center",
                                verticalAlign: "middle",
                                width: "36px",
                              }}
                            >
                              D-{item["Remaining Date"]}
                            </div>
                          )}

                          <b>{item.code04_vl}</b>
                        </div>
                        {item.purchase_date !== undefined && (
                          <div
                            style={{
                              display: "flex",
                              fontSize: "12px",
                              margin: "8px",
                            }}
                          >
                            최근구매일:{" " + item.purchase_date} 예상구매일:
                            {" " + item.repurchase_date}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div
                        style={{
                          border: "0",
                          boxShadow: "0px 0px 3px 0 rgb(0 0 0 / 60%)",
                          textAlign: "center",
                          width: "100%",
                          margin: "12px 0 12px 0",
                          padding: "2px",
                        }}
                        onClick={() => clickHandler(index)}
                      >
                        <div style={{ display: "flex", margin: "8px" }}>
                          {item["Remaining Date"] !== undefined && (
                            <div
                              style={{
                                backgroundColor: "#FD583F",
                                color: "#fff",
                                padding: "2px 10px",
                                borderRadius: "8px",
                                margin: "auto 8px auto 0",
                                textAlign: "center",
                                verticalAlign: "middle",
                                width: "36px",
                              }}
                            >
                              D-{item["Remaining Date"]}
                            </div>
                          )}

                          <b>{item.code04_vl}</b>
                        </div>
                        {item.purchase_date !== undefined && (
                          <div
                            style={{
                              display: "flex",
                              fontSize: "12px",
                              margin: "8px",
                            }}
                          >
                            최근구매일:{" " + item.purchase_date} 예상구매일:
                            {" " + item.repurchase_date}
                          </div>
                        )}
                      </div>
                    )}

                    <Divider style={{ height: "2px" }} />
                  </div>
                );
              })}
            </>
          ) : (
            <></>
          )}
        </>
      )}
    </Grid>
  );
};

export default NoteSelectDiv;
