import React from "react";
import { TextField } from "@material-ui/core";
import { Autocomplete, createFilterOptions } from "@material-ui/lab";
import category from "../../category";
import axios from "axios";

const Searchbar = (props) => {
  const defaultFilterOptions = createFilterOptions({
    matchFrom: "start",
    stringify: (option) => option.code04_vl,
  });
  const filterOptions = (options, state) =>
    defaultFilterOptions(options, state).slice(0, 10);

  return (
    <div>
      <Autocomplete
        style={{ flexGrow: 1 }}
        options={category}
        filterOptions={filterOptions}
        onChange={(e, values) => {
          if (values !== null) {
            axios
              .get("http://3.35.250.22:8080/Shop-0.0.1-SNAPSHOT/compare", {
                params: {
                  code01: values.code01,
                  code02: values.code02,
                  code03: values.code03,
                  code04: values.code04,
                },
                headers: {
                  Authorization: "Bearer " + props.cookies.Authorization,
                },
              })
              .then((response) => {
                props.getData(response.data);
              });
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
            style={{ padding: "0", backgroundColor: "white" }}
            {...params}
            size="small"
            label="Search input"
            name="searchInput"
            margin="normal"
            variant="outlined"
            InputProps={{
              ...params.InputProps,
            }}
          />
        )}
      />
    </div>
  );
};

export default Searchbar;
