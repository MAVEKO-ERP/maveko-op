import { UilBox } from "@iconscout/react-unicons";
import { UilUser } from "@iconscout/react-unicons";
import { UilSitemap } from "@iconscout/react-unicons";
import { UilPackage } from "@iconscout/react-unicons";
// import { UilFolder } from '@iconscout/react-unicons'
import { UilUserSquare } from '@iconscout/react-unicons'
import { UilSignout } from '@iconscout/react-unicons'
// import { UilBell } from '@iconscout/react-unicons'
// import { UilFileInfoAlt } from '@iconscout/react-unicons'
// import { UilFileEditAlt } from '@iconscout/react-unicons'

export const menus = [
  {
    id: 1,
    name: "Purchase Orders",
    link: "/po",
    icon: <UilBox />,
    description: "list all purchase orders or create a new one",
  },
  {
    id: 1,
    name: "Suppliers",
    link: "/supplier",
    icon: <UilSitemap />,
    description: "list of all available suppliers",
  },
  {
    id: 1,
    name: "Customers",
    link: "/customers",
    icon: <UilUser />,
    description: "list of all available customers",
  },
  {
    id: 1,
    name: "Items",
    link: "/item",
    icon: <UilPackage />,
    description: "list of all available items",
  }
  // {
  //   id: 1,
  //   name: "Price List Updates",
  //   link: "/master",
  //   icon: <UilFileEditAlt />,
  //   description: "list all sales orders or create a new one",
  // },
  // {
  //   id: 1,
  //   name: "Master Price List",
  //   link: "/master",
  //   icon: <UilFolder />,
  //   description: "list all sales orders or create a new one",
  // },
  // {
  //   id: 1,
  //   name: "Customer Price List",
  //   link: "/customer",
  //   icon: <UilFileInfoAlt />,
  //   description: "list all sales orders or create a new one",
  // },
];

export const subMenus = [
  // {
  //   id: 1,
  //   name: "Notifications",
  //   link: "/",
  //   notification: true,
  //   icon: <UilBell />,
  //   description: "list of all available suppliers",
  // },
  {
    id: 2,
    name: `${localStorage.getItem("name")}`,
    link: "/",
    account: true,
    icon: <UilUserSquare />,
    description: "list of all available suppliers",
  },
  {
    id: 3,
    logout: true,
    name: "Logout",
    link: "/",
    icon: <UilSignout />,
    description: "list of all available customers",
  },
];