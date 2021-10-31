import React from "react";

const HistoryInfoDiv = (props) => {
  const info = props.info;
  return (
    <table style={{ padding: "12px 14px", width: "100%" }}>
      <tbody>
        {info.body.map((it, id) => (
          <tr key={id}>
            <td style={{ wordBreak: "break-all", width: "100%" }}>
              <p style={{ margin: "4px 0" }}>
                {it.code04_vl +
                  " " +
                  it.qt +
                  it.qt_code +
                  " " +
                  it.amount +
                  "개"}
              </p>
            </td>
            <td>
              <div style={{ margin: "0 0 0 8px" }}>
                <p style={{ margin: "4px 0" }}>₩{it.price}</p>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default HistoryInfoDiv;
