import { Navigate, Route, Routes } from "react-router-dom";
import ItemView from "src/views/SandboxView";

const Router = () => {
  return (
    <Routes>
      {/* TODO: Change this */}
      <Route
        path="/"
        element={<Navigate to="/itemview" replace={true} />}
      ></Route>
      <Route index path="/itemview" element={<ItemView />} />
    </Routes>
  );
};
export default Router;
