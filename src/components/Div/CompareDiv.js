import React from "react";

import { Grid } from "@material-ui/core";

import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const CompareDiv = (props) => {
  const itemList = props.itemList;

  return (
    <Grid container spacing={2}>
      {itemList !== null && (
        <Grid item xs={12} style={{ textAlign: "center" }}>
          <p style={{ color: "blue", display: "contents" }}>
            {itemList.Compare.length + " "}
          </p>
          개의 상품이 검색되었습니다.
        </Grid>
      )}
      {itemList.Compare.map((item, index) => (
        <Grid item xs={12} key={index}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              {item.code04_vl +
                " " +
                item.qt +
                item.qt_code +
                " " +
                item.amount +
                "개입"}
            </AccordionSummary>
            <AccordionDetails>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                }}
              >
                <div>{item.p_day + "일전"}</div>
                <div style={{ flex: 1, textAlign: "center" }}>
                  {item.mart_name}
                </div>
                <div>{"₩" + item.price}</div>
              </div>
            </AccordionDetails>
          </Accordion>
        </Grid>
      ))}
    </Grid>
  );
};

export default CompareDiv;
