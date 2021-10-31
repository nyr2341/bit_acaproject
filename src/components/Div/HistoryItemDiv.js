import React from "react";

import { IconButton, TextField, Select, MenuItem } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

const HistoryItemDiv = (props) => {
  const itemList = props.itemList;
  const handleChangeInput = props.handleChangeInput;
  const handleItemRemove = props.handleItemRemove;

  return (
    <tbody>
      {itemList.body.map((item, index) => {
        let itemName = itemList.body[index].code04_vl;
        /*if (itemName.length > 6) {
          itemName = itemName.substring(0, 5) + "...";
        }*/
        return (
          <tr key={index}>
            <td>
              <div
                name="code04_vl"
                style={{
                  font: "inherit",
                  color: "currentColor",
                  width: "100%",
                  border: "0",
                  display: "block",
                  padding: "6px 0 7px",
                  textAlign: "center",
                  overflow: "hidden",
                }}
              >
                {itemName}
              </div>
            </td>
            <td style={{ width: "13%" }}>
              <TextField
                name="qt"
                value={itemList.body[index].qt || ""}
                onChange={(event) => {
                  handleChangeInput(index, event);
                }}
              />
            </td>
            <td style={{ width: "42px" }}>
              <Select
                name="qt_code"
                style={{ textAlign: "right" }}
                value={itemList.body[index].qt_code || ""}
                onChange={(event) => {
                  handleChangeInput(index, event);
                }}
              >
                <MenuItem value="L">L</MenuItem>
                <MenuItem value="ml">ml</MenuItem>
                <MenuItem value="kg">kg</MenuItem>
                <MenuItem value="g">g</MenuItem>
                <MenuItem value="개">개</MenuItem>
              </Select>
            </td>
            <td style={{ width: "13%" }}>
              <TextField
                name="amount"
                value={itemList.body[index].amount || ""}
                onChange={(event) => {
                  handleChangeInput(index, event);
                }}
              />
            </td>
            <td style={{ margin: "0 0 0 8px", width: "18%" }}>
              <TextField
                name="price"
                value={itemList.body[index].price || ""}
                onChange={(event) => {
                  handleChangeInput(index, event);
                }}
              />
            </td>
            <td style={{ width: "34px" }}>
              <IconButton
                size="small"
                onClick={() => {
                  handleItemRemove(index);
                }}
              >
                <CloseIcon />
              </IconButton>
            </td>
          </tr>
        );
      })}
    </tbody>
  );
};

export default HistoryItemDiv;
