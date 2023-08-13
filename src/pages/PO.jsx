import { useState } from "react";
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
import CreateOrder from "../components/CreateOrder";
import MenuItem from "@mui/material/MenuItem";
import { UilBox } from "@iconscout/react-unicons";
import AlertMessage from "../components/Alert";
import OrderList from "../components/OrderList";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Divider from "@mui/material/Divider";
import DialogActions from "@mui/material/DialogActions";

export default function PO() {
  const [title, setTitle] = useState("Purchase Orders");
  const [titleIcon, setTitleIcon] = useState(<UilBox />);
  const [value, setValue] = useState("1");
  const [valueSub, setValueSub] = useState("1");
  const [valueSub2, setValueSub2] = useState("1");
  const [subTitle, setSubTitle] = useState("> List Orders");
  const [code, setCode] = useState("8C03CE1E83C24D3B8ED6159CA0D8CE4D");
  const [poNumber, setPoNumber] = useState("");
  const [rows, setRows] = useState([]);
  const [headers, setHeaders] = useState({});
  const [loading, setLoading] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [message, setMessage] = useState("Success!");
  const [severity, setSeverity] = useState("success");
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogActive, setDialogActive] = useState("1");
  const [display, setDisplay] = useState("none");
  const [subDisplay, setSubDisplay] = useState("none");

  const handleClose = () => {
    setOpenDialog(false);
  };

  const sampleRows = [
    {
      LineNumber: 1,
      ItemCode: "ABC123",
      ItemName: "Sample Item",
      ItemPackingSpec: "Sample Packing",
      GeneralSpec: "Sample Spec",
      UOM: "PCS",
      QuantityReceived: 10,
      UnitPrice: 25.99,
      QuantityOrdered: 15,
      TotalPrice: 389.85,
    },
    {
      LineNumber: 2,
      ItemCode: "XYZ456",
      ItemName: "Another Item",
      ItemPackingSpec: "Packing Info",
      GeneralSpec: "Item Spec",
      UOM: "BOX",
      QuantityReceived: 5,
      UnitPrice: 12.5,
      QuantityOrdered: 10,
      TotalPrice: 125,
    },

    {
      LineNumber: 3,
      ItemCode: "XYZ457",
      ItemName: "Another Item",
      ItemPackingSpec: "Packing Info",
      GeneralSpec: "Item Spec",
      UOM: "BOX",
      QuantityReceived: 5,
      UnitPrice: 12.5,
      QuantityOrdered: 10,
      TotalPrice: 125,
    },
    // Add more sample rows as needed
  ];

  const sampleRows2 = [
    {
      LineNumber: 1,
      ItemCode: "DEF789",
      ItemName: "Widget A",
      ItemPackingSpec: "Sample Packing 2",
      GeneralSpec: "Widget Spec",
      UOM: "EA",
      QuantityReceived: 20,
      UnitPrice: 8.99,
      QuantityOrdered: 25,
      TotalPrice: 224.75,
    },
    {
      LineNumber: 2,
      ItemCode: "GHI012",
      ItemName: "Accessory B",
      ItemPackingSpec: "Accessory Packing",
      GeneralSpec: "Accessory Spec",
      UOM: "SET",
      QuantityReceived: 12,
      UnitPrice: 5.75,
      QuantityOrdered: 15,
      TotalPrice: 69,
    },
    // Add more sample rows as needed
  ];

  const sampleRows3 = [
    {
      LineNumber: 1,
      ItemCode: "JKL345",
      ItemName: "Product X",
      ItemPackingSpec: "Product Packing",
      GeneralSpec: "Product Spec",
      UOM: "KG",
      QuantityReceived: 50,
      UnitPrice: 18.25,
      QuantityOrdered: 60,
      TotalPrice: 912.5,
    },
  ];

  console.log(dialogActive);
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
      setSeverity("success");
      setOpenAlert(true);
    } catch (error) {
      setMessage(`Unable to fetch Purchase Order from - ${code}`);
      setSeverity("error");
      setLoading(false);
      setOpenAlert(true);
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setSubTitle(
      newValue === "1"
        ? "> List Orders"
        : newValue === "2"
        ? "> Create Order"
        : newValue === "3"
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
      <Dialog fullWidth maxWidth="md" open={openDialog} onClose={handleClose}>
        <DialogTitle id="alert-dialog-title">{dialogActive}</DialogTitle>
        <DialogContent sx={{ minWidth: "100%" }}>
          <Divider sx={{ mb: 1.5 }}></Divider>
          <TextField
            minRows={5}
            multiline
            label="Remark"
            variant="outlined"
            sx={{ minWidth: "100%", mt: 1 }}
          ></TextField>
        </DialogContent>
        <DialogActions sx={{ mr: 2, mt: -1 }}>
          <Button
            sx={{ padding: "10px", paddingInline: "30px", marginRight: "5px" }}
            variant="outlined"
            color="error"
            onClick={handleClose}
          >
            CANCEL
          </Button>
          <Button
            sx={{ padding: "10px", paddingInline: "30px" }}
            variant="contained"
            color="success"
            onClick={handleClose}
          >
            SAVE
          </Button>
        </DialogActions>
      </Dialog>
      <Box sx={{ ml: "270px", mt: "80px", width: "86.5%" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="List Orders" value="1" />
              <Tab label="Create Order" value="2" />
              <Tab label="Prepare Back Order" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <TabPanel value="1">
              <div style={{ marginLeft: "-12px", marginTop: "-15px" }}>
                <OrderList
                  type="po"
                  setDialogActive={setDialogActive}
                  open={setOpenDialog}
                ></OrderList>
              </div>
            </TabPanel>
          </TabPanel>
          <TabPanel value="2">
            <TabContext value={valueSub}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChangeSub}
                  aria-label="lab API tabs example"
                >
                  <Tab label="Import Order" value="1" />
                  <Tab label="Add Order" value="2" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <div style={{ display: "flex" }}>
                  <TextField
                    disabled={loading}
                    label="PO LOGIN CODE"
                    sx={{ ml: -2, width: "480px" }}
                    variant="outlined"
                    value={code}
                    focused={code === "" ? false : true}
                    onChange={(e) => {
                      setCode(e.target.value);
                    }}
                  />
                  <Button
                    disabled={loading}
                    onClick={() => {
                      setLoading(true);
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
                <POTable
                  setRows={setRows}
                  headers={headers}
                  loading={loading}
                  rows={rows}
                ></POTable>
              </TabPanel>
              <TabPanel value="2">
                <CreateOrder></CreateOrder>
              </TabPanel>
            </TabContext>
          </TabPanel>
          <TabPanel value="3">
            <TabContext value={valueSub2}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChangeSub2}
                  aria-label="lab API tabs example"
                >
                  <Tab label="List Back Orders" value="1" />
                  <Tab label="Create Back Order" value="2" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <OrderList></OrderList>
              </TabPanel>
              <TabPanel value="2">
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
                    setSubDisplay("none");
                    setLoading(true);
                    setDisplay("block");
                    setTimeout(() => {
                      setLoading(false);
                      setSubDisplay("block");
                    }, 3000);
                  }}
                >
                  <MenuItem value="1">8C03E1E-PO1</MenuItem>
                  <MenuItem value="2">8C03E1E-PO2</MenuItem>
                </TextField>
                <br />
                <br />
                <Divider sx={{ mb: 5 }}></Divider>
                <div className="bo" style={{ display: display }}>
                  <POTable
                    noHeader={true}
                    headers={{ Currency: "Euro" }}
                    loading={loading}
                    rows={sampleRows2}
                  ></POTable>
                  <div className="sub" style={{ display: subDisplay }}>
                    <POTable
                      noHeader={true}
                      headers={{ Currency: "Euro" }}
                      loading={loading}
                      rows={sampleRows}
                    ></POTable>
                    <POTable
                      noHeader={true}
                      headers={{ Currency: "Euro" }}
                      loading={loading}
                      rows={sampleRows3}
                    ></POTable>
                    <div
                      className="actions"
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        marginTop: "25px",
                      }}
                    >
                      <Button
                        onClick={() => {
                          setDisplay("none");
                          setSubDisplay("none");
                          setPoNumber("");
                        }}
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
                  </div>
                </div>
              </TabPanel>
            </TabContext>
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
}
