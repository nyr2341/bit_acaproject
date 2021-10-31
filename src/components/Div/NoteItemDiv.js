import React from "react";

import { IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

const NoteItemDiv = (props) => {
  return (
    <table style={{ borderCollapse: "collapse", borderSpacing: "10px 0px" }}>
      {props.item !== null && (
        <tbody>
          {props.item.map((item, index) => (
            <tr style={{ border: "1px solid silver" }} key={index}>
              <td
                style={{ fontSize: "13px", width: "100%", paddingLeft: "12px" }}
              >
                {item.code03_vl} &gt; {item.code04_vl}
              </td>
              <td>
                <IconButton
                  size="small"
                  onClick={() => {
                    props.removeTest4Item(index);
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </td>
            </tr>
          ))}
        </tbody>
      )}
    </table>
  );
};

export default NoteItemDiv;
