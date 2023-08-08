/* eslint-disable react/prop-types */
import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import { UilSetting } from "@iconscout/react-unicons";
import { UilTrashAlt } from '@iconscout/react-unicons'

export default function SupplierList({ open, setDialogActive }) {
  const [checked, setChecked] = React.useState([0]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <List
      sx={{
        width: "100%",
        maxWidth: "100%",
        bgcolor: "background.paper",
        ml: -3,
      }}
    >
      {[0].map((value) => {
        const labelId = `checkbox-list-label-${value}`;

        return (
          <div
            key={value}
            className="list"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <ListItem
              style={{
                width: "100%",
                padding: "5px",
                marginRight: "15px",
                border: "1px solid #d6d6cd",
                borderRadius: "5px",
                marginBottom: "8px",
              }}
              key={value}
            >
              <ListItemButton
                style={{ padding: "15px" }}
                role={undefined}
                onClick={handleToggle(value)}
                dense
              >
                <ListItemText
                  style={{ width: "300px" }}
                  id={labelId}
                  primary={`K7000${value + 1}`}
                />
                <ListItemText
                  style={{ width: "300px" }}
                  id={labelId}
                  primary={`GERMANY`}
                />
                <ListItemText
                  style={{ width: "300px" }}
                  id={labelId}
                  primary={`HEPP`}
                />
                <ListItemText
                  style={{ width: "300px" }}
                  id={labelId}
                  primary={`2023-10-1${value + 1}`}
                />
              </ListItemButton>
            </ListItem>
            <div className="actions" style={{display: "flex"}}>
              <IconButton
                onClick={() => {
                  open(true);
                  setDialogActive(`PO-DOC-786632${value + 1}`);
                }}
                edge="end"
                aria-label="comments"
                sx={{
                  padding: "15px",
                  paddingInline: "25px",
                  border: "1px solid #d6d6cd",
                  borderRadius: "5px",
                  marginBottom: "8px",
                  mr: 1
                }}
              >
                <UilSetting />
              </IconButton>
              <IconButton
                edge="end"
                aria-label="comments"
                sx={{
                  padding: "15px",
                  paddingInline: "25px",
                  border: "1px solid #d6d6cd",
                  borderRadius: "5px",
                  marginBottom: "8px",
                }}
              >
                <UilTrashAlt  color="red" />
              </IconButton>
            </div>
          </div>
        );
      })}
    </List>
  );
}
