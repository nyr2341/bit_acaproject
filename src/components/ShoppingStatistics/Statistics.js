import React from "react";

import { Bar, Pie } from "react-chartjs-2";

import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Container,
  Grid,
} from "@material-ui/core";

import axios from "axios";

import Card from "../Card/Card.js";
import CardHeader from "../Card/CardHeader.js";
import CardBody from "../Card/CardBody.js";

const Statistics = (props) => {
  const [barData, setBarData] = React.useState(null);
  const [pieDatas, setPieDatas] = React.useState(null);
  const [pieData, setPieData] = React.useState({ labels: [], datas: [] });

  const [dateRange, setDateRange] = React.useState({ bar: 12, pie: 12 });

  React.useEffect(() => {
    axios
      .get("http://3.35.250.22:8080/Shop-0.0.1-SNAPSHOT/average", {
        headers: {
          Authorization: "Bearer " + props.cookies.Authorization,
        },
      })
      .then((response) => {
        setBarData(response.data);
      });

    axios
      .get("http://3.35.250.22:8080/Shop-0.0.1-SNAPSHOT/category-average", {
        headers: {
          Authorization: "Bearer " + props.cookies.Authorization,
        },
      })
      .then((response) => {
        setPieDatas(response.data);
        setPieData({
          labels: response.data.CategoryAverage12.map((item, index) => {
            return item.code01_vl;
          }),
          datas: response.data.CategoryAverage12.map((item, index) => {
            return item.percentage;
          }),
        });
      });
  }, [props.cookies.Authorization]);

  const getMonthRange = (range) => {
    const today = new Date();

    const todayMonth = today.getMonth() + 1;

    const months = [];

    for (let i = range - 1; i >= 0; i--) {
      let month = todayMonth - i;
      if (month <= 0) {
        month = month + 12;
      }
      months.push(month);
    }
    return months;
  };

  const handleChange = (event) => {
    const nextDateRange = {
      ...dateRange,
      [event.target.name]: event.target.value,
    };
    setDateRange(nextDateRange);
    if (event.target.name === "pie") {
      selectPieData(event.target.value);
    }
  };

  const selectPieData = (value) => {
    if (value === 12) {
      setPieData({
        labels: pieDatas.CategoryAverage12.map((item, index) => {
          return item.code01_vl;
        }),
        datas: pieDatas.CategoryAverage12.map((item, index) => {
          return item.percentage;
        }),
      });
    } else if (value === 6) {
      setPieData({
        labels: pieDatas.CategoryAverage6.map((item, index) => {
          return item.code01_vl;
        }),
        datas: pieDatas.CategoryAverage6.map((item, index) => {
          return item.percentage;
        }),
      });
    } else if (value === 3) {
      setPieData({
        labels: pieDatas.CategoryAverage3.map((item, index) => {
          return item.code01_vl;
        }),
        datas: pieDatas.CategoryAverage3.map((item, index) => {
          return item.percentage;
        }),
      });
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "4px" }}>
      <Container>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Card>
              <CardHeader color="orange">
                <h3>월별 가격 합산</h3>
              </CardHeader>
              <CardBody style={{ padding: "16px 20px" }}>
                <div>
                  <FormControl variant="outlined">
                    <InputLabel id="demo-simple-select-outlined-label">
                      year
                    </InputLabel>
                    <Select
                      label="Date"
                      value={dateRange.bar}
                      name="bar"
                      onChange={handleChange}
                      style={{ fontSize: "13px" }}
                    >
                      <MenuItem value={12} style={{ fontSize: "13px" }}>
                        최근 12개월
                      </MenuItem>
                      <MenuItem value={6} style={{ fontSize: "13px" }}>
                        최근 6개월
                      </MenuItem>
                      <MenuItem value={3} style={{ fontSize: "13px" }}>
                        최근 3개월
                      </MenuItem>
                    </Select>
                  </FormControl>
                  {barData === null ? (
                    <div
                      style={{
                        height: "150px",
                        display: "table",
                        width: "100%",
                      }}
                    >
                      <div
                        style={{
                          verticalAlign: "middle",
                          display: "table-cell",
                        }}
                      >
                        No Data
                      </div>
                    </div>
                  ) : (
                    <div style={{ margin: "16px 0" }}>
                      <Bar
                        style={{ maxHeight: "300px" }}
                        data={{
                          labels: getMonthRange(dateRange.bar),
                          datasets: [
                            {
                              label: "User",
                              data: barData.userAverage.slice(
                                dateRange.bar * -1
                              ),
                              backgroundColor: "rgba(15, 107, 255, 0.1)",
                              borderWidth: 1,
                              borderColor: "#0f6bff",
                            },
                            {
                              label: "Total",
                              data: barData.totalAverage.slice(
                                dateRange.bar * -1
                              ),
                              backgroundColor: "rgba(242, 184, 113, 0.1)",
                              borderWidth: 1,
                              borderColor: "#f2b471",
                            },
                          ],
                        }}
                        options={{
                          maintainAspectRatio: true,
                          aspectRatio: 1.25,
                        }}
                      />
                    </div>
                  )}
                </div>
              </CardBody>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <CardHeader color="red">
                <h3>카테고리별 비율</h3>
              </CardHeader>
              <CardBody style={{ padding: "16px 20px" }}>
                <FormControl
                  variant="outlined"
                  style={{ margin: "4px 0 8px 0" }}
                >
                  <InputLabel id="demo-simple-select-outlined-label">
                    year
                  </InputLabel>
                  <Select
                    label="Date"
                    value={dateRange.pie}
                    name="pie"
                    onChange={handleChange}
                    style={{ fontSize: "13px" }}
                  >
                    <MenuItem value={12} style={{ fontSize: "13px" }}>
                      최근 12개월
                    </MenuItem>
                    <MenuItem value={6} style={{ fontSize: "13px" }}>
                      최근 6개월
                    </MenuItem>
                    <MenuItem value={3} style={{ fontSize: "13px" }}>
                      최근 3개월
                    </MenuItem>
                  </Select>
                </FormControl>
                {pieData.datas.length !== 0 ? (
                  <Pie
                    style={{ maxHeight: "400px" }}
                    data={{
                      labels: pieData.labels,
                      datasets: [
                        {
                          label: "Dataset 1",
                          data: pieData.datas,
                          backgroundColor: [
                            "#FF6384",
                            "#FF9F40",
                            "#FFCD56",
                            "#4BC0C0",
                            "#36A2EB",
                            "#D1B7E0",
                            "#D0EFA2",
                            "#A7DFEE",
                            "#FEF2D9",
                            "#FDB89E",
                          ],
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      plugins: {
                        legend: {
                          position: "top",
                        },
                      },
                    }}
                  />
                ) : (
                  <div
                    style={{
                      height: "150px",
                      display: "table",
                      width: "100%",
                    }}
                  >
                    <div
                      style={{
                        verticalAlign: "middle",
                        display: "table-cell",
                      }}
                    >
                      No Data
                    </div>
                  </div>
                )}
              </CardBody>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Statistics;
