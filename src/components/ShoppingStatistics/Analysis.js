import React from "react";
import { Container } from "@material-ui/core";

import axios from "axios";
import AnalysisDiv from "../Div/AnalysisDiv";

const Analysis = (props) => {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    axios
      .get("http://3.35.250.22:8080/Shop-0.0.1-SNAPSHOT/analysis", {
        headers: {
          Authorization: "Bearer " + props.cookies.Authorization,
        },
      })
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      });
  }, [props.cookies.Authorization]);

  return (
    <div>
      <Container style={{ marginTop: "15px" }}>
        {data !== null ? <AnalysisDiv data={data} /> : <div>No Data!</div>}
      </Container>
    </div>
  );
};

export default Analysis;
