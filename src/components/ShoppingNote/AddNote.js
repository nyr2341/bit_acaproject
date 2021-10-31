import React from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

import {
  Button,
  Container,
  Grid,
  IconButton,
  TextField,
} from "@material-ui/core";
import { Autocomplete, createFilterOptions } from "@material-ui/lab";

import category from "../../category";

import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

import {
  makeStyles,
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";
import NoteSelectDiv from "../Div/NoteSelectDiv";
import NoteItemDiv from "../Div/NoteItemDiv";

const theme = createMuiTheme({
  palette: {
    primary: {
      500: "#4caf50",
    },
  },
});

const useStyles = makeStyles((theme) => ({
  navLink: { textDecoration: "none", color: "inherit" },
}));

const AddNote = (props) => {
  console.log(props);
  const classes = useStyles();
  const defaultFilterOptions = createFilterOptions({
    matchFrom: "start",
    stringify: (option) => option.code04_vl,
  });
  const filterOptions = (options, state) =>
    defaultFilterOptions(options, state).slice(0, 10);

  const [test1, setTest1] = React.useState(null);
  const [test2, setTest2] = React.useState(null);
  const [selectedItem, setSelectedItem] = React.useState([]);

  React.useEffect(() => {
    axios
      .get("http://3.35.250.22:8080/Shop-0.0.1-SNAPSHOT/purchase", {
        headers: {
          Authorization: "Bearer " + props.cookies.Authorization,
        },
      })
      .then((response) => {
        setTest1(response.data);
      });
    axios
      .get("http://3.35.250.22:8080/Shop-0.0.1-SNAPSHOT/recentpurchase", {
        headers: {
          Authorization: "Bearer " + props.cookies.Authorization,
        },
      })
      .then((response) => {
        setTest2(response.data);
      });
  }, [props.cookies.Authorization]);
  const [test4, setTest4] = React.useState([]);
  const removeTest4Item = (index) => {
    const values = [...test4];
    values.splice(index, 1);
    setTest4(values);
    const nextSelectedItem = [...selectedItem];
    nextSelectedItem.splice(index, 1);
    setSelectedItem(nextSelectedItem);
  };

  const onClick = () => {
    props.history.history.push({
      pathname: "/main/shoppingnote/checknote",
      state: {
        selectedItem: selectedItem,
        Authorization: props.cookies.Authorization,
      },
    });
  };

  console.log(selectedItem);
  return (
    <div>
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
          <div style={{ margin: "auto 16px auto 0" }}>
            <NavLink to="/main/shoppingnote" className={classes.navLink}>
              <IconButton>
                <ChevronLeftIcon fontSize="small" />
              </IconButton>
            </NavLink>
          </div>
          <div style={{ paddingTop: "16px" }}>
            <ThemeProvider theme={theme}>
              <TextField placeholder="2021-07-21" />
            </ThemeProvider>
          </div>
        </div>
      </Container>

      <Container
        style={{
          height: "100%",
          paddingBottom: "70px",
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
          <Grid container spacing={2}>
            <NoteSelectDiv
              title="구매임박목록"
              item={test1}
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
            />
            <NoteSelectDiv
              title="최근쇼핑목록"
              item={test2}
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
            />

            <Grid item xs={12}>
              <ThemeProvider theme={theme}>
                <Autocomplete
                  style={{ flexGrow: 1 }}
                  options={category}
                  filterOptions={filterOptions}
                  onChange={(e, values) => {
                    if (values !== null) {
                      setTest4([
                        ...test4,
                        {
                          code04: values.code04,
                          code04_vl: values.code04_vl,
                        },
                      ]);
                      setSelectedItem([
                        ...selectedItem,
                        {
                          code01: values.code01,
                          code02: values.code02,
                          code03: values.code03,
                          code04: values.code04,
                          code04_vl: values.code04_vl,
                        },
                      ]);
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
              </ThemeProvider>
            </Grid>
            <Grid item xs={12}>
              <NoteItemDiv item={test4} removeTest4Item={removeTest4Item} />
            </Grid>
          </Grid>
        </div>
      </Container>
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
        }}
      >
        <Button
          style={{
            width: "100%",
            height: "50px",
            backgroundColor: "green",
            color: "#fff",
          }}
          onClick={onClick}
        >
          노트 확인
        </Button>
      </div>
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          padding: "0px 0px 13px 13px",
        }}
      >
        <div
          style={{
            display: "inline",
            backgroundColor: "#FD583F",
            color: "#fff",
            padding: "2px 10px",
            borderRadius: "20px",
            textAlign: "center",
            verticalAlign: "middle",
            zIndex: "1",
          }}
        >
          7
        </div>
      </div>
    </div>
  );
};

export default AddNote;
