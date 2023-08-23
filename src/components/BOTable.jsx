/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { currencySymbols } from "./Currencies";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export default function POTable({
  triggerDisplay,
  rows,
  loading,
  headers,
  index,
  setMessage,
  setSeverity,
  setOpenAlert,
}) {
  const [editableRows, setEditableRows] = useState([...rows]);
  const [disable, setDisable] = useState(triggerDisplay);
  const [open, setOpen] = useState(false);
  const [supplierEmail, setSupplierEmail] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [addedRemark, setAddedRemark] = useState("");

  useEffect(() => {
    if (loading) {
      setSupplierEmail("");
      setEmailBody("");
      setAddedRemark("");
    }
  }, [loading]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCellEdit = (event, rowIndex, field) => {
    const newValue = event.target.textContent;
    const updatedRows = [...editableRows];
    updatedRows[rowIndex][field] = newValue;
    setEditableRows(updatedRows);
  };

  const total = editableRows
    ? editableRows.reduce(
        (acc, row) => acc + row.requested_price * row.requested_quantity,
        0
      )
    : 0;
  const [emailTitle, setEmailTitle] = useState(
    "Confirmation Request for Back Order " +
      editableRows[index].client_order.order_number +
      editableRows[index].supplier_name
  );
  const saveOrder = async () => {
    try {
      const headers = {
        Authorization: `Bearer # ${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
      };

      const orderResponse = await fetch("http://localhost:3000/back_orders", {
        method: "POST",
        headers,
        body: JSON.stringify({
          payload: {
            order_number:
              editableRows[index].client_order.order_number +
              editableRows[index].supplier_name,
            order_date: new Date().toISOString(),
            supplier_id: editableRows[index].supplier_id,
            delivery_address: JSON.parse(
              editableRows[index].client_order.metadata
            ).delivery_address,
            invoice_address: JSON.parse(
              editableRows[index].client_order.metadata
            ).invoice_address,
            delivery_date: new Date(
              JSON.parse(
                editableRows[index].client_order.metadata
              ).delivery_date
            ),
            status: "draft",
            remark: "none",
          },
        }),
      });
      const { sucess, data } = await orderResponse.json();
      console.log(data);
      if (sucess) {
        editableRows.map(async (row) => {
          const orderResponseItems = await fetch(
            "http://localhost:3000/back_order_items",
            {
              method: "POST",
              headers,
              body: JSON.stringify({
                payload: {
                  back_order_id: data.id,
                  product_id: row.product.id,
                  requested_quantity: row.requested_quantity,
                  requested_unit_price: row.requested_price,
                  supplier_unit_price: row.requested_price,
                },
              }),
            }
          );
          const { success } = await orderResponseItems.json();
          if (success) {
            setMessage(
              "Successfully created backorder! " +
                editableRows[index].client_order.order_number +
                editableRows[index].supplier_name
            );
            setSeverity("success");
            setOpenAlert(true);
            setDisable(true);
          }
        });
      } else {
        setMessage(
          "Backorder already exists! " +
            editableRows[index].client_order.order_number +
            editableRows[index].supplier_name
        );
        setSeverity("error");
        setOpenAlert(true);
      }
    } catch (error) {
      console.log(error.message);
      setMessage(
        "Backorder already exists! " +
          editableRows[index].client_order.order_number +
          editableRows[index].supplier_name
      );
      setSeverity("error");
      setOpenAlert(true);
      setDisable(true);
    } finally {
      setDisable(true);
      console.log("done");
    }
  };

  return (
    <>
      {loading ? (
        <Box sx={{ width: "fill", ml: -2, mt: 1 }}>
          <Typography variant="h2">
            {loading ? <Skeleton animation="wave" /> : "h2"}
          </Typography>
          <Typography variant="h2">
            {loading ? <Skeleton animation="wave" /> : "h2"}
          </Typography>
          <Typography variant="h2">
            {loading ? <Skeleton animation="wave" /> : "h2"}
          </Typography>
          <Typography variant="h2">
            {loading ? <Skeleton animation="wave" /> : "h2"}
          </Typography>
        </Box>
      ) : rows ? (
        rows.length > 0 ? (
          <>
            <Dialog fullWidth maxWidth="md" open={open} onClose={handleClose}>
              <DialogTitle>
                EMAIL FOR{" "}
                {editableRows[index].client_order.order_number +
                  editableRows[index].supplier_name}
              </DialogTitle>
              <DialogContent>
                <div className="head">
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    value={supplierEmail}
                    label="Supplier Email"
                    type="email"
                    fullWidth
                    variant="outlined"
                    onChange={(e) => {
                      setSupplierEmail(e.target.value);
                    }}
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Email Title"
                    type="email"
                    fullWidth
                    variant="outlined"
                    value={emailTitle}
                    onChange={(e) => {
                      setEmailTitle(e.target.value);
                    }}
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    multiline
                    maxRows={5}
                    rows={5}
                    label="Email Body"
                    type="email"
                    fullWidth
                    variant="outlined"
                    value={emailBody}
                    onChange={(e) => {
                      setEmailBody(e.target.value);
                    }}
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    multiline
                    maxRows={2}
                    rows={2}
                    label="Additinal Remark"
                    type="email"
                    fullWidth
                    variant="outlined"
                    value={addedRemark}
                    onChange={(e) => {
                      setAddedRemark(e.target.value);
                    }}
                  />
                </div>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleClose}>Save Email</Button>
              </DialogActions>
            </Dialog>
            <Box
              style={{
                display: disable ? "block" : "block",
                border: "1px solid #d6d6cd",
                marginLeft: -15,
                marginTop: 20,
                borderRadius: "5px",
              }}
            >
              <div
                className="header"
                style={{ marginLeft: "20px", marginTop: "30px" }}
              >
                <h2 style={{ lineHeight: 0, fontWeight: 900 }}>
                  {editableRows[index].client_order.order_number +
                    (editableRows[index].supplier_name
                      ? editableRows[0].supplier_name
                      : "")}
                </h2>
              </div>
              <Divider></Divider>
              <TableContainer
                loading={loading}
                style={{ width: "100%", borderRadius: "5px" }}
              >
                <Table aria-label="spanning table">
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ maxWidth: "20px" }}>#</TableCell>
                      <TableCell style={{ maxWidth: "50px" }}>
                        Supplier Article No
                      </TableCell>
                      <TableCell style={{ maxWidth: "50px" }}>
                        Customer Item No
                      </TableCell>
                      <TableCell style={{ maxWidth: "50px" }}>
                        Product Name
                      </TableCell>
                      <TableCell align="center">Requested Quantity</TableCell>
                      <TableCell align="center">
                        Requested Price | Selling
                      </TableCell>
                      <TableCell align="center">
                        Supplier Price | Purchase
                      </TableCell>
                      <TableCell align="right">Total (Selling)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {editableRows.map((row, rowIndex) => (
                      <TableRow key={row.client_order_id}>
                        <TableCell align="left" contentEditable>
                          {row.product.id}
                        </TableCell>
                        <TableCell
                          style={{
                            color: editableRows[index].supplier_name
                              ? ""
                              : "red",
                            fontWeight: editableRows[index].supplier_name
                              ? ""
                              : 900,
                          }}
                          align="left"
                        >
                          {row.customer_code ? row.product.code : "NO SUPPLIER"}
                        </TableCell>
                        <TableCell align="left">
                          {row.customer_code
                            ? row.customer_code
                            : row.product.code}
                        </TableCell>
                        <TableCell style={{ maxWidth: "250px" }} align="left">
                          {row.product.name}
                        </TableCell>
                        <TableCell
                          align="center"
                          contentEditable={
                            editableRows[index].supplier_name ? true : false
                          }
                          onBlur={(e) =>
                            handleCellEdit(e, rowIndex, "requested_quantity")
                          }
                        >
                          {row.requested_quantity}
                        </TableCell>
                        <TableCell align="center">
                          {row.requested_price.toFixed(2)}
                        </TableCell>
                        <TableCell
                          style={{
                            color: editableRows[index].supplier_name
                              ? ""
                              : "red",
                            fontWeight: editableRows[index].supplier_name
                              ? ""
                              : 900,
                          }}
                          align="center"
                        >
                          {row.product.supplier_price
                            ? row.product.supplier_price.toFixed(2)
                            : "NO SUPPLIER"}
                        </TableCell>
                        <TableCell align="right">
                          {(row.requested_price * row.requested_quantity)
                            .toFixed(2)
                            .toString() +
                            " " +
                            currencySymbols[headers.Currency]}
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell colSpan={6} />
                      <TableCell
                        colSpan={1}
                        align="left"
                        style={{
                          fontWeight: 900,
                          background: "#808080",
                          color: "#fff",
                        }}
                      >
                        Subtotal
                      </TableCell>
                      <TableCell
                        style={{ background: "#808080", color: "#fff" }}
                        align="right"
                      >
                        {total.toFixed(2).toString() +
                          " " +
                          currencySymbols[headers.Currency]}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
            <div
              className="actions"
              style={{
                display: disable ? "flex" : "flex",
                justifyContent: "flex-end",
                marginTop: "25px",
              }}
            >
              <Button
                disabled={disable}
                onClick={
                  editableRows[0].supplier_name
                    ? saveOrder
                    : () => {
                        setMessage(
                          "No Suppliers found for the following items!"
                        );
                        setSeverity("error");
                        setOpenAlert(true);
                      }
                }
                variant="contained"
                color={editableRows[0].supplier_name ? "success" : "error"}
                style={{ padding: "12px", paddingInline: "50px" }}
              >
                SAVE{" - "}
                {editableRows[index].client_order.order_number +
                  editableRows[index].supplier_name}
              </Button>
              <div className="space" style={{ width: "20px" }}></div>
              <Button
                disabled={disable}
                onClick={
                  editableRows[0].supplier_name
                    ? handleClickOpen
                    : () => {
                        setMessage(
                          "No Suppliers found for the following items!"
                        );
                        setSeverity("error");
                        setOpenAlert(true);
                      }
                }
                variant="outlined"
                color={editableRows[0].supplier_name ? "warning" : "error"}
                style={{ padding: "12px", paddingInline: "50px" }}
              >
                EDIT EMAIL
              </Button>
            </div>
          </>
        ) : null
      ) : null}
    </>
  );
}
