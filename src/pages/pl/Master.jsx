import { DataGrid } from "@mui/x-data-grid";
import * as React from 'react'
import LeftDrawer from "../../components/Drawer";
import { UilFolder } from "@iconscout/react-unicons";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "firstName", headerName: "First Name", width: 130 },
  { field: "lastName", headerName: "Last Name", width: 130 },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 90,
  },
  {
    field: "fullName",
    headerName: "Full Name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: 55 },
  { id: 6, lastName: "Melisandre", firstName: "Somebody", age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

export default function MasterPriceList() {
  const [title, setTitle] = React.useState("Master Price List");
  const [titleIcon, setTitleIcon] = React.useState(<UilFolder />);
  return (
    <>
      <LeftDrawer
        title={title}
        setTitle={setTitle}
        titleIcon={titleIcon}
        setTitleIcon={setTitleIcon}
      />
      <div style={{ marginLeft: "270px", marginTop: "80px", height: "fit-content", width: "86.5%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      </div>
    </>
  );
}
