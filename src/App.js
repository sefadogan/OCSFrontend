import { Navigate, Route, Routes } from "react-router-dom";
import OCSOrdersPage from "./pages/orders";
import OCSOrderDetailPage from "./pages/orders/detail";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/orders" element={<OCSOrdersPage />} />
        <Route path="/orders/:id" element={<OCSOrderDetailPage />} />
        <Route path="*" element={<Navigate to="/orders" />} />
      </Routes>
    </div>
  );
}

export default App;
