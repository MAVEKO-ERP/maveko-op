/* eslint-disable react/prop-types */
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

export default function ViewOrder({ headers }) {
  const [supplierValue, setSupplierValue] = useState("");
  const [value, setValue] = useState("1");
  const [supRef, setSupRef] = useState("");
  const [expDate, setExpDate] = useState();
  const [docRef, setDocRef] = useState(
    headers
      ? headers.PONumber
      : "PO-DOC-" +
          new Date().getFullYear() +
          (new Date().getMonth() + 1) +
          new Date().getHours() +
          new Date().getSeconds()
  );

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const inputFields = [
    {
      label: "PO Number",
      value: headers ? headers.PONumber : "",
      change: setDocRef,
      width: "332.5px",
    },
    {
      label: "Name of Ship",
      value: headers ? headers.PODestinationName : "",
      change: setSupRef,
      width: "332.5px",
    },
    {
      label: "Ship Number",
      value: supRef,
      change: setSupRef,
      width: "332.5px",
    },
    {
      label: "Delivery Address",
      value: headers ? headers.DeliveryAddress1 : "",
      change: setSupRef,
      width: "532.5px",
    },
    {
      label: "Final Delivery",
      value: headers
        ? `${headers.DeliveryDateToDestination} | ${headers.DestinationDeliveryPlace}`
        : "",
      change: setSupRef,
      width: "332.5px",
    },
    {
      label: "Voyage Number",
      value: supRef,
      change: setSupRef,
      width: "332.5px",
    },
    {
      label: "Backorder Text",
      value: supplierValue,
      width: "300px",
      change: setSupplierValue,
      options: [
        { value: "1", label: "BACKORDER" },
        { value: "2", label: "Supplier 2" },
        { value: "3", label: "Supplier 3" },
      ],
    },
  ];

  const inputFields2 = [
    {
      label: "Contact Person",
      value: docRef,
      change: setDocRef,
      width: "332.5px",
      select: true,
      options: [
        { value: "1", label: "Hana Gebeyehu" },
        { value: "2", label: "Tibebu Biru" },
        { value: "3", label: "Nigus Solomon" },
      ],
    },
    {
      label: "Customer",
      value: headers ? headers.POSentByPersonCompany : "",
      change: setSupRef,
      width: "332.5px",
    },
    {
      label: "Street",
      value: headers ? headers.SentInvoiceAddress3 : "",
      change: setSupRef,
      width: "332.5px",
    },
    {
      label: "City",
      value: headers ? headers.SentInvoiceAddress2 : "",
      change: setSupRef,
      width: "332.5px",
    },
    {
      label: "Address",
      value: headers
        ? headers.SentInvoiceAddress5 +
          " | " +
          headers.SentInvoiceAddress4 +
          " | " +
          headers.SentInvoiceAddress6
        : "",
      change: setSupRef,
      width: "332.5px",
    },
  ];

  const inputFields3 = [
    {
      label: "Recipient Person",
      value: docRef,
      change: setDocRef,
      width: "332.5px",
      select: true,
      options: [
        { value: "1", label: "Hana Gebeyehu" },
        { value: "2", label: "Tibebu Biru" },
        { value: "3", label: "Nigus Solomon" },
      ],
    },
    {
      label: "Terms",
      value: headers ? headers.PaymentTerms : "",
      change: setSupRef,
      width: "332.5px",
    },
    {
      label: "Process Matchcode",
      value: headers ? headers.PONumber : "",
      change: setSupRef,
      width: "332.5px",
    },
    {
      label: "Refernce Date",
      value: headers ? dayjs(headers.POSentDate) : "",
      change: setSupRef,
      width: "332.5px",
      date: true,
    },
    {
      label: "Delivery Date",
      value: headers ? dayjs(headers.DeliveryDateToDestination) : "",
      change: setSupRef,
      width: "332.5px",
      date: true,
    },
    {
      label: "Expected Date",
      value: expDate,
      change: setExpDate,
      width: "332.5px",
      date: true,
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
            field.change ? field.change(newValue) : null;
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
        onChange={(e) => (field.change ? field.change(e.target.value) : null)}
      />
    );

  const renderFields = (fields) => (
    <div
      className="newOrder"
      style={{
        display: "flex",
        marginLeft: -20,
        justifyContent: "flex-start",
        flexWrap: "wrap",
      }}
    >
      {fields.map((field) => (
        <React.Fragment key={field.label}>
          {renderTextField(field)}
          <div className="space" style={{ width: "20px" }}></div>
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <>
      <TabContext sx={{ ml: -10 }} value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider", ml: -1.5 }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Maveko Details" value="1" />
            <Tab label="Customer Details" value="2" />
            <Tab label="Document Details" value="3" />
          </TabList>
        </Box>
        <TabPanel sx={{ ml: -2 }} value="1">
          {renderFields(inputFields)}
        </TabPanel>
        <TabPanel sx={{ ml: -2 }} value="2">
          {renderFields(inputFields2)}
        </TabPanel>
        <TabPanel sx={{ ml: -2 }} value="3">
          {renderFields(inputFields3)}
        </TabPanel>
      </TabContext>
    </>
  );
}
