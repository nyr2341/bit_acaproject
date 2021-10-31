import React from "react";

import { Grid } from "@material-ui/core";

import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const AnalysisDiv = (props) => {
  return (
    <Grid container spacing={2}>
      {props.data.map((item, index) => (
        <Grid item xs={12} key={index}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <div
                style={{
                  border: "0",
                  display: "flex",
                  height: "60px",
                  width: "100%",
                }}
              >
                <div style={{ flex: 1 }}>
                  <p style={{ margin: "10px 0 10px 10px", fontSize: "14px" }}>
                    <b>
                      {item.code04_vl +
                        " " +
                        item.qt +
                        item.qt_code +
                        " " +
                        item.amount +
                        "개"}
                    </b>
                  </p>
                  <p style={{ margin: "10px 0 10px 10px", fontSize: "8px" }}>
                    <b>구매일 : {item.purchase_date}</b>
                  </p>
                </div>
                <div style={{ display: "table" }}>
                  <p
                    style={{
                      margin: "0",
                      display: "table-cell",
                      verticalAlign: "middle",
                      color: "red",
                    }}
                  >
                    <b>{"₩" + item.price}</b>
                  </p>
                </div>
              </div>
            </AccordionSummary>
            <AccordionDetails style={{ padding: "0 16px" }}>
              <div
                style={{
                  display: "flex",
                  height: "70px",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    textAlign: "center",
                    margin: "0 10px",
                  }}
                >
                  <b>
                    <p style={{ margin: "4px 0" }}>평균 구매 주기</p>
                    <p style={{ margin: "4px 0", color: "blue" }}>
                      {item.purchase_period}
                    </p>
                  </b>
                </div>
                <div style={{ flex: 1 }}></div>
                <div
                  style={{
                    textAlign: "center",
                    margin: "0 10px",
                  }}
                >
                  <b>
                    <p style={{ margin: "4px 0" }}>평균 가격</p>
                    <p style={{ margin: "4px 0", color: "red" }}>
                      {item.price_difference}
                    </p>
                  </b>
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
        </Grid>
      ))}
    </Grid>
  );
};

export default AnalysisDiv;
