import { useState, useEffect } from "react";
import LeftDrawer from "../components/Drawer";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { UilSync } from "@iconscout/react-unicons";
import POTable from "../components/POTable";
import BOTable from "../components/BOTable";
import MenuItem from "@mui/material/MenuItem";
import { UilBox } from "@iconscout/react-unicons";
import AlertMessage from "../components/Alert";
import Divider from "@mui/material/Divider";

export default function PO() {
  const [title, setTitle] = useState("Purchase Orders");
  const [titleIcon, setTitleIcon] = useState(<UilBox />);
  const [value, setValue] = useState("1");
  const [valueSub, setValueSub] = useState("1");
  const [valueSub2, setValueSub2] = useState("1");
  const [subTitle, setSubTitle] = useState("> Prepare Purchase Order");
  const [code, setCode] = useState("");
  const [poNumber, setPoNumber] = useState("");
  const [rows, setRows] = useState([]);
  const [header, setHeaders] = useState({});
  const [loading, setLoading] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [message, setMessage] = useState("Success!");
  const [severity, setSeverity] = useState("success");
  const [display, setDisplay] = useState("none");
  const [orders, setOrders] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [displayBO, setDisplayBO] = useState(false);
  const [supplierEmail, setSupplierEmail] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [addedRemark, setAddedRemark] = useState("");

  useEffect(() => {
    async function fetchData1() {
      if (poNumber) {
        setDisplayBO(false);
        try {
          const response = await fetch(
            `http://localhost:3000/client_order_items/${poNumber}`
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          setOrderItems(data.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    }
    fetchData1();
  }, [poNumber]);

  async function fetchData() {
    try {
      const response = await fetch("http://localhost:3000/client_orders");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setOrders(data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const fetchPOs = async (id) => {
    setRows([]);
    try {
      const url = `http://localhost:8000/so_items?po_login_code=${id}&user_full_name=maveko_plu_module`;
      const response = await fetch(url);
      const data = await response.json();
      await setRows(data.details);
      await setHeaders(data.header.__values__);
      setLoading(false);
      setMessage(
        `Successfully fetched Purchase Order - ${data.header.__values__.PONumber}`
      );
      setSeverity("info");
      setOpenAlert(true);
    } catch (error) {
      setMessage(`Unable to fetch Purchase Order from - ${code}`);
      setSeverity("error");
      setLoading(false);
      setOpenAlert(true);
    }
  };

  const saveOrder = async () => {
    setLoading(true);
    try {
      const headers = {
        Authorization: `Bearer # ${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
      };

      const orderResponse = await fetch("http://localhost:3000/client_orders", {
        method: "POST",
        headers,
        body: JSON.stringify({
          payload: {
            order_number: header.PONumber,
            delivery_date: header.DeliveryDateToDestination,
            terms: JSON.stringify({ freight_terms: "FOB", currency: "EURO" }),
            metadata: JSON.stringify({
              delivery_address: header.DeliveryAddress1,
              invoice_address: header.SentInvoiceAddress5
                ? header.SentInvoiceAddress5
                : "" + " | " + header.SentInvoiceAddress4
                ? header.SentInvoiceAddress4
                : "" + " | " + header.SentInvoiceAddress6
                ? header.SentInvoiceAddress6
                : "",
              delivery_date: header.DeliveryDateToDestination,
            }),
            status: "draft",
            remark: "none",
          },
        }),
      });
      const { sucess, data } = await orderResponse.json();
      console.log(data);

      if (!sucess) throw new Error(`${header.PONumber} already recorded!`);

      const itemPromises = rows.map(async (row) => {
        const itemResponse = await fetch("http://0.0.0.0:3000/products", {
          method: "POST",
          headers,
          body: JSON.stringify({
            payload: {
              code: row.ItemCode,
              name: row.ItemName,
              description: row.ItemName,
              product_type_id: 1,
              unit_id: 1,
            },
          }),
        });
        const item = await itemResponse.json();

        if (!item.sucess) throw new Error("Error Occurred");

        const orderItemResponse = await fetch(
          "http://0.0.0.0:3000/client_order_items",
          {
            method: "POST",
            headers,
            body: JSON.stringify({
              payload: {
                client_order_id: data.id,
                product_id: item.data.id,
                requested_quantity: row.QuantityOrdered,
                requested_price: row.UnitPrice,
              },
            }),
          }
        );
        const orderItem = await orderItemResponse.json();

        if (!orderItem.sucess) throw new Error("Error Occurred");
      });

      await Promise.all(itemPromises);
      setMessage(`Order Recorded Successfully! - ${header.PONumber}`);
      setSeverity("success");
      setOpenAlert(true);
      fetchData();
    } catch (error) {
      setMessage(error.message);
      setSeverity("error");
      setOpenAlert(true);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setSubTitle(
      newValue === "1"
        ? "> Prepare Purchase Order"
        : newValue === "2"
        ? "> Prepare Back Order"
        : ""
    );
  };

  const handleChangeSub = (event, newValue) => {
    setValueSub(newValue);
  };

  const handleChangeSub2 = (event, newValue) => {
    setValueSub2(newValue);
  };
  return (
    <div>
      <AlertMessage
        open={openAlert}
        message={message}
        setOpen={setOpenAlert}
        severity={severity}
      ></AlertMessage>
      <LeftDrawer
        title={title}
        setTitle={setTitle}
        sub={subTitle}
        titleIcon={titleIcon}
        setTitleIcon={setTitleIcon}
      />
      <Box sx={{ ml: "270px", mt: "80px", width: "86.5%" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Prepare Purchase Order" value="1" />
              <Tab label="Prepare Back Order" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <TabContext value={valueSub}>
              <Box sx={{ borderBottom: 1, borderColor: "divider", ml: -2.5 }}>
                <TabList onChange={handleChangeSub}>
                  <Tab label="MXP" value="1" />
                  <Tab label="RCCL" value="2" />
                  <Tab label="CTX" value="3" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <div style={{ display: "flex", marginLeft: "-25px" }}>
                  <TextField
                    disabled={loading}
                    label="PO LOGIN CODE"
                    sx={{ ml: -2, width: "480px" }}
                    variant="outlined"
                    value={code}
                    focused={code === "" ? false : true}
                    onChange={(e) => {
                      console.log(e.target.value);
                      setCode(e.target.value);
                      console.log(code);
                    }}
                  />
                  <Button
                    disabled={loading}
                    onClick={() => {
                      setLoading(true);
                      console.log(code);
                      fetchPOs(code);
                    }}
                    endIcon={<UilSync style={{ width: "16px" }} />}
                    sx={{
                      ml: 2,
                      width: "120px",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                    variant="contained"
                  >
                    FETCH
                  </Button>
                </div>
                <div className="po-list" style={{ marginLeft: "-25px" }}>
                  <POTable
                    setRows={setRows}
                    headers={header}
                    loading={loading}
                    saveOrder={saveOrder}
                    rows={rows}
                  ></POTable>
                </div>
              </TabPanel>
            </TabContext>
          </TabPanel>
          <TabPanel value="2">
            <TabContext value={valueSub2}>
              <Box sx={{ borderBottom: 1, borderColor: "divider", ml: -2.5 }}>
                <TabList
                  onChange={handleChangeSub2}
                  aria-label="lab API tabs example"
                >
                  <Tab label="Create Back Order" value="1" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <div
                  className="pb"
                  style={{ display: "flex", marginLeft: "-25px" }}
                >
                  <TextField
                    disabled={loading}
                    select
                    label="PO NUMBER"
                    sx={{ ml: -2, width: "480px" }}
                    variant="outlined"
                    value={poNumber}
                    focused={poNumber === "" ? false : true}
                    onChange={(e) => {
                      setPoNumber(e.target.value);
                      setLoading(true);
                      setDisplay("block");
                      setTimeout(() => {
                        setLoading(false);
                      }, 3000);
                    }}
                  >
                    {orders.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.order_number}
                      </MenuItem>
                    ))}
                  </TextField>
                  <div className="space" style={{ width: "20px" }}></div>
                  <Button
                    onClick={() => {
                      setPoNumber("");
                      setDisplay("none");
                      setSupplierEmail("");
                      setEmailBody("");
                      setAddedRemark("");
                    }}
                    disabled={loading}
                    style={{ display: poNumber === "" ? "none" : "block" }}
                    color="error"
                    variant="outlined"
                  >
                    CLEAR
                  </Button>
                </div>
                <br />
                <Divider sx={{ mb: 2, ml: -5.5 }}></Divider>
                <div
                  className="bo"
                  style={{ display: display, marginLeft: "-25px" }}
                >
                  {orderItems
                    ? Object.keys(orderItems).map((key, index) => (
                        <div key={index}>
                          {" "}
                          <BOTable
                            supplierEmail={supplierEmail}
                            setSupplierEmail={setSupplierEmail}
                            emailBody={emailBody}
                            setEmailBody={setEmailBody}
                            addedRemark={addedRemark}
                            setAddedRemark={setAddedRemark}
                            triggerDisplay={displayBO}
                            setOpenAlert={setOpenAlert}
                            setSeverity={setSeverity}
                            setMessage={setMessage}
                            key={key}
                            index={index}
                            noHeader={true}
                            headers={{ Currency: "Euro" }}
                            loading={loading}
                            rows={orderItems[key]}
                          />
                        </div>
                      ))
                    : null}
                </div>
              </TabPanel>
            </TabContext>
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
}
