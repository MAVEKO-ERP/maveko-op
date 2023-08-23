/* eslint-disable react/prop-types */
import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

export default function SupplierList({
  open,
  setDialogActive,
  data,
  displayProperties,
}) {
  const [checked, setChecked] = React.useState([]);

  const handleToggle = (value) => () => {
    const newChecked = [...checked];
    const currentIndex = newChecked.indexOf(value);

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const renderListItem = (item, index) => {
    const isHeader = index === 0;
    return (
      <div
        key={index}
        className="list"
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
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
        >
          <ListItemButton
            style={{
              padding: "15px",
              backgroundColor: isHeader ? "transparent" : "",
              cursor: isHeader ? "default" : "pointer",
            }}
            role={undefined}
            disableHoverListener={isHeader}
            disableRipple={isHeader}
            onClick={() => {
              if (!isHeader) {
                handleToggle(index);
                open(true);
                setDialogActive(
                  item["itemName"] + ", " + item["itemDescription"]
                );
              }
            }}
            dense
          >
            {displayProperties.map((property, propIndex) => (
              <ListItemText
                key={propIndex}
                style={{ width: "300px" }}
                primary={item[property.name]}
              />
            ))}
          </ListItemButton>
        </ListItem>
      </div>
    );
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
      {data.map((item, index) => renderListItem(item, index))}
    </List>
  );
}
