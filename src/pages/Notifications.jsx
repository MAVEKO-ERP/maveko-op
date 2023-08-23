import * as React from "react";
import LeftDrawer from "../components/Drawer";
import { UilBell } from '@iconscout/react-unicons'

export default function NotificationsPage() {
  const [title, setTitle] = React.useState("Customer Price List");
  const [titleIcon, setTitleIcon] = React.useState(<UilBell />);
  return (
    <LeftDrawer
      title={title}
      setTitle={setTitle}
      titleIcon={titleIcon}
      setTitleIcon={setTitleIcon}
    />
  );
}
