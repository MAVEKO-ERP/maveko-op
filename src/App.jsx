import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PO from "./pages/PO";
import LoginScreen from "./pages/Login";
import Supplier from "./pages/Supplier";
import Customer from "./pages/Customer";
import Item from "./pages/Items";
import MasterPriceList from "./pages/pl/Master"
import CustomerPriceList from "./pages/pl/Customer"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/po" element={<PO />} />
        <Route path="/supplier" element={<Supplier />} />
        <Route path="/customers" element={<Customer />} />
        <Route path="/item" element={<Item />} />
        <Route path="/master" element={<MasterPriceList />} />
        <Route path="/customer" element={<CustomerPriceList />} />
      </Routes>
    </Router>
  );
}

export default App;
