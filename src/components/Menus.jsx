import { UilBox } from "@iconscout/react-unicons";
import { UilUser } from "@iconscout/react-unicons";
import { UilSitemap } from "@iconscout/react-unicons";
import { UilPackage } from "@iconscout/react-unicons";
// import { UilAnalysis } from "@iconscout/react-unicons";
import { UilUserSquare } from '@iconscout/react-unicons'
import { UilSignout } from '@iconscout/react-unicons'

export const menus = [
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
    link: "/customer",
    icon: <UilUser />,
    description: "list of all available customers",
  },
  {
    id: 1,
    name: "Items",
    link: "/item",
    icon: <UilPackage />,
    description: "list of all available items",
  },
  {
    id: 1,
    name: "Purchse Orders",
    link: "/po",
    icon: <UilBox />,
    description: "list all purchase orders or create a new one",
  }
  // {
  //   id: 1,
  //   name: "Sales Orders",
  //   link: "/",
  //   icon: <UilAnalysis />,
  //   description: "list all sales orders or create a new one",
  // },
];

export const subMenus = [
  {
    id: 1,
    name: "Nigus Solomon",
    link: "/",
    account: true,
    icon: <UilUserSquare />,
    description: "list of all available suppliers",
  },
  {
    id: 1,
    logout: true,
    name: "Logout",
    link: "/",
    icon: <UilSignout />,
    description: "list of all available customers",
  },
];