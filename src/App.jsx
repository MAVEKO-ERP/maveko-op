import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PO from "./pages/PO";
import LoginScreen from "./pages/Login";
import Supplier from "./pages/Supplier";
import Customer from "./pages/Customer";
import Item from "./pages/Items";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/po" element={<PO />} />
        <Route path="/supplier" element={<Supplier />} />
        <Route path="/customer" element={<Customer />} />
        <Route path="/item" element={<Item />} />
      </Routes>
    </Router>
  );
}

export default App;
