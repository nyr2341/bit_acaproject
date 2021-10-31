import React from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

import {
  Container,
  Divider,
  Grid,
  IconButton,
  TextField,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
} from "@material-ui/core";

import { Autocomplete, createFilterOptions } from "@material-ui/lab";
import category from "../../category";

import {
  makeStyles,
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";

import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import HistoryItemDiv from "../Div/HistoryItemDiv";

const theme = createMuiTheme({
  palette: {
    primary: {
      500: "#4caf50",
    },
  },
});

const useStyles = makeStyles((theme) => ({
  footer: {
    maxWidth: "1280px",
    position: "fixed",
    width: "100%",
    bottom: "0px",
    height: "56px",
    display: "flex",
  },
  cardBody: {
    padding: "10px",
    display: "flex",
    position: "relative",
  },
  fullSize: {
    margin: "auto 0px auto 5px",
    height: "29px",
    width: "100%",
  },
  smallSize: {
    margin: "auto 0px auto 5px",
    height: "29px",
    width: "65px",
  },
  addCardButton: {
    height: "99px",
    margin: "0px",
    background: "#0101",
    textAlign: "center",
  },
  Card: {
    margin: "0px",
  },
  navLink: { textDecoration: "none", color: "inherit" },
  formControl: {
    minWidth: 90,
    maxWidth: 110,
  },
}));
const AddHistory = ({ history, checkStateHandler, cookies }) => {
  const classes = useStyles();

  //AutoComplete render option 갯수제한
  const defaultFilterOptions = createFilterOptions({
    matchFrom: "start",
    stringify: (option) => option.code04_vl,
  });
  const filterOptions = (options, state) =>
    defaultFilterOptions(options, state).slice(0, 10);

  //DatePicker 날짜 선택, Item정보에 저장하기 위한 State
  const today = new Date();
  const [selectedDate, setSelectedDate] = React.useState(
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate()
  );
  const handleDateChange = (date) => {
    setSelectedDate(
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
    );
    const nextHead = {
      purchase_date:
        date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
    };
    setItemList({
      ...itemList,
      head: nextHead,
    });
  };

  //MartCode 선택, Item정보에 저장하기 위한 State
  const [selectedMartCode, setSelectedMartCode] = React.useState("");
  const handleMartCodeChange = (e) => {
    setSelectedMartCode(e.target.value);
    const nextBody = itemList.body.map((item) => {
      return { ...item, mart_code: e.target.value };
    });
    setItemList({
      ...itemList,
      body: nextBody,
    });
  };

  //Item들의 정보
  const [itemList, setItemList] = React.useState({
    head: {
      purchase_date: selectedDate,
    },
    body: [],
  });

  //Item추가 AutoComplte 창으로만 추가됨
  const handleItemAdd = (values) => {
    setItemList({
      ...itemList,
      body: [
        ...itemList.body,
        {
          price: "",
          amount: "",
          code01: values.code01,
          code02: values.code02,
          code03: values.code03,
          code04: values.code04,
          code04_vl: values.code04_vl,
          mart_code: selectedMartCode,
          qt_code: "",
          qt: "",
        },
      ],
    });
  };

  const handleChangeInput = (index, event) => {
    const values = [...itemList.body];
    values[index][event.target.name] = event.target.value;

    setItemList({
      ...itemList,
      body: values,
    });
  };

  const handleItemRemove = (index) => {
    const values = [...itemList.body];
    values.splice(index, 1);
    setItemList({
      ...itemList,
      body: values,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (selectedMartCode === "") {
      alert("마트를 선택해주세요");
      return;
    }

    axios
      .post(
        "http://3.35.250.22:8080/Shop-0.0.1-SNAPSHOT/item",
        JSON.stringify(itemList),
        {
          headers: {
            "Content-Type": `application/json`,
            Authorization: "Bearer " + cookies.Authorization,
          },
        }
      )
      .then((res) => {
        alert("저장되었습니다");
        checkStateHandler();
        history.history.push("/main/shoppinglist");
      })
      .catch((e) => alert("전송실패"));
  };

  return (
    <div>
      <form onSubmit={(e) => onSubmit(e)}>
        <Container
          style={{
            marginTop: "15px",
            padding: "0px 0px",
            backgroundColor: "#fff",
            boxShadow: "0 0px 3px 0 rgb(0 0 0 / 14%)",
            border: "0",
          }}
        >
          <div
            style={{
              display: "flex",
              marginTop: "15px",
              color: "rgba(0, 0, 0, 0.54)",
              height: "64px",
            }}
          >
            <div style={{ margin: "16px 16px 0px 0px" }}>
              <NavLink to="/main/shoppinghistory" className={classes.navLink}>
                <IconButton
                  style={{
                    width: "28px",
                    height: "28px",
                    margin: "6px",
                    padding: "0",
                  }}
                >
                  <ChevronLeftIcon fontSize="small" />
                </IconButton>
              </NavLink>
            </div>
            <div style={{ marginTop: "8px" }}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                  <KeyboardDatePicker
                    size="small"
                    margin="normal"
                    id="date-picker-dialog"
                    label="날짜 확인"
                    format="yyyy-MM-dd"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                    style={{ width: "160px", margin: "0" }}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
            </div>
            <div style={{ margin: "5px 0px 0px 22px" }}>
              <FormControl className={classes.formControl}>
                <InputLabel>마트선택</InputLabel>
                <Select
                  size="small"
                  value={selectedMartCode}
                  onChange={(e) => handleMartCodeChange(e)}
                >
                  <MenuItem value="EM">이마트</MenuItem>
                  <MenuItem value="ET">이마트트레이더스</MenuItem>
                  <MenuItem value="HO">홈플러스</MenuItem>
                  <MenuItem value="LO">롯데마트</MenuItem>
                  <MenuItem value="NH">농협하나로마트</MenuItem>
                  <MenuItem value="기타">기타</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
        </Container>

        <Container
          style={{
            height: "100%",
            padding: "0 0 76px 0",
          }}
        >
          <div
            style={{
              marginTop: "20px",
              height: "100%",
              padding: "12px",
              backgroundColor: "#fff",
              boxShadow: "0 0px 3px 0 rgb(0 0 0 / 14%)",
              border: "0",
            }}
          >
            <Grid container spacing={3}>
              <ThemeProvider theme={theme}>
                <Grid item xs={12}>
                  <Autocomplete
                    style={{ flexGrow: 1 }}
                    options={category}
                    filterOptions={filterOptions}
                    onChange={(e, values) => {
                      if (values !== null) {
                        handleItemAdd(values);
                      }
                    }}
                    getOptionLabel={(option) => {
                      return option.code04_vl;
                    }}
                    renderOption={(option, state) => {
                      return (
                        option.code01_vl +
                        ">" +
                        option.code02_vl +
                        ">" +
                        option.code03_vl +
                        ">" +
                        option.code04_vl
                      );
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        size="small"
                        label="검색"
                        name="searchInput"
                        margin="normal"
                        variant="outlined"
                        InputProps={{
                          ...params.InputProps,
                        }}
                        style={{ padding: "0", backgroundColor: "white" }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Divider style={{ backgroundColor: "rgba(0, 0, 0, 0.25)" }} />
                </Grid>

                <Grid item xs={12} style={{ padding: "12px 6px 12px 12px" }}>
                  <table
                    style={{
                      width: "100%",
                    }}
                  >
                    <thead style={{ fontSize: "12px" }}>
                      <tr>
                        <th>제품명</th>
                        <th>용량</th>
                        <th>단위</th>
                        <th>수량</th>
                        <th>가격</th>
                      </tr>
                    </thead>
                    <HistoryItemDiv
                      itemList={itemList}
                      handleChangeInput={handleChangeInput}
                      handleItemRemove={handleItemRemove}
                    />
                  </table>
                </Grid>
              </ThemeProvider>
              <Grid item xs={12}>
                <div style={{ width: "100%", textAlign: "right" }}>
                  <button
                    style={{
                      width: "60px",
                      height: "30px",
                      backgroundColor: "#fff",
                      color: "rgba(0, 0, 0, 0.54)",
                      border: "1px solid",
                      borderColor: "rgba(0, 0, 0, 0.54)",
                      borderRadius: "3px",
                    }}
                  >
                    저장
                  </button>
                </div>
              </Grid>
            </Grid>
          </div>
        </Container>
      </form>
    </div>
  );
};

export default AddHistory;
