import React from "react";

import { Container, Grid } from "@material-ui/core";

import Searchbar from "../Searchbar/Searchbar";
import CompareDiv from "../Div/CompareDiv";

const Compare = (props) => {
  const [data, setData] = React.useState(null);
  const [itemState, setItemState] = React.useState({});

  React.useEffect(() => {
    if (data !== null) {
      const nextItemState = {};
      for (let i = 0; i < data.Compare.length; i++) {
        nextItemState[i] = false;
      }
      setItemState(nextItemState);
    }
  }, [data]);

  const clickHandler = (key) => {
    setItemState({ ...itemState, [key]: !itemState[key] });
  };

  return (
    <div>
      <Container style={{ fontSize: "13px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Searchbar
              getData={(data) => {
                setData(data);
              }}
              data={data}
              cookies={props.cookies}
            />
            {data !== null ? (
              <CompareDiv
                itemList={data}
                itemState={itemState}
                clickHandler={clickHandler}
              />
            ) : (
              <div
                style={{
                  textAlign: "center",
                  marginTop: "125px",
                }}
              >
                <p>원하는 상품을 검색해 보세요</p>
                <p>ex) 물, 삼다수</p>
              </div>
            )}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Compare;
