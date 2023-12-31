/* eslint-disable react/prop-types */
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
import { currencySymbols } from "./Currencies";
import ViewOrder from "./ViewOrderDetails";
import Divider from "@mui/material/Divider";

export default function POTable({ rows, loading, headers, setRows, noHeader, saveOrder }) {
  const total = rows ? rows.reduce((acc, row) => acc + row.TotalPrice, 0) : 0;
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
            {noHeader ? null : (
              <>
                <Divider sx={{ ml: -2, mt: 2 }}></Divider>
                <Typography
                  style={{ marginTop: "20px", marginLeft: -15 }}
                  variant="h5"
                >
                  {headers ? headers.PONumber : ""}
                </Typography>
                <Typography
                  style={{ marginTop: "0px", marginLeft: -15 }}
                  variant="body"
                >
                  {headers ? headers.POSentByPersonCompany : ""}
                </Typography>
                <Divider sx={{ ml: -2, mt: 2, mb: 2 }}></Divider>
                <ViewOrder headers={headers} noActions={true}></ViewOrder>
                <Divider sx={{ ml: -2, mt: 2 }}></Divider>
              </>
            )}
            <Box
              style={{
                border: "1px solid #d6d6cd",
                marginLeft: -15,
                marginTop: 20,
                borderRadius: "5px",
              }}
            >
              <TableContainer
                loading={loading}
                style={{ width: "100%", borderRadius: "5px" }}
              >
                <Table aria-label="spanning table">
                  <TableHead style={{ background: "#fff" }}>
                    <TableRow>
                      <TableCell>#</TableCell>
                      <TableCell>Item Number</TableCell>
                      <TableCell style={{ maxWidth: "250px" }}>
                        Description
                      </TableCell>
                      <TableCell>U/M</TableCell>
                      <TableCell align="right">Qty. Billed</TableCell>
                      <TableCell align="right">Qty. Received</TableCell>
                      <TableCell align="right">Unit Cost</TableCell>
                      <TableCell align="right">Qty</TableCell>
                      <TableCell align="right">Discount</TableCell>
                      <TableCell align="right">Amount</TableCell>
                      <TableCell align="right">Tax</TableCell>
                      <TableCell align="right">Tax Rate</TableCell>
                      <TableCell align="right">Total</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow key={row.ItemCode}>
                        <TableCell>{row.LineNumber}</TableCell>
                        <TableCell>{row.ItemCode}</TableCell>
                        <TableCell style={{ maxWidth: "450px" }}>
                          {row.ItemName
                            ? row.ItemName
                            : "" + ", " + row.ItemPackingSpec
                            ? row.ItemPackingSpec
                            : "" + ", " + row.GeneralSpec
                            ? row.GeneralSpec
                            : ""}
                        </TableCell>
                        <TableCell>{row.UOM}</TableCell>
                        <TableCell align="right">{0}</TableCell>
                        <TableCell align="right">
                          {row.QuantityReceived}
                        </TableCell>
                        <TableCell align="right">
                          {row.UnitPrice.toString() +
                            " " +
                            currencySymbols[headers.Currency]}
                        </TableCell>
                        <TableCell align="right">
                          {row.QuantityOrdered}
                        </TableCell>
                        <TableCell align="right">{`0%`}</TableCell>
                        <TableCell align="right">
                          {(row.QuantityOrdered * row.UnitPrice)
                            .toFixed(2)
                            .toString() +
                            " " +
                            currencySymbols[headers.Currency]}
                        </TableCell>
                        <TableCell align="right">{"None"}</TableCell>
                        <TableCell align="right">{`0%`}</TableCell>
                        <TableCell align="right">{row.TotalPrice}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell colSpan={11} />
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
                display: noHeader ? "none" : "flex",
                justifyContent: "flex-end",
                marginTop: "25px",
              }}
            >
              <Button
                onClick={() => {
                  setRows([]);
                }}
                variant="outlined"
                color="error"
                style={{ padding: "12px", paddingInline: "50px" }}
              >
                CANCEL
              </Button>
              <div className="sapce" style={{ width: "15px" }}></div>
              <Button
                onClick={saveOrder}
                variant="contained"
                color="success"
                style={{ padding: "12px", paddingInline: "50px" }}
              >
                SAVE ORDER
              </Button>
            </div>
          </>
        ) : null
      ) : null}
    </>
  );
}
