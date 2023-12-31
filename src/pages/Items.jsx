import { useState } from "react";
import LeftDrawer from "../components/Drawer";
import Box from "@mui/material/Box";
import { UilPackage } from "@iconscout/react-unicons";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SupplierList from "../components/SupplierList";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Divider from "@mui/material/Divider";
import DialogActions from "@mui/material/DialogActions";
import CreateForm from "../components/CreateForm";

export default function Item() {
  const [title, setTitle] = useState("Items");
  const [titleIcon, setTitleIcon] = useState(<UilPackage />);
  const [value, setValue] = useState("1");
  const [subTitle, setSubTitle] = useState("> List Items");
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogActive, setDialogActive] = useState("1");
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [salesUnitPrice, setSalesUnitPrice] = useState("0.00");
  const [purchaseUnitPrice, setPurchaseUnitPrice] = useState("0.00");
  const [salesUnit, setSalesUnit] = useState("");
  const [taxCode, setTaxCode] = useState("");
  const [validFrom, setValidFrom] = useState();
  const [validTo, setValidTo] = useState();
  const [supplierValue, setSupplierValue] = useState("");

  const inputFields = [
    {
      label: "Item Name",
      value: itemName,
      change: setItemName,
      width: "332.5px",
    },
    {
      label: "Item Description",
      value: itemDescription,
      change: setItemDescription,
      width: "650.5px",
    },
    {
      label: "Purchasing Unit Price",
      value: purchaseUnitPrice,
      change: setPurchaseUnitPrice,
      width: "332.5px",
    },
    {
      label: "Selling Unit Price",
      value: salesUnitPrice,
      change: setSalesUnitPrice,
      width: "332.5px",
    },
    {
      label: "Sales Unit",
      value: salesUnit,
      change: setSalesUnit,
      width: "332.5px",
    },
    {
      label: "Tax Class",
      value: taxCode,
      change: setTaxCode,
      width: "300px",
      options: [
        { value: "1", label: "CLASS A" },
        { value: "2", label: "CLASS S" },
      ],
    },
    {
      label: "Price Valid From",
      date: true,
      value: validFrom,
      change: setValidFrom,
      width: "300px",
    },
    {
      label: "Price Valid To",
      date: true,
      value: validTo,
      change: setValidTo,
      width: "300px",
    },
    {
      label: "Supplier",
      value: supplierValue,
      change: setSupplierValue,
      width: "300px",
      options: [
        { value: "1", label: "Supplier 1" },
        { value: "2", label: "Supplier 2" },
        { value: "3", label: "Supplier 3" },
      ],
    },
  ];

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setSubTitle(
      newValue === "1"
        ? "> List Items"
        : newValue === "2"
        ? "> Create Items"
        : ""
    );
  };
  const handleClose = () => {
    setOpenDialog(false);
  };

  return (
    <div>
      <LeftDrawer
        sub={subTitle}
        title={title}
        setTitle={setTitle}
        titleIcon={titleIcon}
        setTitleIcon={setTitleIcon}
      />
      <Box sx={{ ml: "270px", mt: "80px", width: "86.5%" }}>
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
              sx={{
                padding: "10px",
                paddingInline: "30px",
                marginRight: "5px",
              }}
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
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="List Items" value="1" />
              <Tab label="Create Items" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <TabPanel value="1">
              <div style={{ marginLeft: "-12px", marginTop: "-15px" }}>
                <SupplierList
                  setDialogActive={setDialogActive}
                  open={setOpenDialog}
                ></SupplierList>
              </div>
            </TabPanel>
          </TabPanel>
          <TabPanel value="2">
            <CreateForm
              inputFields={inputFields}
              formType="SAVE ITEM"
            ></CreateForm>
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
}
