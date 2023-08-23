import { useState } from "react";
import LeftDrawer from "../components/Drawer";
import Box from "@mui/material/Box";
import { UilUser } from "@iconscout/react-unicons";
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

export default function Customer() {
  const [title, setTitle] = useState("Customers");
  const [titleIcon, setTitleIcon] = useState(<UilUser />);
  const [value, setValue] = useState("1");
  const [subTitle, setSubTitle] = useState("> List Customers");
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogActive, setDialogActive] = useState("1");
  const [customerName, setCustomerName] = useState("");
  const [refNo, setRefNo] = useState("");
  const [owner, setOwner] = useState("");
  const [currency, setCurrency] = useState("1");
  const [cusTitle, setCusTitle] = useState();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [addressLine, setAddressLine] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("");

  const inputFields = [
    {
      label: "Customer Name",
      value: customerName,
      change: setCustomerName,
      width: "332.5px",
    },
    {
      label: "Reference Number",
      value: refNo,
      change: setRefNo,
      width: "332.5px",
    },
    {
      label: "Owner",
      value: owner,
      change: setOwner,
      width: "332.5px",
      select: true,
      options: [
        { value: "1", label: "Hana Gebeyehu" },
        { value: "2", label: "Tibebu Biru" },
        { value: "3", label: "Nigus Solomon" },
      ],
    },
    {
      label: "Currency",
      value: currency,
      change: setCurrency,
      width: "150px",
      options: [
        { value: "1", label: "EUR" },
        { value: "2", label: "USD" },
      ],
    },
  ];

  const inputFieldsContact = [
    {
      label: "Title",
      select: true,
      value: cusTitle,
      change: setCusTitle,
      width: "132.5px",
      options: [
        { value: "1", label: "Mr" },
        { value: "1", label: "Ms" },
      ],
    },
    {
      label: "First Name",
      value: firstName,
      change: setFirstName,
      width: "332.5px",
    },
    {
      label: "Last Name",
      value: lastName,
      change: setLastName,
      width: "332.5px",
    },
    {
      label: "Gender",
      select: true,
      value: gender,
      change: setGender,
      width: "132.5px",
      options: [
        { value: "1", label: "Male" },
        { value: "1", label: "Female" },
      ],
    },
    {
      label: "Email",
      value: email,
      change: setEmail,
      width: "332.5px",
    },
    {
      label: "Address Line",
      value: addressLine,
      change: setAddressLine,
      width: "332.5px",
    },
    {
      label: "Country",
      value: country,
      change: setCountry,
      width: "332.5px",
    },
    {
      label: "City",
      value: city,
      change: setCity,
      width: "332.5px",
    },
    {
      label: "State/Province",
      value: state,
      change: setState,
      width: "332.5px",
    },
    {
      label: "Zip/Postal Code",
      value: zip,
      change: setZip,
      width: "332.5px",
    },
  ];

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setSubTitle(
      newValue === "1"
        ? "> List Customers"
        : newValue === "2"
        ? "> Create Customers"
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
              <Tab label="List Customers" value="1" />
              <Tab label="Create Customers" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <TabPanel value="1">
              <div style={{ marginLeft: "-12px", marginTop: "-15px" }}>
                {/* <SupplierList
                  setDialogActive={setDialogActive}
                  open={setOpenDialog}
                ></SupplierList> */}
              </div>
            </TabPanel>
          </TabPanel>
          <TabPanel value="2">
            <CreateForm inputFields={inputFields} noActions></CreateForm>
            <h2 style={{ marginLeft: "-18px" }}>Contact Details</h2>
            <Divider style={{ marginLeft: "-18px" }}></Divider>
            <br />
            <CreateForm
              inputFields={inputFieldsContact}
              formType="SAVE CUSTOMER"
            ></CreateForm>
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
}
