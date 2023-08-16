/* eslint-disable react/prop-types */
import { useState } from "react";
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

export default function POTable({
  rows,
  loading,
  headers,
  index,
  setMessage,
  setSeverity,
  setOpenAlert,
}) {
  const [editableRows, setEditableRows] = useState([...rows]);
  const [disable, setDisable] = useState(false);

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
            terms: "none",
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
          const { success, data1 } = await orderResponseItems.json();
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
            <Box
              style={{
                display: disable ? "none" : "block",
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
                    editableRows[index].supplier_name}
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
                        <TableCell align="left">{row.product.code}</TableCell>
                        <TableCell align="left">{row.customer_code}</TableCell>
                        <TableCell style={{ maxWidth: "250px" }} align="left">
                          {row.product.name}
                        </TableCell>
                        <TableCell
                          align="center"
                          contentEditable
                          onBlur={(e) =>
                            handleCellEdit(e, rowIndex, "requested_quantity")
                          }
                        >
                          {row.requested_quantity}
                        </TableCell>
                        <TableCell align="center">
                          {row.requested_price.toFixed(2)}
                        </TableCell>
                        <TableCell align="center">
                          {row.product.supplier_price.toFixed(2)}
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
                display: disable ? "none" : "flex",
                justifyContent: "flex-end",
                marginTop: "25px",
              }}
            >
              <Button
                disable={disable}
                onClick={saveOrder}
                variant="contained"
                color="success"
                style={{ padding: "12px", paddingInline: "50px" }}
              >
                SAVE{" - "}
                {editableRows[index].client_order.order_number +
                  editableRows[index].supplier_name}
              </Button>
            </div>
          </>
        ) : null
      ) : null}
    </>
  );
}
