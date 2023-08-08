/* eslint-disable react/prop-types */
import React from "react";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Button from "@mui/material/Button";

export default function CreateForm({ noActions, inputFields, formType }) {


  const renderTextField = (field) =>
    field.options ? (
      <TextField
        key={field.label}
        select
        disabled={field.disabled ? field.disabled : false}
        value={field.value}
        style={{
          width: field.width ? field.width : "400px",
          marginBottom: "15px",
        }}
        label={field.label}
        variant="outlined"
        onChange={(e) => field.change(e.target.value)}
      >
        {field.options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    ) : field.date ? (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          disabled={field.disabled ? field.disabled : false}
          label={field.label}
          value={field.value}
          onChange={(newValue) => {
            field.change(newValue);
          }}
        ></DatePicker>
      </LocalizationProvider>
    ) : (
      <TextField
        disabled={field.disabled ? field.disabled : false}
        value={field.value}
        style={{
          width: field.width ? field.width : "400px",
          marginBottom: "15px",
        }}
        label={field.label}
        variant="outlined"
        onChange={(e) => field.change(e.target.value)}
      />
    );

  return (
    <>
      <div
        className="newOrder"
        style={{
          display: "flex",
          marginLeft: -20,
          justifyContent: "flex-start",
          flexWrap: "wrap",
        }}
      >
        {inputFields? inputFields.map((field) => (
          <React.Fragment key={field.label}>
            {renderTextField(field)}
            <div className="space" style={{ width: "20px" }}></div>
          </React.Fragment>
        )): null}
      </div>
      <Divider
        sx={{ mt: 5, ml: -2, mb: 5, display: noActions ? "none" : "" }}
      ></Divider>
      <div
        className="actions"
        style={{
          display: noActions ? "none" : "flex",
          justifyContent: "flex-end",
          marginTop: "25px",
        }}
      >
        <Button
          onClick={() => {}}
          variant="outlined"
          color="error"
          style={{ padding: "12px", paddingInline: "50px" }}
        >
          CANCEL
        </Button>
        <div className="sapce" style={{ width: "15px" }}></div>
        <Button
          variant="contained"
          color="success"
          style={{ padding: "12px", paddingInline: "50px" }}
        >
          {formType}
        </Button>
      </div>
    </>
  );
}
