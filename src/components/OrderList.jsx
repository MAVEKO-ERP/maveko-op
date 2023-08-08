/* eslint-disable react/prop-types */
import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import { UilComment } from "@iconscout/react-unicons";

export default function OrderList({ open, setDialogActive, type }) {
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
      {[0, 1, 2, 3, 4, 5].map((value) => {
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
                  primary={
                    type === "po"
                      ? `PO-DOC-786632${value + 1}`
                      : `BO-DOC-453142${value + 1}`
                  }
                />
                <ListItemText
                  style={{ width: "300px" }}
                  id={labelId}
                  primary={`Tibebu Biru`}
                />
                <ListItemText
                  style={{ width: "300px" }}
                  id={labelId}
                  primary={`2023-10-1${value + 1}`}
                />
                {value % 2 === 0 && value !== 5 ? (
                  <ListItemText
                    style={{ width: "300px", color: "green" }}
                    id={labelId}
                    primary={`COMPLETE`}
                  />
                ) : value === 5 ? (
                  <ListItemText
                    style={{ width: "300px", color: "red" }}
                    id={labelId}
                    primary={`CANCELED`}
                  />
                ) : (
                  <ListItemText
                    style={{ width: "300px", color: "orange" }}
                    id={labelId}
                    primary={`PENDING`}
                  />
                )}
              </ListItemButton>
            </ListItem>
            {type === "po" ? (
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
                }}
              >
                <UilComment />
              </IconButton>
            ) : null}
          </div>
        );
      })}
    </List>
  );
}
