import { Box } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Layout from "./component/template/Layout";
import Home from "./pages/Home";

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='' element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
