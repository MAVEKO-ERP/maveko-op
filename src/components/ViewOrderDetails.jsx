/* eslint-disable react/prop-types */
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Button from "@mui/material/Button";
import dayjs from "dayjs";

export default function ViewOrder({ noActions, headers }) {
  const [supplierValue, setSupplierValue] = useState("");
  const [ownerValue, setOwnerValue] = useState("");
  const [approved, setApproved] = useState("2");
  const [supRef, setSupRef] = useState("");
  const [docRef, setDocRef] = useState(
    "PO-DOC-" +
      new Date().getFullYear() +
      (new Date().getMonth() + 1) +
      new Date().getHours() +
      new Date().getSeconds()
  );
  const [status, setStatus] = useState("OPEN");
  const [currency, setCurrency] = useState("1");
  const [salesOrder, setSalesOrder] = useState("");
  const [taxCode, setTaxCode] = useState("");
  const [terms, setTerms] = useState("1");
  const [reqDate, setReqDate] = useState(
    headers ? dayjs(headers.DeliveryDateToDestination) : null
  );
  const [expDate, setExpDate] = useState();
  const [site, setSite] = useState("1");

  const inputFields = [
    {
      label: "Supplier",
      value: supplierValue,
      width: "300px",
      change: setSupplierValue,
      options: [
        { value: "1", label: "Supplier 1" },
        { value: "2", label: "Supplier 2" },
        { value: "3", label: "Supplier 3" },
      ],
    },
    {
      label: "Owner",
      value: ownerValue,
      change: setOwnerValue,
      width: "300px",
      options: [
        { value: "1", label: "Hana Gebeyehu" },
        { value: "2", label: "Eyosiais Mekbib" },
        { value: "3", label: "Nigus Solomon" },
      ],
    },
    {
      label: "Approval",
      value: approved,
      change: setApproved,
      width: "270px",
      options: [
        { value: "1", label: "Approved" },
        { value: "2", label: "Pending" },
        { value: "3", label: "Rejected" },
      ],
    },
    {
      label: "Supplier Reference",
      value: supRef.toUpperCase(),
      change: setSupRef,
      width: "332.5px",
    },
    {
      label: "Document Reference",
      value: docRef,
      change: setDocRef,
      width: "352.5px",
    },
    {
      label: "Status",
      value: status,
      disabled: true,
      change: setStatus,
      width: "300px",
    },
    {
      label: "Sales Order",
      value: salesOrder,
      change: setSalesOrder,
      width: "200px",
      disabled: true,
    },
    {
      label: "Currency",
      value: currency,
      disabled: true,
      change: setCurrency,
      width: "150px",
      options: [
        { value: "1", label: "EUR" },
        { value: "2", label: "USD" },
      ],
    },
    {
      label: "Tax Code",
      value: taxCode,
      change: setTaxCode,
      width: "200px",
      options: [
        { value: "1", label: "CLASS A" },
        { value: "2", label: "CLASS S" },
      ],
    },
    {
      label: "Terms",
      value: terms,
      change: setTerms,
      width: "200px",
      options: [{ value: "1", label: "30 Days" }],
    },
    {
      label: "Site",
      value: site,
      change: setSite,
      width: "200px",
      options: [
        { value: "1", label: "Warehouse 1" },
        { value: "2", label: "Warehouse 2" },
        { value: "3", label: "Warehouse 3" },
      ],
    },
    {
      label: "Required Date",
      value: reqDate,
      date: true,
      change: setReqDate,
    },
    {
      label: "Expected Date",
      value: expDate,
      date: true,
      change: setExpDate,
    },
  ];

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
        {inputFields.map((field) => (
          <React.Fragment key={field.label}>
            {renderTextField(field)}
            <div className="space" style={{ width: "20px" }}></div>
          </React.Fragment>
        ))}
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
          SAVE ORDER
        </Button>
      </div>
    </>
  );
}
